# TrendTailor SEO 진단 결과 및 개선 가이드

- **진단 대상:** https://trendtailor-store.vercel.app
- **진단 일자:** 2026-10-17
- **진단 도구:** claude-seo 플러그인 v2.4.2 (`/seo audit`)
- **사이트 유형:** 패션 트렌드 포트폴리오 (외부 상품 링크형, 자체 판매 쇼핑몰 아님)

---

## 1. 종합 점수

**SEO 종합 점수: 36 / 100**

| 영역 | 점수 | 가중치 |
|---|---|---|
| 기술 SEO | 48 | 22% |
| 콘텐츠 품질 | 28 | 23% |
| 온페이지 (제목·설명·헤딩) | 22 | 20% |
| 구조화 데이터 (Schema) | 5 | 10% |
| 페이지 속도 (Core Web Vitals) | 약 70* | 10% |
| AI 검색 대응 (GEO) | 34 | 10% |
| 이미지 | 약 65* | 5% |

\* 추정치입니다. Google PageSpeed 무료 API가 사용량 한도에 걸려, 로컬 브라우저(모바일 화면 크기, 빠른 네트워크)에서 직접 측정했습니다. 실제 모바일 환경에서는 수치가 더 나쁘게 나올 수 있습니다.

| 페이지 | LCP (주요 콘텐츠 표시) | CLS (레이아웃 이동) | 비고 |
|---|---|---|---|
| `/shop` | 약 1.0초 | 0.066 (양호) | HTML 크기 1.6MB |
| `/` (홈) | 빠름 | **0.152 (기준 0.1 초과)** | 대시보드 수치가 "—"에서 실제 값으로 바뀌며 발생하는 것으로 추정 |

---

## 2. 가장 큰 문제: 검색엔진이 다른 사이트를 안내받고 있음

`src/app/robots.ts`와 `src/app/sitemap.ts`에 `https://wishstore.vercel.app`이 하드코딩되어 있습니다. 이 주소는 제목이 "Wishstore"인 **별도의 운영 중인 사이트**입니다.

- 사이트맵의 모든 URL(공지사항 게시글 포함)이 다른 도메인을 가리킵니다.
- 어떤 페이지에도 canonical 태그("이 페이지의 공식 URL은 여기입니다"라고 알려주는 태그)가 없어 바로잡을 수단도 없습니다.
- 링크 미리보기 문구(og:description), 푸터 저작권 표기, About 페이지 제목에도 예전 "WISH" 브랜드가 남아 있습니다.

이 문제를 고치기 전까지는 Google이 trendtailor-store를 색인할 이유가 거의 없습니다.

---

## 3. 개선 작업 목록

### 🔴 긴급 (오늘 바로)

#### 3-1. robots와 사이트맵 도메인 수정
- `src/app/sitemap.ts`, `src/app/robots.ts`의 기준 URL을 `https://trendtailor-store.vercel.app`으로 변경합니다.
  - 재발 방지를 위해 `NEXT_PUBLIC_SITE_URL` 같은 환경 변수에서 읽어오는 것을 권장합니다.
- robots의 `Host:` 줄을 삭제합니다. (Google은 이 지시어를 사용하지 않습니다.)
- 사이트맵의 `/trend` 항목을 실제 존재하는 `/trendly`로 바꿉니다. (`/trend`는 404입니다.)
- **실패 판단 기준:** `curl https://trendtailor-store.vercel.app/sitemap.xml | grep wishstore` 결과가 하나라도 나오면 실패입니다.
- **지켜볼 지표:** Search Console에서 사이트맵의 "발견된 URL"이 0보다 커지는지 확인합니다.

```ts
// src/app/robots.ts 예시
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trendtailor-store.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

#### 3-2. 사이트 주소와 canonical 태그 추가 (`src/app/layout.tsx`)
- 3-1과 같은 도메인을 가리키도록 함께 작업합니다.

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://trendtailor-store.vercel.app"),
  alternates: { canonical: "./" },
  // ...
};
```

#### 3-3. 홈 화면의 깨진 링크 수정
- 홈에서 `/trend`, `/trend-keyword`로 가는 링크가 모두 404를 반환합니다.
- `/trendly`로 연결하거나 해당 페이지를 새로 만듭니다.
- 404 시 사용자가 길을 잃지 않도록 `src/app/not-found.tsx`도 추가하면 좋습니다.

### 🟠 높음 (이번 주)

