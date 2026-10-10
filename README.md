### 📚 Use Tech

**주요 기술 스택**
<br/>
<br/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=SCSS&logoColor=white"/>
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&amp;logo=styled-components&amp;logoColor=white">
<img src="https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=Firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/openai-000000?style=flat-square&logo=openai&logoColor=white"/>
<br/>
<br/>
**REST API**
<br/>
<br/>
<img src="https://img.shields.io/badge/Naver-03C75A?style=flat-square&logo=Naver&logoColor=white"/>
<img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=YouTube&logoColor=white"/>
<br/>
<br/>
**CI/CD 파이프라인**
<br/>
<br/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&amp;logo=GitHub&amp;logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&amp;logo=Vercel&amp;logoColor=white">

### 🧑‍💻 프로젝트 주요 디렉토리 구조 요약

```markdown
. 📂 TrendTailor-Shopping
└── 📂 context/ _전역 레이아웃 컨텍스트_
│ ├── 📄 ModalContext.tsx _모달_
│ ├── 📄 RouteLoadingOverlay.tsx _페이지 이동 오버레이_
│ ├── 📄 ThemeContext.tsx _다크/라이트 테마 모드_
└── 📂 public/
│ ├── 📄 favicon.ico _로고 아이콘_
│ └── 📂 fonts/ _폰트 파일 (@font-face)_
│ ├── 📄 The Jamsil 6 ExtraBold.ttf
│ ├── 📄 TheJamsil-Bold.ttf
│ ├── 📄 TheJamsil-Medium.ttf
│ ├── 📄 TheJamsil-Regular.ttf
└── 📂 src/ _프로젝트 절대경로 base 디렉토리_
│ └── 📂 app/ _앱 라우터 (페이지 라우트, API 서버 라우트)_
│ ├── 📄 RootStyleRegistry.tsx _전역 SSR 스타일 태그 생성 레지스트리_
│ └── 📂 about/ _플랫폼 소개 페이지_
│ ├── 📄 page.tsx
│ └── 📂 addNotice/ _공지사항 등록 페이지_
│ ├── 📄 page.tsx
│ └── 📂 api/ _Next.js 서버리스 함수 (API 서버 라우트)_
│ └── 📂 auth/ _로그인 인증 API_
│ └── 📂 [...nextauth]/ _NextAuth 로그인 인증_
│ ├── 📄 route.ts
│ └── 📂 createNotice/ _공지사항 생성 API_
│ ├── 📄 route.ts
│ └── 📂 duplicationIdCheck/ _회원가입 > 아이디 중복 체크 API_
│ ├── 📄 route.ts
│ └── 📂 hashPassword/ _회원가입 > 회원 저장 전 비밀번호 암호화 API_
│ ├── 📄 route.ts
│ └── 📂 monthly-collection/ _월별 트랜드 데이터 수집 파이프라인 API_
│ ├── 📄 route.ts
│ └── 📂 recommendOpenAI/ _openai 프롬프트 답변 요청 API_
│ ├── 📄 route.ts
│ └── 📂 searchClothes/ _의류 검색 및 컨설팅 챗봇 의류 필터링 API_
│ ├── 📄 route.ts
│ └── 📂 serpApi/ _트렌드 키워드 검색 쿼리 SerpAPI 요청/응답 API_
│ ├── 📄 route.ts
│ ├── 📄 fonts.ts
│ ├── 📄 globalStyle.ts _스타일 컴포넌트 전역 스타일_
│ ├── 📄 globals.scss _SCSS 전역 스타일_
│ ├── 📄 layout.tsx
│ ├── 📄 loading.tsx _페이지 이동 로딩 오버레이_
│ └── 📂 login/ _로그인 페이지_
│ ├── 📄 page.tsx
│ └── 📂 notice/ _공지사항_
│ └── 📂 [idx]/ _공지사항 상세 페이지_
│ ├── 📄 page.tsx
│ ├── 📄 page.tsx _공지사항 목록 페이지_
│ ├── 📄 page.module.css
│ ├── 📄 page.tsx _메인 대시보드 페이지_
│ ├── 📄 robots.ts _웹 사이트 수집 허용 검색엔진 사이트맵 등록 파일_
│ └── 📂 shop/ _쇼핑 페이지_
│ └── 📂 [productId]/ _쇼핑 상세 페이지_
│ ├── 📄 page.tsx
│ ├── 📄 page.tsx _트렌드 쇼핑 카테고리 페이지_
│ └── 📂 search/ _헤더 의류 검색 결과 SPA 화면 전환 페이지_
│ └── 📂 [productId]/ _상품 아이디 파라미터 통한 검색 결과 화면 노출_
│ ├── 📄 page.tsx
│ ├── 📄 page.tsx
│ └── 📂 signup/ _회원가입 페이지_
│ ├── 📄 page.tsx
│ ├── 📄 sitemap.ts _검색엔진 사이트맵 파일_
│ └── 📂 trendly/ _챗봇 페이지_
│ └── 📂 [id]/ _컨설팅 결과 상세_
│ ├── 📄 page.tsx
│ ├── 📄 page.tsx
│ └── 📂 assets/ _리소스 자원 폴더_
│ └── 📂 images/
│ └── 📂 consultant/
│ └── 📂 lottie/
│ └── 📂 svgs/
│ └── 📂 component/ _컴포넌트 자원 폴더_
│ └── 📂 Dashboard/ _메인 대시보드 컴포넌트_
│ ├── 📄 Section.tsx _대시보드 본문 컴포넌트_
│ └── 📂 structure/
│ ├── 📄 Header.tsx _헤더_
│ ├── 📄 KeywordForceGraph.jsx _인기 트렌드 키워드 그래프_
│ ├── 📄 SerpApiSample.tsx _SerpAPI 수집 파이프라인 샘플 (개발 전용)_
│ ├── 📄 TrendKpiStats.tsx _트렌드 키워드/의류 수집 데이터 통계 KPI_
│ └── 📂 ui/ _대시보드 재사용성 UI 요소_
│ └── 📂 Main/ _메인 레이아웃 구조_
│ └── 📂 Peed/ _피드형 컴포넌트_
│ └── 📂 Clothes/ _쇼핑 페이지 의류 배너/피드 요소_
│ └── 📂 Contents/
│ ├── 📄 ClothesPeed.tsx
│ └── 📂 TimeLine/
│ ├── 📄 index.tsx
│ └── 📂 section/
│ └── 📂 Responsive/ _반응형 햄버거 메뉴_
│ ├── 📄 ResponsiveMenu.tsx
│ └── 📂 Pagenation/ _목록 페이지네이션_
│ ├── 📄 Pagenation.tsx
│ └── 📂 Popup/
│ ├── 📄 UserPopup.tsx
│ └── 📂 Product/ _쇼핑 > 상품 상세, 목록, 검색 결과 목록_
│ ├── 📄 ProductDetail.tsx
│ ├── 📄 ProductList.tsx
│ ├── 📄 SearchProductList.tsx
│ └── 📂 Search/
│ ├── 📄 Search.tsx
│ └── 📂 Trend/ _쇼핑 > 트렌드 컨설턴트 유튜버 관련_
│ ├── 📄 CurrentVideo.tsx
│ └── 📂 PreviewVideo/
│ ├── 📄 PreviewVideo.tsx
│ └── 📂 Skeleton/
│ └── 📂 common/ _전역 공통 컴포넌트_
│ ├── 📄 AuthSession.tsx _NextAuth 인증 세션_
│ ├── 📄 BreadCrumb.tsx _메인 대시보드 제외 페이지별 브레드크럼_
│ ├── 📄 Loading.tsx _로딩 스피너_
│ ├── 📄 NextImage.tsx _next.js Image 공통 컴포넌트_
│ ├── 📄 SessionWatcher.tsx _SPA 이동 세션 만료 감지_
│ └── 📂 modal/ _모달 컨텍스트 내부 컴포넌트_
│ ├── 📄 DynamicComponent.tsx _동적 컨텐츠_
│ ├── 📄 Error.tsx _에러 예외처리 컨텐츠_
│ └── 📂 content/ _로그인 사용자 최근 대화 이력 컨텐츠_
│ ├── 📄 Login.tsx
│ ├── 📄 RecentChats.tsx
│ ├── 📄 Slot.tsx
│ └── 📂 trendlyAI/ _Trendly 챗봇 팝업 컨테이너_
│ ├── 📄 Container.tsx
│ └── 📂 bubble/ _채팅 말풍선_
│ ├── 📄 Trendly.tsx
│ ├── 📄 User.tsx
│ └── 📂 mode/ _채팅 모드별 인터페이스_
│ └── 📂 Chat/ _일반 채팅_
│ ├── 📄 Chat.tsx
│ └── 📂 Consultant/ _컨설팅 채팅_
│ ├── 📄 Consultant.tsx
│ ├── 📄 Loading.tsx
│ └── 📂 Result/ _컨설팅 결과_
│ ├── 📄 index.tsx
│ ├── 📄 Intro.tsx
│ └── 📂 Report/ _컨설팅 리포트_
│ ├── 📄 index.tsx
│ └── 📂 Skeleton/
│ └── 📂 page/
│ ├── 📄 ChatArea.tsx
│ ├── 📄 RecentChatList.tsx
│ └── 📂 feature/ _기능 단위 유틸리티_
│ └── 📂 slug/ _키워드 slug 처리_
│ ├── 📄 keyword-slug.ts
│ └── 📂 trend/ _트렌드 데이터 수집_
│ └── 📂 jobs/ _트렌드 데이터 수집 파이프라인_
│ ├── 📄 build-graph.jobs.ts
│ ├── 📄 build-kpi.jobs.ts
│ ├── 📄 collect-clothes.jobs.ts
│ ├── 📄 generate-keyword.jobs.ts
│ └── 📂 repositories/ _트렌드 키워드/의류 리포지토리_
│ ├── 📄 trend.repository.ts
│ └── 📂 services/ _외부 API 서비스 기능 객체_
│ └── 📂 api/
│ ├── 📄 openai.service.ts
│ ├── 📄 serpApi.service.ts
│ ├── 📄 youtube.ts
│ ├── 📄 clothes.service.ts
│ └── 📂 hooks/ _커스텀 훅 파일_
│ └── 📂 shared/ _공유 유틸리티 파일_
│ └── 📂 lib/
│ ├── 📄 d3-graph-manager.ts _D3 트렌드 키워드 그래프 생성자_
│ ├── 📄 firebase.ts _firebase 연동_
│ ├── 📄 token.ts _로그인 시점 토큰 생성/관리_
│ └── 📂 types/ _전역 타입 정의_
│ ├── 📄 global.d.ts
│ ├── 📄 next-auth.d.ts
│ └── 📂 store/ _Redux 상태관리 스토어_
│ ├── 📄 chatBubbleSlice.ts
│ ├── 📄 hooks.ts
│ ├── 📄 modalSlice.ts
│ ├── 📄 monthlyClothesSlice.ts
│ └── 📂 provider/ _전역 NextAuth, Redux Provider_
│ ├── 📄 Provider.tsx
│ ├── 📄 simulationInstance.ts
│ ├── 📄 store.ts
│ └── 📂 styles/ _Style Components / SCSS 자원 파일 관리_
│ ├── 📄 \_mixin.scss _전역 믹스인 함수_
│ ├── 📄 \_tokens.scss _전역 디자인 토큰_
│ ├── 📄 index.js _스타일 컴포넌트 단위별 exports 파일_
│ └── 📂 swiper/ _스와이퍼 슬라이드 커스텀 CSS_
│ ├── 📄 swiper.css
├── 📄 tsconfig.json
└── 📄 vercel.json \*vercel cron jobs 연동\*
```

