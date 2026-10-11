## 📚 Use Tech

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
<img src="https://img.shields.io/badge/GitHub-000000?style=flat-square&amp;logo=GitHub&amp;logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&amp;logo=Vercel&amp;logoColor=white">

## 🧑‍💻 프로젝트 주요 디렉토리 구조

```markdown
. 📂 TrendTailor-Shopping
└── 📂 context/ _전역 레이아웃 컨텍스트_
│  ├── 📄 ModalContext.tsx _모달_
│  ├── 📄 RouteLoadingOverlay.tsx _페이지 이동 오버레이_
│  ├── 📄 ThemeContext.tsx _다크/라이트 테마 모드_
└── 📂 public/
│  ├── 📄 favicon.ico _로고 아이콘_
│  └── 📂 fonts/ _폰트 파일 (@font-face)_
└── 📂 src/ _프로젝트 base 디렉토리 경로_
│  └── 📂 app/ _앱 라우터_
│     ├── 📄 RootStyleRegistry.tsx _전역 SSR 스타일 태그 생성 레지스트리_
│     └── 📂 about/ _플랫폼 소개 페이지_
│        ├── 📄 page.tsx
│     └── 📂 addNotice/ _공지사항 등록 페이지_
│        ├── 📄 page.tsx
│     └── 📂 api/ _Next.js 서버리스 함수 (API 서버 라우트)_
│        └── 📂 auth/ _로그인 인증 API_
│           └── 📂 [...nextauth]/ _NextAuth 로그인 인증_
│              ├── 📄 route.ts
│        └── 📂 createNotice/ _공지사항 생성 API_
│              ├── 📄 route.ts
│        └── 📂 duplicationIdCheck/ _회원가입 > 아이디 중복 체크 API_
│              ├── 📄 route.ts
│        └── 📂 hashPassword/ _회원가입 > 회원 저장 비밀번호 암호화 API_
│              ├── 📄 route.ts
│        └── 📂 monthly-collection/ _월별 트랜드 데이터 수집 파이프라인 호출 API_
│              ├── 📄 route.ts
│        └── 📂 recommendOpenAI/ _커스텀 옵션 OPENAI completion API 호출 API_
│              ├── 📄 route.ts
│        └── 📂 searchClothes/ _의류 검색 및 컨설팅 챗봇 의류 필터링 API_
│              ├── 📄 route.ts
│        └── 📂 serpApi/ _트렌드 키워드 검색 쿼리 파라미터 SerpAPI 요청/응답 처리 API_
│              ├── 📄 route.ts
│        ├── 📄 fonts.ts _전역 폰트 설정 @font-face_
│        ├── 📄 globalStyle.ts _전역 기본 스타일 (스타일 컴포넌트)_
│        ├── 📄 globals.scss _SCSS 전역 스타일_
│        ├── 📄 layout.tsx _전역 레이아웃 CSS_
│        ├── 📄 loading.tsx _페이지 이동 로딩 오버레이_
│        └── 📂 login/ _로그인 페이지_
│           ├── 📄 page.tsx
│        └── 📂 notice/ _공지사항 페이지_
│         └── 📂 [idx]/ _공지사항 상세_
│           ├── 📄 page.tsx
│         ├── 📄 page.tsx _공지사항 목록_
│        ├── 📄 page.tsx _메인 페이지 (대시보드)_
│        ├── 📄 robots.ts _웹 사이트 수집 허용 검색엔진 사이트맵 등록 파일_
│        └── 📂 shop/ _쇼핑 목록 페이지_
│          ├── 📄 page.tsx
│        └── 📂 search/ _쇼핑 의류 검색 결과 목록_
│          ├── 📄 page.tsx
│        └── 📂 signup/ _회원가입 페이지_
│          ├── 📄 page.tsx
│        ├── 📄 sitemap.ts _검색엔진 사이트맵 파일_
│        └── 📂 trendly/ _챗봇 페이지_
│          └── 📂 [id]/ _컨설팅 결과 상세_
│            ├── 📄 page.tsx
│          ├── 📄 page.tsx
│  └── 📂 assets/ _리소스 자원 폴더_
│    └── 📂 images/
│      └── 📂 consultant/
│        └── 📂 lottie/
│        └── 📂 svgs/
│  └── 📂 component/ _컴포넌트 자원 폴더_
│    └── 📂 Dashboard/ _메인 대시보드 컴포넌트_
│      ├── 📄 Section.tsx _대시보드 본문 컴포넌트_
│      └── 📂 structure/
│        ├── 📄 Header.tsx _헤더_
│        ├── 📄 KeywordForceGraph.jsx _인기 트렌드 키워드 그래프_
│        ├── 📄 SerpApiSample.tsx _SerpAPI 수집 파이프라인 샘플 (개발 전용)_
│        ├── 📄 TrendKpiStats.tsx _트렌드 키워드/의류 수집 데이터 통계 KPI_
│     └── 📂 ui/ _대시보드 재사용성 UI 요소_
│     └── 📂 Main/ _메인 레이아웃 구조_
│       └── 📂 Peed/ _피드형 컴포넌트_
|       └── 📂 Responsive/ _반응형 레이아웃 컴포넌트_
│       ├── 📄 Footer.tsx _푸터_
│       ├── 📄 Navbar.tsx _네비게이션_
│    └── 📂 Pagenation/ _페이지네이션_
│    └── 📂 Popup/ _팝업_
│    └── 📂 Product/ _(기본/검색) 유형별 상품 목록 리스트_
│    └── 📂 Search/ _검색 입력 폼 요소_
│    └── 📂 Trend/ _트렌드 컨설턴트 영상 관련 컴포넌트_
│      └── 📂 PreviewVideo/
│      └── 📂 Skeleton/
│    └── 📂 common/ _전역 공통 컴포넌트_
│      ├── 📄 AuthSession.tsx _NextAuth 인증 세션_
│      ├── 📄 BreadCrumb.tsx _메인 대시보드 제외 페이지별 브레드크럼_
│      ├── 📄 Loading.tsx _로딩 스피너_
│      ├── 📄 NextImage.tsx _next.js Image 공통 컴포넌트_
│      ├── 📄 SessionWatcher.tsx _SPA 페이지 이동 세션 만료 감지_
│      └── 📂 modal/ _모달 컨텍스트 내부 컴포넌트_
│        ├── 📄 DynamicComponent.tsx _동적 컨텐츠_
│        ├── 📄 Error.tsx _에러 예외처리 컨텐츠_
│        └── 📂 content/ _로그인 사용자 최근 대화 이력 컨텐츠_
│          ├── 📄 Login.tsx
│          ├── 📄 RecentChats.tsx
│          ├── 📄 Slot.tsx
│      └── 📂 trendlyAI/ _Trendly 챗봇 팝업 컨테이너_
│        ├── 📄 Container.tsx
│        └── 📂 bubble/ _채팅 말풍선_
│          ├── 📄 Trendly.tsx
│          ├── 📄 User.tsx
│        └── 📂 mode/ _채팅 모드별 인터페이스_
│          └── 📂 Chat/ _일반 채팅_
│            ├── 📄 Chat.tsx
│          └── 📂 Consultant/ _컨설팅 채팅_
│            ├── 📄 Consultant.tsx
│            ├── 📄 Loading.tsx
│            └── 📂 Result/ _컨설팅 결과_
│              ├── 📄 index.tsx
│          ├── 📄 Intro.tsx
│          └── 📂 Report/ _컨설팅 리포트_
│            ├── 📄 index.tsx
│        └── 📂 page/
│          ├── 📄 ChatArea.tsx
│          ├── 📄 RecentChatList.tsx
│  └── 📂 feature/  _도메인 레이어 기능 유틸리티_
│    └── 📂 slug/ _slugify 도메인_
│    └── 📂 store/ _Redux 상태관리 도메인_
│      └── 📂 provider/ _전역 레이아웃 상태관리 공유 Provider_
│      ├── 📄 store.ts _Redux reducer store 등록_
│    └── 📂 trend/ _트렌드 데이터 수집 도메인_
│      └── 📂 jobs/ _작업 트리 파이프라인_
│        ├── 📄 build-graph.jobs.ts _인기 트랜드 그래프 생성 호출 파이프라인_
│        ├── 📄 build-kpi.jobs.ts _트렌드 키워드/의류 데이터 KPI 통계 파이프라인_
│        ├── 📄 collect-clothes.jobs.ts _트렌드 의류 수집 파이프라인_
│        ├── 📄 generate-keyword.jobs.ts _트렌드 키워드 생성 파이프라인_
│      └── 📂 repositories/ _트렌드 의류/키워드 리포지토리 연동_
│        ├── 📄 trend.repository.ts
│      └── 📂 services/ _외부 API 서비스 객체_
│        └── 📂 api/
│          ├── 📄 openai.service.ts
│          ├── 📄 serpApi.service.ts
│          ├── 📄 youtube.ts
│        ├── 📄 clothes.service.ts
│  └── 📂 hooks/ _커스텀 훅 파일_
│    └── 📂 shared/ _공유 유틸리티 파일_
│     └── 📂 lib/
│      ├── 📄 d3-graph-manager.ts _D3 트렌드 키워드 그래프 생성자_
│      ├── 📄 firebase.ts _firebase 연동_
│      ├── 📄 token.ts _로그인 시점 토큰 생성/관리_
│     └── 📂 types/ _전역 타입 정의_
│      ├── 📄 global.d.ts
│      ├── 📄 next-auth.d.ts
│ └── 📂 styles/ _Style Components / SCSS 자원 파일 관리_
│ ├── 📄 \_mixin.scss _전역 믹스인 함수_
│ ├── 📄 \_tokens.scss _전역 디자인 토큰_
│ ├── 📄 index.js _스타일 컴포넌트 단위별 exports 파일_
│ └── 📂 swiper/ _스와이퍼 슬라이드 커스텀 CSS_
├── 📄 tsconfig.json
└── 📄 vercel.json _VERCEL CRON JOBS 스케줄링 등록_
```