#### 3-4. 페이지마다 고유한 제목과 설명 설정
- 현재 모든 페이지의 제목이 "TrendTailor" 하나입니다.
- `/shop`, `/about`, `/trendly`는 각 `page.tsx`에서 `metadata`를 export합니다.
- `src/app/notice/page.tsx`는 `"use client"` 컴포넌트라 metadata를 export할 수 없습니다. `src/app/notice/layout.tsx`를 만들어 거기에 metadata를 넣습니다.
- 공지사항 상세 페이지는 `generateMetadata`로 게시글 제목을 페이지 제목으로 사용합니다.
- 제목 예시: `공지사항 | TrendTailor`, `트렌드 쇼핑 | TrendTailor`

#### 3-5. 공지사항을 서버에서 렌더링
- `src/app/notice/[idx]/page.tsx`는 브라우저에 페이지가 뜬 뒤 `useEffect`로 Firestore에서 글을 불러옵니다. 그래서 검색엔진에는 **빈 페이지**로 보입니다.
- 공지사항 목록도 같은 문제가 있으며, 게시글로 가는 `<a href>` 링크가 HTML에 없습니다.
- 서버 컴포넌트에서 데이터를 가져오고, 인터랙션이 필요한 부분만 작은 클라이언트 컴포넌트로 분리합니다.
- 이 작업이 끝나야 3-8의 게시글 구조화 데이터를 넣을 수 있습니다.

#### 3-6. 예전 WISH 브랜드 흔적 제거
- `layout.tsx`의 `openGraph` 설명 문구 ("WISH 쇼핑몰에서는 …")
- 푸터의 "Copyright (c) WISH. All Rights Reserved"
- About 페이지 문구 ("At wish, we are …")
- `openGraph`에 `url`, `siteName`, `locale: "ko_KR"`, `type`, 이미지도 함께 채웁니다.

#### 3-7. 페이지당 H1은 하나만
- 현재 H1 개수: 홈 3개, About 9개, `/shop` 10개, 공지사항 3개
- 로고 "TrendTailor"가 모든 페이지에서 H1입니다. 로고는 헤딩이 아닌 요소(`<a>`, `<div>` 등)로 바꿉니다.
- 확인할 컴포넌트: `src/component/About`, `src/component/Main` 하위

### 🟡 중간 (이번 달)