```

<br/>

### 🔎 프로젝트 요약

```

# UI 디자인

https://www.figma.com/design/InDebQfEyMfUxDzWjaY6I6/WISH-STORE?node-id=0-1&t=rSDE9IpNmHwXwqrO-1

# 배포 환경

Next.js 프레임워크 기반 CI(github) 자동화 빌드 파이프라인 CD(Vercel) 호스팅 서버를 사용하여 배포하였습니다.

# DB 환경

Firebase를 활용하여 이미지 스토리지와 트랜드 관련 데이터들을 관리하고 있습니다.

# 프로젝트 소개

- 매월 트렌드 키워드들과 키워드별 의류 컨텐츠들을 제공하며 대시보드를 통해 통계 데이터를
  시각화하여 제공하는 트랜드 패션 커뮤니티 사이트입니다.

- Next.js 14 버전 프레임워크 환경 app 라우터 구조 환경으로 프로젝트를 구성하였습니다.

- 매월마다 `vercel cron jobs` 스케줄링 기능을 통해 `OPEN AI API`와 연동하여
  트랜드 키워드와 키워드 기반 의류 데이터를 수집하는 API 라우트 (서버리스 함수)를 호출합니다.

- 사용자 의상 컨설팅 챗봇 기능을 제공합니다. 수집된 트랜드 의류 데이터들을 단계별 사용자 선택
  값을 통해 1차 필터링을 수행하며 OPEN AI API` AI 모델 비서가 각 의상별 추천 데이터를 확장합니다.

- Redux 라이브러리를 활용하여 클라이언트단 데이터 상태관리를 하고있으며
  사용자 요청에 따른 비동기 비즈니스 로직 처리를 진행하였습니다.

- Next.js의 OAuth 인증 Next-Auth 라이브러리를 사용하여 FireStore 커스텀 로그인 방식과
  소셜 로그인 인증을 구현하였습니다.

# 프로젝트를 만들게 된 계기는?

최근 AI의 기술이 발전함에 따라`OPEN AI API` 프롬프트 기능을 적극적으로 활용하여
매월 데이터 수집을 자동화하고 수집된 플랫폼내의 데이터 풀 내에서 챗봇 서비스를
구현해보고 싶었습니다. 주제를 생각하다보니 최근 사람들에게 패션 관련 트렌드가
주도하고 있으며 유행에 뒤쳐진 사용자들을 대상으로 기획과 UI/UX를
여러 레퍼런스와 AI를 활용하여 구상되는데로 작업하기 시작하였습니다.

```

