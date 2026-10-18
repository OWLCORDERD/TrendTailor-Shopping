# Next.js 13.4.10 → 16.4.2 마이그레이션 결과 보고서

- **작업 일자:** 2026-10-17
- **브랜치:** `feat/dashboard-interaction` (커밋하지 않은 상태)
- **실행 환경:** Node.js v24.22.0 / npm 8.19.2 / Windows 11
- **참고 문서:** [Next.js 공식 업그레이드 가이드 v16](https://nextjs.org/docs/app/guides/upgrading/version-16) (2026-10-15 갱신본), v14·v15 업그레이드 가이드

---

## 1. 요약

| 항목 | 결과 |
|---|---|
| `npm install` | ✅ 성공 |
| `next build` (Turbopack) | ✅ 성공, 경고 0건, 22개 라우트 생성 |
| TypeScript 타입 검사 | ✅ 통과 (빌드 중 실행) |
| `next start` 라우트 점검 | ✅ 페이지 9개 + API 4개 + robots/sitemap 정상 응답 |
| 브라우저 런타임 점검 | ✅ 하이드레이션 오류 없음, 동적 라우트 정상 |
| `npm run lint` (ESLint 10) | ⚠️ 오류 48건 / 경고 34건. 새로 추가된 React Hooks 규칙이며 런타임 문제는 아님 (6-1 참고) |

세 메이저 버전(14 → 15 → 16)을 한 번에 건너뛰었습니다. 이 프로젝트에 영향을 준 변경은 **번들러(Turbopack 기본값), Babel 설정, Sass API, 비동기 `params`, ESLint, React 19, 이미지 설정** 7가지였고, 모두 반영했습니다.

---

## 2. 주요 패키지 버전 변경

| 패키지 | 이전 | 이후 | 비고 |
|---|---|---|---|
| next | 13.4.10 | **16.4.2** | |
| react / react-dom | 18.2.0 | **19.3.1** | Next 16 App Router는 React 19 기준 |
| @types/react / @types/react-dom | 18.2.x | 19.3.0 | |
| typescript | 5.1.6 | 5.9.3 | Next 16 최소 요구 5.1 |
| eslint | 8.45.0 | 10.13.0 | `next lint` 제거, Flat Config 전환 |
| eslint-config-next | 13.4.10 | 16.4.2 | |
| next-auth | ^4.22.3 | ^4.24.15 | 4.24.x부터 peer에 Next 16 포함 |
| framer-motion | ^10.18.0 | ^12.43.0 | v10은 React 18 전용 |
| react-loader-spinner | ^5.4.5 | ^8.0.2 | v5·v6은 React 18 전용. 사용 중인 `RotatingLines`, `ThreeDots` API 동일 |
| react-toastify | ^10.0.5 | ^10.0.6 | peer `>=18`로 React 19 호환 |
| bcrypt | ^5.1.0 | ^6.0.0 | 취약한 `tar`/`node-pre-gyp` 의존성 제거. `hash`/`compare` API 동일 |
| gsap | (명시 안 됨) | ^3.15.0 | **누락 의존성 추가**. 기존에는 `@types/gsap`을 통해 간접 설치되고 있었음 |

### 제거한 의존성

| 패키지 | 제거 이유 |
|---|---|
| `@babel/core`, `babel-plugin-styled-components`, `@babel/plugin-transform-private-methods` | `.babelrc` 제거 (SWC로 대체, 3-2 참고) |
| `@svgr/webpack` | 사용처 없는 webpack 규칙 제거 (3-1 참고) |
| `react-router-dom` | 소스 내 import 0건 (App Router 사용) |
| `react-slick`, `@types/react-slick` | import 0건, React 19 미지원 |
| `redux-persist`, `@types/redux-persist` | import 0건 |
| `body-parser`, `cors`, `uuid` | import 0건 |
| `@types/gsap` | `gsap` 자체에 타입 내장 |

`typescript`, `@types/*`, `eslint` 계열은 `devDependencies`로 옮겼습니다. Vercel은 빌드할 때 devDependencies도 설치하므로 배포에는 영향이 없습니다.

`package.json`에 `"engines": { "node": ">=20.9.0" }`를 추가했습니다. Next 16의 최소 Node 버전입니다.

---

## 3. 버전별 변경 사항과 이 프로젝트에 적용한 내용

### 3-1. Turbopack 기본 번들러 (v16)

**변경 내용:** `next dev`와 `next build` 모두 Turbopack이 기본입니다. `next.config.js`에 `webpack` 설정이 있으면 빌드가 **실패**합니다.

**프로젝트 영향:** `next.config.js`에 `@svgr/webpack` 규칙이 있었습니다. 하지만 소스에서 `.svg`를 컴포넌트로 import하는 곳이 없었고, `.svg`는 모두 `/public` 경로 문자열로만 쓰이고 있었습니다.

**조치:**
- `webpack()` 설정과 `@svgr/webpack`을 제거했습니다.
- `experimental.turbo: false`를 제거했습니다. v16에서 의미 없는 옵션입니다.
- 결과적으로 dev와 build 모두 Turbopack을 사용합니다.

> SVG를 React 컴포넌트로 import해야 할 경우, `turbopack.rules`에 `@svgr/webpack` 로더를 등록하면 됩니다.

### 3-2. Babel → SWC (v13부터 권장, v16 Turbopack과 함께 정리)

**변경 내용:** `.babelrc`가 있으면 Next.js는 SWC 대신 Babel로 컴파일합니다. 그러면 느려지고, `next/font` 같은 SWC 전용 기능을 쓸 수 없습니다.

**프로젝트 영향:** `.babelrc`가 하던 두 가지 일은 이미 SWC가 처리할 수 있었습니다.
- styled-components 변환 → `compiler.styledComponents: true`가 이미 설정되어 있었습니다.
- private methods 변환 → SWC가 기본으로 지원합니다.

**조치:** `.babelrc`를 삭제했습니다. 빌드한 HTML에 styled-components SSR 스타일 태그(`data-styled`)가 37개 정상 삽입되는 것을 확인했습니다.

### 3-3. Sass Modern API (v16)

**변경 내용:** sass-loader가 v16으로 올라가면서 Modern Sass API를 사용합니다. Legacy API 옵션인 `includePaths`는 **무시**됩니다.

**프로젝트 영향:** 첫 빌드에서 `globals.scss`의 `@use 'tokens' as *;`가 `Can't find stylesheet to import` 오류로 실패했습니다.

**조치:**
```diff
 sassOptions: {
-  includePaths: [path.join(__dirname, "src/styles")],
-  silenceDeprecations: ["legacy-js-api"],
+  loadPaths: [path.join(__dirname, "src/styles")],
 },
```
`legacy-js-api` 경고는 Modern API에서 더 이상 발생하지 않으므로 무시 설정도 제거했습니다.

### 3-4. 비동기 Request API: `params`, `searchParams`, `cookies()`, `headers()` (v15 도입, v16 강제)

**변경 내용:** 페이지·레이아웃·라우트 핸들러의 `params`와 `searchParams`가 **Promise**로 전달됩니다. v15에서는 동기 접근도 임시로 허용했지만 v16에서 완전히 제거되었습니다.

**프로젝트 영향:** 클라이언트 컴포넌트 2개가 `params`에 동기로 접근하고 있었습니다. `cookies()`와 `headers()`는 사용처가 없었습니다. `useSearchParams()` 훅과 Route Handler의 `req.nextUrl.searchParams`는 이 변경과 무관합니다.

**조치:** 공식 가이드의 권장 방식대로 React `use()`로 언래핑했습니다.
```diff
- const CurrentNotice = ({ params }: any) => {
-   const notice_id = params.idx;
+ const CurrentNotice = ({ params }: { params: Promise<{ idx: string }> }) => {
+   const { idx: notice_id } = use(params);
```
- `src/app/notice/[idx]/page.tsx`
- `src/app/trendly/[id]/page.tsx`

`any` 타입이던 부분도 실제 타입으로 바꿨습니다.

### 3-5. 캐싱 기본값 변경 (v15)

**변경 내용:**
| 대상 | v13 | v15 이후 |
|---|---|---|
| `fetch()` 기본값 | `force-cache` (캐시함) | 캐시 안 함 |
| `GET` Route Handler | 정적 캐시 | 캐시 안 함 |
| 클라이언트 라우터 캐시 (동적 페이지) | 30초 | 0초 (이동할 때마다 새로 요청) |

**프로젝트 영향 점검:**
- `src/app/shop/page.tsx`의 fetch는 `cache: 'force-cache'`를 명시하고 있습니다. `youtube.ts`의 fetch는 `next: { revalidate }`를 명시하고 있습니다. 따라서 **동작 변화가 없습니다.** 빌드 결과에서도 `/shop`은 기존처럼 30분 ISR(Revalidate 30m)로 생성됩니다.
- Firestore SDK 호출은 `fetch` 캐시와 무관합니다.
- API 라우트 8개는 모두 요청 정보를 읽기 때문에 v13에서도 이미 동적 라우트였고, 변화가 없습니다.
- `sitemap.xml`의 URL 13개(정적 5개 + 공지사항 8개)가 기존 배포본과 동일하게 생성되는 것을 확인했습니다.

**조치:** 필요 없음. 앞으로 새로 `fetch`를 쓸 때는 **기본값이 캐시하지 않음**이라는 점에 유의하세요.

### 3-6. React 19 (v15 이후)

**변경 내용:**
- `forwardRef` 없이 `ref`를 prop으로 받을 수 있습니다.
- `propTypes`와 함수 컴포넌트의 `defaultProps`가 제거되었습니다.
- `useFormState` → `useActionState`
- 새 API: `use()`, View Transitions, `useEffectEvent`, `<Activity>`

**프로젝트 영향 점검:** `forwardRef`, `propTypes`, `defaultProps`, `useFormState`, `ReactDOM.render`, `findDOMNode` 사용처는 모두 0건이었습니다. React 18 전용 peer를 가진 라이브러리만 업그레이드했습니다(2장 표 참고).

### 3-7. `next lint` 제거와 ESLint Flat Config (v16)

**변경 내용:**
- `next lint` 명령이 제거되었습니다.
- `next build`가 더 이상 lint를 실행하지 않습니다.
- `eslint-config-next@16`은 ESLint 9 이상과 Flat Config를 요구합니다.

**조치:**
- `.eslintrc.json`을 삭제하고 `eslint.config.mjs`를 새로 만들었습니다. 기존과 같은 `core-web-vitals` 프리셋을 씁니다.
- `package.json`의 `lint` 스크립트를 `next lint` → `eslint .`로 바꿨습니다.
- 에이전트 스킬 폴더(`.agents/`, `.claude/`)는 lint 대상에서 제외했습니다.

> `eslint-config-next/typescript` 프리셋도 시험해봤습니다. 하지만 `no-explicit-any` 82건 등 기존에 없던 규칙이 대량으로 걸려서, 이전과 같은 기준을 유지하려고 적용하지 않았습니다.

### 3-8. `next/image` 설정 (v14 deprecated, v16 기본값 변경)

**변경 내용:**
- `images.domains`는 deprecated입니다. `remotePatterns`를 사용해야 합니다.
- v16에서 기본값이 바뀌었습니다.
  - `qualities`: `[75]`만 허용
  - `minimumCacheTTL`: 60초 → 4시간
  - `imageSizes`: 16 제거
  - `maximumRedirects`: 3
- localhost와 사설 IP 이미지 최적화가 기본으로 차단됩니다.

**조치:**
- `images.domains`를 삭제하고 `remotePatterns`로 통합했습니다. 이때 `remotePatterns`에만 빠져 있던 `ads-partners.coupang.com`을 추가했습니다.
- `quality` prop 사용처가 없어서 `qualities` 변경의 영향은 없습니다.

### 3-9. TypeScript 설정 (v16 자동 변경)

빌드할 때 Next.js가 `tsconfig.json`을 자동으로 수정했습니다.
- `moduleResolution`: `node` → `bundler` (필수)
- `jsx`: `preserve` → `react-jsx` (필수)
- `include`에 `.next/dev/types/**/*.ts` 추가 (v16에서 dev 빌드 출력이 `.next/dev`로 분리됨)

직접 수정한 부분도 있습니다. `include`에 있던 존재하지 않는 경로 4개를 삭제했습니다: `server/db.js`, `server/index.js`, `global.d.ts`, `node_modules/redux-persist/types`.

### 3-10. 이 프로젝트에 해당하지 않는 변경 (확인만 함)

| 변경 | 버전 | 확인 결과 |
|---|---|---|
| `middleware` → `proxy` 이름 변경 | v16 | middleware 파일 없음 |
| `next export` 명령 제거 → `output: 'export'` | v14 | 사용 안 함 |
| `@next/font` 제거 → `next/font` | v14 | 사용 안 함 (`@fontsource` 사용) |
| `ImageResponse` → `next/og` | v14 | 사용 안 함 |
| `NextRequest`의 `geo`·`ip` 제거 | v15 | 사용 안 함 |
| `serverRuntimeConfig`·`publicRuntimeConfig` 제거 | v16 | 사용 안 함 |
| AMP 제거 | v16 | 사용 안 함 |
| `revalidateTag(tag, profile)` 시그니처 변경 | v16 | 사용 안 함 |
| Parallel Routes `default.js` 필수 | v16 | Parallel Routes 사용 안 함 |
| `experimental.ppr`·`dynamicIO` 제거 → `cacheComponents` | v16 | 사용 안 함 |
| `scroll-behavior: smooth` 자동 덮어쓰기 중단 | v16 | 전역 smooth 스크롤 미사용 |
| `next build` 출력의 `size`·`First Load JS` 제거 | v16 | 참고 사항 |

---

## 4. 변경된 파일 목록

| 파일 | 변경 |
|---|---|
| `package.json` | 버전 업그레이드, 미사용 의존성 정리, `engines` 추가, lint 스크립트 변경 |
| `package-lock.json` | 새로 생성 |
| `next.config.js` | webpack·`experimental.turbo`·`images.domains` 제거, `sassOptions.loadPaths` |
| `tsconfig.json` | Next 자동 수정 + 존재하지 않는 include 경로 정리 |
| `eslint.config.mjs` | **새 파일** (Flat Config) |
| `.eslintrc.json` | **삭제** |
| `.babelrc` | **삭제** |
| `src/app/notice/[idx]/page.tsx` | `params` → `use(params)` |
| `src/app/trendly/[id]/page.tsx` | `params` → `use(params)` |

> 작업 전부터 있던 미커밋 변경(`robots.ts`, `sitemap.ts`의 도메인 수정, `TimeLine` 컴포넌트 삭제 등)은 건드리지 않았습니다.

---

## 5. 검증 결과

### 5-1. 빌드
```
▲ Next.js 16.4.2 (Turbopack)
✓ Compiled successfully in 14.1s
  Finished TypeScript in 9.5s
✓ Generating static pages (20/20)
```
경고 0건.

### 5-2. 프로덕션 서버 (`next start`) 응답

| 경로 | 상태 | 경로 | 상태 |
|---|---|---|---|
| `/` | 200 | `/shop/search?q=coat` | 200 |
| `/shop` | 200 | `/robots.txt` | 200 |
| `/about` | 200 | `/sitemap.xml` | 200 (URL 13개) |
| `/notice` | 200 | `/api/auth/session` | 200 |
| `/notice/[idx]` | 200 | `/api/duplicationIdCheck` | 200 |
| `/trendly` | 200 | `/api/monthly-collection` | 401 (의도된 인증 차단) |
| `/login`, `/signup` | 200 | | |

### 5-3. 브라우저 런타임 점검
- **`/`:** 하이드레이션 오류 없음. 콘솔 오류는 기존에도 있던 `/trend` 404 prefetch 1건뿐입니다(SEO 가이드 3-3 참고).
- **`/notice/[idx]`:** `use(params)`로 게시글 제목과 본문이 정상 렌더링됩니다.
- **`/shop`:** 콘솔 오류 0건
- **`/trendly/[id]`:** 렌더링은 정상입니다. 비로그인 상태에서 `최근 채팅 내역 불러오기 오류 FirebaseError: where() … undefined`가 발생합니다. 세션이 없을 때 `userId`가 `undefined`로 쿼리되는 **기존 로직의 문제**이며 마이그레이션과는 무관합니다(6-3 참고).

---

## 6. 남은 과제

### 6-1. ESLint 신규 규칙 (오류 48건 / 경고 34건)
Next 16에 포함된 `eslint-plugin-react-hooks@7`은 React Compiler 기준의 새 규칙을 켭니다. 이전 버전에서는 검사하지 않던 항목이고, 빌드와 런타임에는 영향이 없습니다. 검사를 끄지 않고 그대로 두었습니다.

| 규칙 | 건수 | 의미 |
|---|---|---|
| `react-hooks/set-state-in-effect` | 30 | `useEffect` 안에서 바로 `setState`를 호출해 렌더링이 연쇄로 일어남 |
| `react-hooks/exhaustive-deps` (경고) | 34 | 의존성 배열 누락 |
| `react-hooks/refs` | 10 | 렌더링 중에 `ref.current`를 읽거나 씀 |
| `react-hooks/immutability` | 7 | 선언 전 함수 호출, 외부 값 변경 등 |
| `react-hooks/static-components` | 1 | 렌더링 중에 컴포넌트를 생성함 (`DynamicComponent.tsx`) |

> 공지사항·상품 목록 컴포넌트의 `set-state-in-effect`는 SEO 가이드 3-5(서버 렌더링 전환)를 진행하면 상당수가 함께 해결됩니다.

### 6-2. 보안 취약점 (`npm audit`: high 9, critical 1)
| 패키지 | 원인 | 권장 조치 |
|---|---|---|
| `swiper` 11 (critical) | 프로토타입 오염 | v14로 업그레이드. 메이저 3단계라 import/CSS 경로 변경을 확인해야 해서 이번 작업에서는 제외 |
| `firebase` 11 → `@grpc/grpc-js` | gRPC 인증 관련 | firebase 최신 메이저로 업그레이드 검토 |
| `eslint-config-next` → `fast-glob`/`braces` | 개발 의존성 | 배포 번들에는 포함되지 않음. 상위 패키지 패치 대기 |

### 6-3. 기존 코드에서 발견한 문제 (마이그레이션과 무관)
1. **`/api/monthly-collection` 인증 우회 가능:** `process.env.VERCEL === '1'` 조건 때문에 Vercel 배포 환경에서는 **누구나** 이 cron 엔드포인트를 호출할 수 있습니다. Vercel이 권장하는 `CRON_SECRET` + `Authorization: Bearer` 헤더 검증으로 바꾸는 것을 권장합니다.
2. **`/trendly/[id]` 비로그인 오류:** 세션이 없을 때 Firestore 쿼리를 하지 않도록 막아야 합니다.
3. **`/trendly/[id]` 화면에 `;` 노출:** JSX의 `<Result docId={id} />;`에서 세미콜론이 텍스트로 렌더링됩니다.
4. **`ESLint 10` peer 경고:** `eslint-plugin-import`, `jsx-a11y`, `react`(eslint-config-next 하위 의존성)의 peer 범위가 아직 `^9`까지입니다. 설치와 실행은 정상이며, 공식 문서도 `eslint-config-next@16.4.0+`의 ESLint 10 지원을 명시하고 있습니다. 문제가 생기면 `eslint@^9`로 내리면 됩니다.

### 6-4. 정리할 파일
- `.playwright-mcp/`: 진단과 테스트 중에 생긴 폴더입니다. 삭제하거나 `.gitignore`에 추가하세요.

---

## 7. 배포 전 체크리스트

- [ ] Vercel 프로젝트의 Node.js 버전이 **20.x 이상**인지 확인 (Settings → General → Node.js Version)
- [ ] Preview 배포에서 로그인(Credentials·Kakao), 공지사항 작성, AI 컨설팅 기능 수동 점검
- [ ] 이미지가 정상 표시되는지 확인 (`remotePatterns`, 4시간 캐시 TTL)
- [ ] 필요하면 `npm run lint`를 CI에 별도 단계로 추가 (`next build`는 더 이상 lint를 실행하지 않음)

## 8. 롤백 방법

모든 변경은 커밋되지 않은 상태입니다. 아래 명령으로 마이그레이션 전으로 되돌릴 수 있습니다. 단, 작업 전부터 있던 미커밋 변경과 섞여 있으니 파일 단위로 복원하세요.
```bash
git checkout HEAD -- package.json next.config.js tsconfig.json .babelrc .eslintrc.json \
  "src/app/notice/[idx]/page.tsx" "src/app/trendly/[id]/page.tsx"
git checkout HEAD -- package-lock.json   # 이전 lockfile 복원
rm eslint.config.mjs && rm -rf node_modules && npm install
```