#### 3-8. 구조화 데이터(JSON-LD) 추가
아래 형태로 `<script>` 태그를 렌더링합니다.

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
/>
```

**A. 사이트 전체 (`src/app/layout.tsx`의 `<body>` 안)**
```json
{"@context":"https://schema.org","@graph":[
  {"@type":"WebSite","@id":"https://trendtailor-store.vercel.app/#website","url":"https://trendtailor-store.vercel.app/","name":"TrendTailor","inLanguage":"ko-KR","publisher":{"@id":"https://trendtailor-store.vercel.app/#org"}},
  {"@type":"Organization","@id":"https://trendtailor-store.vercel.app/#org","name":"TrendTailor","url":"https://trendtailor-store.vercel.app/","logo":"https://trendtailor-store.vercel.app/favicon.ico"}
]}
```
- 로고는 112×112 이상의 PNG로 교체하는 것이 좋습니다.
- 실제 검색 URL이 확인되기 전까지 `SearchAction`은 넣지 않습니다.

**B. `/shop` (`src/app/shop/page.tsx`)**
```json
{"@context":"https://schema.org","@type":"CollectionPage","name":"TrendTailor Shop","url":"https://trendtailor-store.vercel.app/shop","isPartOf":{"@id":"https://trendtailor-store.vercel.app/#website"},"inLanguage":"ko-KR"}
```

**C. `/about` (`src/app/about/page.tsx`)**
```json
{"@context":"https://schema.org","@type":"AboutPage","name":"About TrendTailor","url":"https://trendtailor-store.vercel.app/about","about":{"@id":"https://trendtailor-store.vercel.app/#org"}}
```

**D. 이동 경로 (BreadCrumb 컴포넌트 또는 페이지별)**
```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
  {"@type":"ListItem","position":1,"name":"Home","item":"https://trendtailor-store.vercel.app/"},
  {"@type":"ListItem","position":2,"name":"공지사항","item":"https://trendtailor-store.vercel.app/notice"}
]}
```

**E. 공지사항 상세 (3-5 서버 렌더링 이후, Firestore 데이터로 채움)**
```json
{"@context":"https://schema.org","@type":"BlogPosting","headline":"<제목>","datePublished":"<ISO 8601 날짜>","author":{"@type":"Person","name":"<작성자>"},"image":["<절대 경로 이미지 URL>"],"mainEntityOfPage":"https://trendtailor-store.vercel.app/notice/<id>","publisher":{"@id":"https://trendtailor-store.vercel.app/#org"}}
```

> ⚠️ `/shop`에는 `Product` 구조화 데이터를 넣지 마세요. 상품 링크가 판매처가 아니라 Google 쇼핑 검색 결과로 연결되기 때문에 Google이 상품으로 인정하지 않습니다.

#### 3-9. 대시보드 수치를 서버에서 불러오기
- 홈의 대시보드 수치 5개(상품 수, 분석 키워드 수, 1위 키워드, 신규 상품, 신규 키워드)가 검색엔진·AI에는 "—"로만 보입니다.
- 서버(RSC/ISR)에서 불러와 날짜와 함께 일반 텍스트로 출력합니다. 예: "2026년 10월 인기 1위 키워드: ○○"
- 이렇게 하면 홈의 레이아웃 이동(CLS 0.152) 문제도 함께 해결됩니다.

#### 3-10. `/shop` 용량 줄이기 (HTML 1.6MB)
- `src/component/Main/Peed/Contents/ClothesPeed.tsx`의 상품 피드를 페이지네이션하거나 지연 로딩합니다.
- 페이지에 직렬화되는 데이터 양을 줄입니다.
- 가격을 원(₩) 단위로, 상품명을 한국어로 표시합니다. (현재 `price: 510000` 같은 숫자와 영어 상품명이 그대로 노출)

#### 3-11. 홈과 About 페이지 내용 보강
- 현재 각각 약 150단어로 매우 짧습니다.
- 추가하면 좋은 내용:
  - 데이터 출처와 수집 방법 (어떤 API를, 얼마나 자주)
  - 날짜가 명시된 월간 트렌드 키워드 요약
  - 제작자 소개와 GitHub 링크
- "아년ㅇ", "로그인 유저 공지사항 작성 테스트입니다." 같은 테스트 게시글은 삭제합니다.
- 오타 수정: "trand" → "trend", "트랜드" → "트렌드"

### 🟢 낮음 (여유 있을 때)
- `next.config.js`의 `headers()`에 보안 헤더 추가: `X-Content-Type-Options`, `X-Frame-Options`(또는 CSP `frame-ancestors`), `Referrer-Policy`
- `/llms.txt` 파일(AI 도구용 사이트 요약) 추가
- 링크 미리보기용 OG 이미지와 apple-touch-icon을 `public/`에 추가
- `next.config.js`에서 더 이상 권장되지 않는 `images.domains`를 제거하고 `remotePatterns`만 사용, `formats`에 `image/avif` 추가

---

## 4. 현실적으로 노려볼 만한 키워드

- **피해야 할 키워드:** "가을 패션 트렌드" 같은 큰 키워드는 Vogue Korea, Elle Korea 같은 매거진이 상위를 차지하고 있습니다.
- **가장 좋은 기회:** 서버에서 렌더링되는 월간 리포트 페이지를 새로 만들어 아래 키워드를 노립니다.
  - 2026년 10월 패션 트렌드 키워드
  - 월별 패션 트렌드 대시보드
  - 이번달 인기 의류 키워드

| 페이지 | 타깃 키워드 |
|---|---|
| `/` (홈) | 패션 트렌드 키워드 분석, 월별 패션 트렌드 대시보드, TrendTailor |
| `/shop` | 금주 트렌드 의류, [키워드] + 트렌드 아이템 (상품 서버 렌더링 이후) |
| `/trendly` | AI 패션 컨설팅, AI 스타일 추천 챗봇 |
| 신규 월간 리포트 | 2026년 10월 패션 트렌드 키워드, 이번달 인기 의류 키워드 |

---

## 5. 참고 사항

- **`wishstore.vercel.app` 리다이렉트:** 별도로 운영 중인 사이트이므로 무조건 리다이렉트하지 마세요. 예전 프로젝트이고 더 이상 필요 없을 때만 301 리다이렉트를 고려합니다.
- **`.playwright-mcp/` 폴더:** 페이지 속도 측정 중 프로젝트에 생성되었습니다. 삭제하거나 `.gitignore`에 추가하세요.
- **추가 진단:** Google API 키를 설정하면 `/seo google`로 실사용자 속도 데이터와 Search Console 색인 상태를 확인할 수 있습니다.

---

## 6. 작업 체크리스트

- [ ] 3-1 robots·사이트맵 도메인 수정
- [ ] 3-2 `metadataBase`와 canonical 추가
- [ ] 3-3 깨진 링크 수정 (`/trend`, `/trend-keyword`)
- [ ] 3-4 페이지별 제목·설명
- [ ] 3-5 공지사항 서버 렌더링
- [ ] 3-6 WISH 브랜드 흔적 제거
- [ ] 3-7 페이지당 H1 하나
- [ ] 3-8 구조화 데이터 추가
- [ ] 3-9 대시보드 수치 서버 렌더링
- [ ] 3-10 `/shop` 용량 줄이기
- [ ] 3-11 홈·About 내용 보강, 테스트 게시글 삭제
- [ ] 낮음 우선순위 항목