<br/>

## 🔎 프로젝트 요약

### 프로젝트 목표

처음 패션에 관심을 가지고 접근하거나 트렌드에 관심이 많은 사용자들을 대상으로 월별로 트렌드 패션 키워드와 의류 데이터들의 통계를 자동화하여 다양한 인터페이스로 제공하여 이목을 집중시키고 사용자별로 원하는 의류를 컨설팅 받고 커뮤니티로 자유롭게 소통하는 플랫폼을 구축하고 싶었습니다. 

해당 프로젝트를 통해 추후 다양한 쇼핑몰 및 인플루언서들과 협업하여 컨설턴트들을 꾸려 경쟁하는 구도 또한 만들어내고 싶은 목표를 가지고 있습니다.

### 프로젝트 구성

- 매월 트렌드 키워드들과 키워드별 의류 컨텐츠들을 제공하며 대시보드를 통해 통계 데이터를
  시각화하여 제공하는 `트렌드 패션 커뮤니티 사이트`입니다.

- `Next.js 13` 버전 프레임워크 환경 app 라우터 구조 환경으로 프로젝트를 구성하였습니다. 기능 개발 완료 후 16버전 버전업과 동시에 프로젝트 안정화 작업을 진행할 예정입니다.

- 매월마다 `vercel 클라우드 환경 cron jobs` 스케줄링 기능을 통해 `OPEN AI API` 기반
  트렌드 키워드 수집 및 `SerpAPI` 기반 트렌드 의류 데이터 수집 작업 파이프라인을 실행하는 API 서버 라우트를 호출합니다.

