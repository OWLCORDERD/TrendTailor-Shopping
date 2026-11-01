# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TrendTailor is a Korean-language fashion trend community site (Next.js 16.4.2 App Router, React 19, TypeScript). Each month it collects trend keywords with OpenAI and the clothing items for each keyword with SerpApi (Google Shopping). Both are stored in Firebase Firestore and shown on a dashboard (KPIs plus a D3 force graph). It also has the "Trendly" consulting chatbot. Code comments, UI text and commit messages are in Korean. Commit messages use the format `MM.DD <Type>. (<description>)`, for example `10.12 Fixed. (빌드 오류 개선)`.

## Commands

```bash
npm run local   # dev server on http://localhost:3001 (there is no `dev` script)
npm run build   # production build; this is the main type-check gate
npm run lint    # next lint (next/core-web-vitals)
```

There is no test framework or test suite. Formatting follows `.prettierrc` (single quotes, 2 spaces, `arrowParens: avoid`, trailing commas `es5`). Prettier is not a dependency, so format by hand to match.

Environment variables are in `.env.local` / `.env.development`. Server-only secrets are `OPENAI_API_KEY`, `SERP_API_KEY`, `NEXTAUTH_SECRET`, `KAKAO_CLIENT_*` and `ACCESS/REFRESH_TOKEN_SECRET`. Firebase and YouTube keys are `NEXT_PUBLIC_*`.

## Architecture

### Import paths
`tsconfig.json` sets `baseUrl: "src"` with `paths: { "@/*": ["./*"] }`, so `@/component/...` means `src/component/...`. Bare imports such as `component/Main/Footer` also resolve. The top-level `context/` folder (Modal, Theme, Timeline, RouteLoadingOverlay providers) is **outside** `src/`, so it is imported with relative paths (`../../context/...`).

### Monthly data pipeline (the core backend flow)
The pipeline is run **manually by an admin** from the MyHome page (`component/MyHome/AdminPipeline.tsx`, only shown to `role === 'admin'`), once after the 1st of each month. The `vercel.json` cron → `GET /api/monthly-collection` path still exists, but it times out on the Vercel Hobby plan (10s function limit), so it is not used in practice. AdminPipeline runs these steps from the client in order:
1. `feature/trend/jobs/generate-keyword.jobs.ts`: OpenAI (function-calling schema, "Korean fashion trend analyst" persona) → `TrendKeywordRepository.save` into the Firestore `trend-keywords` collection. Doc IDs are slugs from `feature/slug/keyword-slug.ts` (built from English aliases). Dedup checks slug, then name, then name/aliases cross-match.
2. `feature/trend/jobs/collect-clothes.jobs.ts` (`collectClothesByKeywordSteps`): one short `/api/serpApi` request per keyword → `TrendClothesRepository.save` into the `clothes` collection, saved right away so a partial run keeps finished keywords. Doc ID is `productId`; writes are batched upserts of 400. The SerpApi free tier is 250 searches/month, so queries are kept to **one search per keyword** (keyword + explicit suffix). Do not add per-subcategory searches.
3. After each run, AdminPipeline calls the `revalidateDashboard` Server Action (`feature/trend/actions/revalidate-dashboard.action.ts`). It checks the NextAuth JWT for the admin role and calls `revalidatePath('/')`.

### Main dashboard (ISR)
`app/page.tsx` is statically generated with `export const revalidate = 86400`. Admin collection triggers on-demand revalidation, and the daily regeneration is a safety net for missed revalidations and the monthly KPI rollover. `feature/trend/services/dashboard.service.ts` (`getDashboardData`) reads Firestore on the server only at (re)generation time and computes everything there: `build-kpi.jobs.ts` (KPI cards), header stats (keyword/item counts, latest update), and `build-graph.jobs.ts` graph data for every available rank tier (`top1-10` / `top11-20`, keywords ranked by total reviews). The raw clothes list is **not** sent to the client. The result is shared through `context/DashboardContext.tsx` with `Dashboard/structure/Header.tsx`, `TrendKpiStats.tsx` and `KeywordForceGraph.jsx`; the graph renders the `top1-10` tier first via `shared/lib/d3-graph-manager.ts` and switches tiers from the precomputed data. `getDashboardData` throws on Firestore errors on purpose, so ISR keeps the last good page instead of caching an empty dashboard. Firestore reads use the Firebase **client** SDK (`shared/lib/firebase.ts`), not `fetch`, so `fetch` cache options do not apply.

### OpenAI usage
Keep API keys server-side. Client code calls `POST /api/recommendOpenAI` with `{ type, options }`, where `type` is `'function_call'` (structured JSON via function schema, used for consulting) or anything else (SSE streaming, used for general chat). `feature/trend/services/api/openai.service.ts` (`generateOpenAI`, default model `gpt-4o-mini`) builds that request. The consulting chatbot (`component/trendlyAI/`) filters the clothes pool on the client using the user's survey answers first, then sends only that subset to OpenAI to keep LLM costs down.

### Auth
NextAuth v4 (`app/api/auth/[...nextauth]/route.ts`) with a Firestore credentials provider (bcrypt hashing via `/api/hashPassword`, ID check via `/api/duplicationIdCheck`) and Kakao OAuth. JWT helpers are in `shared/lib/token.ts`. `component/common/SessionWatcher.tsx` detects session expiry during client navigation.

### Client state & layout
- Redux Toolkit store (`feature/store/store.ts`) has three slices: `searchDB` (monthly clothes), `chatBubble` (Trendly chat), `modal`. Use the typed hooks from `@/feature/store/hooks`.
- Data fetching on pages uses SWR.
- `app/layout.tsx` wraps the app in this order: NextAuth `AuthSession` → Redux → styled-components SSR registry → Modal/Theme providers → Navbar / BreadCrumb / QuickMenu / Footer. It also registers GSAP ScrollTrigger globally.

### Styling (mixed)
- **styled-components** for components: style modules live in `src/styles/<Area>/index.ts` and are re-exported from `src/styles/index.js`. Usage: `import { Dashboard as CSS } from '@/styles'`. The SWC `compiler.styledComponents` option enables styled-components SSR (`.babelrc` was removed).
- **SCSS** for page-level styles (`src/styles/*.scss`, `app/globals.scss`). `next.config.js` adds `src/styles` to `sassOptions.loadPaths`, so partials load as `@use "tokens"` / `@use "mixin"` (`_tokens.scss` holds the design tokens).
- SVGs import as React components via `@svgr/webpack`. Remote images must be allow-listed in `next.config.js` `images.remotePatterns`.

### Notes
- The Naver Shopping API was discontinued (as of 7/31) and replaced by SerpApi. The `/api/clothes` rewrite in `next.config.js` and the `NEXT_PUBLIC_NAVER_*` env vars are leftovers.
- `Dashboard/structure/SerpApiSample.tsx` and `/api/serpApi` are dev/sample tooling for the SerpApi pipeline.