<br/>

### 프로젝트 핵심 기술 소개

#### 의류 데이터 수집 파이프라인 활용 API

##### 📌 Naver Open API

- API End Point

  `https://openapi.naver.com/v1/search/shop.json`

- Naver Open API 클라이언트 요청 프록시 우회 처리

  `next.config.js` 파일에 `rewrites` 정의 추가
  - source : 사용자가 요청하는 경로
  - destination : naver open api 검색 API 주소

<br/>

#### 📌 SerpApi (08.12 추가)

##### Naver Open API 쇼핑 검색 서비스 종료
6월달부터 `Naver Open API`가 `Naver API Hub`로 API들을 이관함에 따라 7.31 기준으로 `쇼핑몰 검색 엔진 API 지원 종료`되어 대체할만한 커머스 API를 조사해보았습니다.

##### 쿠팡 파트너스 API
그중 쿠팡 파트너스에서 제공하는 OPEN API를 추천받았고 프로젝트를 등록하였지만 `15만원 이상의 수익이 있어야 이용 가능`한 서비스로 확인되었습니다.

##### 구글 노드 라이브러리 Puppeteer
`페이지 스크립터 라이브러리 (Puppeteer)`를 통해 의류 검색 결과 페이지 DOM 셀렉터로 아이템에 접근하여 수집하는 방안도 있었지만 `정책에 어긋날 수 있어 구현 중단`하였습니다.