- `사용자 의상 컨설팅 챗봇 기능`을 제공합니다. `LLM 비용 절감`을 고려하여 수집된 트랜드 의류 데이터 풀 전체를 보내지 않고 설문 단계별 사용자 선택 값을 통해 1차 필터링을 클라이언트에서 직접 수행하며 `OPEN AI API` AI 모델 비서가 각 의상별 추천 데이터를 확장합니다.

- 더욱 정밀한 트렌드 키워드 수집, 컨설팅 의류별 추천 데이터 확장 자동화를 위해 `LLM 프롬프트 엔지니어링`을 적용하여 `트렌드 의류 매장 직원`, `패션 트렌드 전문 분석가` 페르소나 프롬프트를 작성하였습니다.

- Redux 라이브러리를 활용하여 클라이언트단 전역 상태관리를 하고있으며
  사용자 요청에 따른 비동기 비즈니스 로직 처리를 동시에 진행하였습니다.

- Next.js의 OAuth 인증 Next-Auth 라이브러리를 사용하여 FireStore 커스텀 로그인 방식과
  카카오 소셜 로그인 인증을 구현하였습니다.
  
<br />

```
# 초기 설계 및 디자인

https://www.figma.com/design/InDebQfEyMfUxDzWjaY6I6/WISH-STORE?node-id=0-1&t=rSDE9IpNmHwXwqrO-1

# 배포 환경

Next.js 프레임워크 기반 배포/운영 클라우드 플랫폼 Vercel 프로젝트에 github 리포지토리를 연동하여 배포하였습니다.

# DB 환경

초반에는 AWS EC2 기반 express, mysql 서버 호스팅하여 DB를 연동하였지만 초기 서버 사이드 렌더링 시점 Vercel Serverless Function timeout 오류로 인해 구글 백엔드 서비스 플랫폼 Firebase로 이전하여 이미지 스토리지와 데이터 CRUD를 관리하고 있습니다.
```
<br/>

