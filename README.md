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
. 📂 src
└── 📂 app/ *메인 앱 라우터*
│  ├── 📄 RootStyleRegistry.tsx *SSR 스타일 태그 생성 레지스트리*
│  └── 📂 about/ *페이지 소개 페이지*
│    ├── 📄 page.tsx
│  └── 📂 addNotice/ *공지사항 추가 페이지*
│    ├── 📄 page.tsx
│  └── 📂 api/ *Next.js 서버리스 함수 (API 서버 라우트)*
│    └── 📂 auth/ *로그인 인증 API*
│      └── 📂 [...nextauth]/ *NextAuth 로그인 인증*
│    └── 📂 createNotice/ *공지사항 생성 API*
│    └── 📂 duplicationIdCheck/ *회원가입 > 아이디 중복 체크 API*
│    └── 📂 hashPassword/ *회원가입 > 비밀번호 암호화 API*
│    └── 📂 login/ *로그인 API*
│    └── 📂 monthly-collection/ *월별 트랜드 데이터 수집 파이프라인 API*
│    └── 📂 recommendOpenAI/ *openai 프롬프트 답변 요청 API*
│    └── 📂 searchClothes/ *의류 검색 및 컨설팅 챗봇 의류 필터링 API*
│  ├── 📄 globalStyle.ts  *스타일 컴포넌트 전역 스타일*
│  ├── 📄 globals.scss *SCSS 전역 스타일*
│  ├── 📄 layout.tsx
│  ├── 📄 loading.tsx *페이지 이동 로딩 오버레이*
│  └── 📂 login/ *로그인 페이지*
│    ├── 📄 page.tsx
│  └── 📂 notice/ *공지사항 페이지*
│    └── 📂 [idx]/ *공지사항 상세*
│      ├── 📄 page.tsx
│    ├── 📄 page.tsx
│  ├── 📄 page.module.css
│  ├── 📄 page.tsx
│  ├── 📄 robots.ts
│  └── 📂 shop/ *쇼핑 페이지*
│    └── 📂 [productId]/ *의류 상세*
│      ├── 📄 page.tsx
│    ├── 📄 page.tsx
│    └── 📂 search/ *검색 결과 페이지*
│      └── 📂 [productId]/
│        ├── 📄 page.tsx
│      ├── 📄 page.tsx
│  └── 📂 signup/ *회원가입 페이지*
│    ├── 📄 page.tsx
│  ├── 📄 sitemap.ts *검색엔진 사이트맵 파일*
│  └── 📂 trendly/ *챗봇 페이지*
│    └── 📂 [id]/ *컨설팅 결과 상세*
│      ├── 📄 page.tsx
│    ├── 📄 page.tsx
└── 📂 assets/ *자원 폴더*
│  └── 📂 images/
│  └── 📂 lottie/
│  └── 📂 svgs/
└── 📂 component/ *컴포넌트 폴더*
│  └── 📂 About/
│  └── 📂 Dashboard/ *대시보드*
│    └── 📂 architecture/
│    └── 📂 structure/
│    └── 📂 ui/
│  └── 📂 Pagenation/ *페이지네이션*
│  └── 📂 Popup/ *팝업*
│  └── 📂 Product/ *상품 아이템*
│  └── 📂 Search/ *검색 폼*
│  └── 📂 Trend/ *트렌드 배너*
│    └── 📂 PreviewVideo/
│    └── 📂 Skeleton/
│  └── 📂 common/ *공통*
│    ├── 📄 AuthSession.tsx
│    ├── 📄 BreadCrumb.tsx
│    ├── 📄 Loading.tsx
│    ├── 📄 NextImage.tsx
│    ├── 📄 SessionWatcher.tsx
│    └── 📂 modal/ *모달*
│      ├── 📄 DynamicComponent.tsx
│      ├── 📄 Error.tsx
│      └── 📂 content/ *컨텐츠*
│        ├── 📄 Login.tsx
│        ├── 📄 Service.tsx
│        ├── 📄 Signup.tsx
│  ├── 📄 svgData.js *svg 컬렉션 관리*
│  └── 📂 trendlyAI/ *trendly 챗봇*
│    ├── 📄 Container.tsx *챗봇 팝업 컨테이너*
│    └── 📂 bubble/ *말풍선*
│      ├── 📄 Trendly.tsx
│      ├── 📄 User.tsx
│    └── 📂 mode/ *모드 템플릿*
│      └── 📂 Chat/ *채팅*
│        ├── 📄 Chat.tsx
│      └── 📂 Consultant/ *컨설팅*
│        ├── 📄 Consultant.tsx
│        ├── 📄 Loading.tsx
│        └── 📂 Result/ *컨설팅 결과*
│          ├── 📄 index.tsx
│      ├── 📄 Intro.tsx
│    └── 📂 page/
│      ├── 📄 ChatArea.tsx
│      ├── 📄 RecentChatList.tsx
└── 📂 feature/ *기능(features) 레이어*
│  └── 📂 slug/ *트렌드 키워드 DB 저장 슬러그명 처리*
│    ├── 📄 keyword-slug.ts
│  └── 📂 trend/ *트렌드 데이터 수집 파이프라인*
│    └── 📂 jobs/
│      ├── 📄 build-graph.jobs.ts
│      ├── 📄 collect-clothes.jobs.ts
│      ├── 📄 generate-keyword.jobs.ts
│    └── 📂 repositories/
│      ├── 📄 trend.repository.ts
│    └── 📂 services/
│      └── 📂 api/
│        ├── 📄 naver.service.ts
│        ├── 📄 openai.service.ts
│        ├── 📄 serpApi.service.ts
│      ├── 📄 clothes.service.ts
│      ├── 📄 trend.service.ts
└── 📂 hooks/ *커스텀 훅*
│  ├── 📄 ScrollToTop.tsx
│  ├── 📄 useBreadcrumb.ts
│  ├── 📄 useToastify.ts
│  ├── 📄 useWindowSize.tsx
└── 📂 shared/ *API 유틸리티 함수 및 타입 정의*
│  └── 📂 lib/
│    ├── 📄 customRenderer.js
│    ├── 📄 firebase.ts
│    ├── 📄 token.ts
│  └── 📂 types/
│    ├── 📄 global.d.ts
│    ├── 📄 next-auth.d.ts
└── 📂 store/ *Redux 상태관리*
│  ├── 📄 chatBubbleSlice.ts *챗봇 질문/답변 관리*
│  ├── 📄 hooks.ts
│  ├── 📄 modalSlice.ts
│  ├── 📄 monthlyClothesSlice.ts
│  └── 📂 provider/
│    ├── 📄 Provider.tsx *Redux Prodiver*
│  ├── 📄 simulationInstance.ts *d3 force direct graph 관리*
│  ├── 📄 store.ts *Redux Reducer Store*
└── 📂 styles/ *스타일 폴더 (styled components, SCSS)*
│  └── 📂 Banner/
│    └── 📂 Clothes/
│    └── 📂 Main/
│  └── 📂 Dashboard/
│  └── 📂 Navbar/
│  └── 📂 NoticeBoard/
│  └── 📂 Peed/
│  └── 📂 PreviewVideo/
│  └── 📂 ProductDetail/
│  └── 📂 QuickMenu/
│  └── 📂 ResponseMenu/
│  └── 📂 ResponseMixin/
│  └── 📂 Search/
│  └── 📂 Trendly/
│  └── 📂 swiper/
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