**SerpApi?**

  1. `구글, 네이버, 빙` 등의 `다양한 검색 엔진`의 결과를 실시간으로 제공하는 API 서비스입니다.
  2. `월 250회 검색 무료 제한` 플랜이 있으며, 그 외에는 유료 플랜으로 전환됩니다.

**구현 방안**
  1. 검색 횟수 증폭 방지를 위해 트랜드 키워드별 의류 `검색 쿼리 Quota 최적화` 예정
  2. 트렌드 키워드 1개당 3~4번 조회 방식 `트렌드 키워드 + 하위 카테고리(상의/하의/신발)` -> <br/> 키워드 1개당 1번만 수행 `트렌드 키워드 + 명시적 접미사 조합`
<br/>
<br/>

#### 📌 OPEN AI API

##### 노드 라이브러리 및 버전
- `openai 4.81.0`

##### 구현 범주
- 공통 규격
  - AI 활용 범주에 따라 최적화된 프롬프트 (유저/시스템) 정의
  - 함수형 스키마 (function calling) 활용하여 정해진 스키마 형태로 응답받아서 처리

- 현재 정의된 시스템 프롬프트 역할
  - 사용자에게 컨설팅된 의류별 추천 이유와 팁 공유하는 `전문 패션 매장 직원`
  - 월별 트랜드 키워드 수집하는 `한국 패션 트렌드 분석가`




```