## 프로젝트 핵심 기술 소개

#### 의류 데이터 수집 파이프라인 활용 API

##### 📌 Naver Open API (삭제)

- API End Point

  `https://openapi.naver.com/v1/search/shop.json`

- Naver Open API 클라이언트 요청 프록시 우회 처리

  `next.config.js` 파일에 `rewrites` 정의 추가
  - source : 사용자가 요청하는 경로
  - destination : naver open api 검색 API 주소

<br/>

#### 📌 SerpApi (08.12 추가)

#### 개요
##### Naver Open API 쇼핑 검색 서비스 종료
6월달부터 `Naver Open API`가 `Naver API Hub`로 API들을 이관함에 따라 7.31 기준으로 `쇼핑몰 검색 엔진 API 지원 종료`되어 대체할만한 커머스 API를 조사해보았습니다.

##### 쿠팡 파트너스 API
그중 쿠팡 파트너스에서 제공하는 OPEN API를 추천받았고 프로젝트를 등록하였지만 `15만원 이상의 수익이 있어야 이용 가능`한 서비스로 확인되었습니다.

##### 구글 노드 라이브러리 Puppeteer
`페이지 스크립터 라이브러리 (Puppeteer)`를 통해 의류 검색 결과 페이지 DOM 셀렉터로 아이템에 접근하여 수집하는 방안도 있었지만 `정책에 어긋날 수 있어 구현 중단`하였습니다.

#### SerpApi?

  1. `구글, 네이버, 빙` 등의 `다양한 검색 엔진`의 결과를 실시간으로 제공하는 API 서비스입니다.
  2. `월 250회 검색 무료 제한` 플랜이 있으며, 그 외에는 유료 플랜으로 전환됩니다.

#### 구현 방안
  1. 검색 횟수 증폭 방지를 위해 트랜드 키워드별 의류 `검색 쿼리 Quota 최적화`
  2. 트렌드 키워드 1개당 3~4번 조회 방식 `트렌드 키워드 + 하위 카테고리(상의/하의/신발)` -> <br/> 키워드 1개당 1번만 수행 `트렌드 키워드 + 명시적 접미사 조합`
  3. API_KEY 클라이언트 노출 방지를 위해 검색 쿼리 파라미터를 통한 요청 payload 자동 규격화 서버 라우트 구축
<br/>
<br/>

#### 📌 OPEN AI API

##### 노드 라이브러리 및 버전
- `openai 4.81.0`

##### 구현 범주
- 공통 규격
  - AI 활용 범주에 따라 최적화된 프롬프트 (유저/시스템) 정의
  - 함수형 스키마 (function calling) 활용하여 정해진 스키마 형태로 응답받아서 처리

- 현재 정의된 페르소나 프롬프트 역할
  - 사용자에게 컨설팅된 의류별 추천 이유와 팁 공유하는 `전문 패션 매장 직원`
  - 월별 트랜드 키워드 수집하는 `한국 패션 트렌드 분석가`

- `API_KEY 클라이언트 노출 방지`를 위해 서버 라우트 구축

- `컨설팅 (Function Schema)` or `일반 채팅 (SSE Streaming)` 호출 유형에 따른 모델, 프롬프트 포함 옵션 답변 분기 처리
