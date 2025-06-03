### 📚 Use Tech

Develop language
<br/>
<br/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=SCSS&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-DD2C00?style=flat-square&logo=Firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<br/>
<br/>
Used API
<br/>
<br/>
<img src="https://img.shields.io/badge/Naver-03C75A?style=flat-square&logo=Naver&logoColor=white"/>
<img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=YouTube&logoColor=white"/>
<br/>
<br/>

### 폴더 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂about
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂addNotice
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂createNotice
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂duplicationIdCheck
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂hashPassword
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂insertCart
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂recommendOpenAI
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂viewCount
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂member
 ┃ ┃ ┗ 📂cart
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂notice
 ┃ ┃ ┣ 📂[idx]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂shop
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┣ 📂[productId]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂[productId]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signin
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂trendly
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜globals.scss
 ┃ ┣ 📜globalStyle.ts
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜page.module.css
 ┃ ┣ 📜page.tsx
 ┃ ┣ 📜robots.ts
 ┃ ┣ 📜RootStyleRegistry.tsx
 ┃ ┗ 📜sitemap.ts
 ┣ 📂assets
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📜chatbot.png
 ┃ ┃ ┗ 📜logo.png
 ┣ 📂component
 ┃ ┣ 📂About
 ┃ ┃ ┗ 📜AboutSection.tsx
 ┃ ┣ 📂ErrorPopup
 ┃ ┃ ┗ 📜ErrorPopup.tsx
 ┃ ┣ 📂fetchDB
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┃ ┗ 📜firebase.ts
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📂Peed
 ┃ ┃ ┃ ┣ 📂Contents
 ┃ ┃ ┃ ┃ ┣ 📜ClothesPeed.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SeasonPeed.tsx
 ┃ ┃ ┃ ┣ 📂MainBoard
 ┃ ┃ ┃ ┃ ┣ 📜Banner.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MainBoard.tsx
 ┃ ┃ ┃ ┃ ┗ 📜NoticeBoard.tsx
 ┃ ┃ ┃ ┗ 📜Peed.tsx
 ┃ ┃ ┣ 📂Responsive
 ┃ ┃ ┃ ┗ 📜ResponsiveMenu.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Navbar.tsx
 ┃ ┃ ┗ 📜QuickMenu.tsx
 ┃ ┣ 📂Pagenation
 ┃ ┃ ┗ 📜Pagenation.tsx
 ┃ ┣ 📂Popup
 ┃ ┃ ┗ 📜UserPopup.tsx
 ┃ ┣ 📂Product
 ┃ ┃ ┣ 📜ProductDetail.tsx
 ┃ ┃ ┣ 📜ProductList.tsx
 ┃ ┃ ┗ 📜SearchProductList.tsx
 ┃ ┣ 📂Search
 ┃ ┃ ┗ 📜Search.tsx
 ┃ ┣ 📂slideButton
 ┃ ┃ ┣ 📜SlideBefore.tsx
 ┃ ┃ ┗ 📜SlideNext.tsx
 ┃ ┣ 📂Trend
 ┃ ┃ ┣ 📂PreviewVideo
 ┃ ┃ ┃ ┗ 📜PreviewVideo.tsx
 ┃ ┃ ┣ 📂Skeleton
 ┃ ┃ ┃ ┗ 📜Skeleton.tsx
 ┃ ┃ ┣ 📜ChatContainer.tsx
 ┃ ┃ ┣ 📜CurrentVideo.tsx
 ┃ ┃ ┣ 📜TrendVideoList.tsx
 ┃ ┃ ┗ 📜VideoItem.tsx
 ┃ ┣ 📜AuthSession.tsx
 ┃ ┗ 📜svgData.js
 ┣ 📂store
 ┃ ┣ 📂provider
 ┃ ┃ ┗ 📜Provider.tsx
 ┃ ┣ 📜hooks.ts
 ┃ ┣ 📜searchClothes.ts
 ┃ ┗ 📜store.ts
 ┣ 📂styles
 ┃ ┣ 📂Banner
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Navbar
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂NoticeBoard
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Peed
 ┃ ┃ ┣ 📜ClothesPeed.ts
 ┃ ┃ ┗ 📜SeasonPeed.ts
 ┃ ┣ 📂PreviewVideo
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂ProductDetail
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂QuickMenu
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂ResponseMixin
 ┃ ┃ ┗ 📜_mixin.scss
 ┃ ┣ 📂Search
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂swiper
 ┃ ┃ ┗ 📜swiper.css
 ┃ ┣ 📂Trendly
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📜about.scss
 ┃ ┣ 📜addNotice.scss
 ┃ ┣ 📜currentNotice.scss
 ┃ ┣ 📜currentVideo.scss
 ┃ ┣ 📜errorPopup.scss
 ┃ ┣ 📜index.js
 ┃ ┣ 📜loading.scss
 ┃ ┣ 📜notice.scss
 ┃ ┣ 📜preview.scss
 ┃ ┣ 📜register.scss
 ┃ ┣ 📜responsiveMenu.scss
 ┃ ┣ 📜shop.scss
 ┃ ┣ 📜signIn.scss
 ┃ ┗ 📜skeleton.scss
 ┣ 📂types
 ┃ ┗ 📜global.d.ts
 ┗ 📂utils
 ┃ ┗ 📂hooks
 ┃ ┃ ┣ 📜ScrollToTop.tsx
 ┃ ┃ ┗ 📜useWindowSize.tsx
```

### 🔎 Previews

#### Introduce

```
# UI 디자인 템플릿
https://www.figma.com/design/InDebQfEyMfUxDzWjaY6I6/WISH-STORE?node-id=0-1&t=rSDE9IpNmHwXwqrO-1
# 배포 환경
Next.js 프레임워크를 유지 관리하는 Vercel의 호스팅 서버를 사용하여 배포하였습니다.
# 프로젝트 소개
- Next.js 프레임워크를 활용하여 CSR, SSR 컴포넌트를 병합해서 제작한 트렌드 의류 사이트입니다.
- naver Open API의 검색 API로 페이지 최초 렌더링시에 메인 페이지에서 트렌드 의류 데이터들을 제공하고,
사용자의 요청에 따라 원하는 의류를 검색할 수 있습니다.
- youtube API로 최신 트렌드 의류를 추천하는 유튜버를 선정하여 채널 정보와 영상을 제공합니다.
- Redux 상태관리 라이브러리를 통해 데이터를 관리하고 사용자 요청에 따라 비즈니스 로직 처리를 진행하였습니다.
- Next.js의 OAuth 인증 Next-Auth 라이브러리를 사용하여 로그인 인증을 구현하였기에 카카오 소셜 로그인도 가능합니다.
# 프로젝트를 만들게 된 계기는?
React의 SPA 기능이 가지고 있는 단점을 개선하고자 React 기반의 Next.js 프레임워크를 공부하던 중,
실무적으로 기능을 구현하고자 쇼핑몰 주제로 트렌드 의류 사이트를 제작하게 되었습니다.
```

<br/>

### 프로젝트 핵심 사용 기술

#### Naver Open API

##### API End Point

https://openapi.naver.com/v1/search/shop.json

- API 요청 시에 Header Parameter 값으로 ClientID값과 ClientSecret값을 담아서 요청
- search(검색) API의 shop.json 경로로 Query parameter 값을 전송하여 의류 데이터 조회 가능
- query : 검색 키워드
- display : 검색 결과 개수 (최대 100개)

##### 📌 Naver Open API는 클라이언트에서 요청하는 것을 허용하지 않아서 프록시로 우회해야함

1. package.json 파일에 proxy 속성 추가 (https://openapi.naver.com)
2. next.js의 경우에는 next.config.js 파일에 rewrites 함수를 추가
   source : 사용자가 요청하는 경로
   destination : naver open api 검색 API 주소
   <br/>

#### Next.js

##### 📂 폴더 라우팅

Next.js 13버전 이후 app 폴더가 등장하면서 app 폴더 내부에 폴더를 생성하면 해당 폴더 이름으로 라우터가 생성됩니다.
이를 통해서 백엔드와 통신하는 api route와 page route로 구조를 나누어 풀스택으로 개발하였습니다.

- api route

  1. api 폴더 내부에 하위 폴더를 생성한 뒤, 하위 폴더에 route 스크립트 파일을 생성
  2. 클라이언트에서 해당 라우트에 요청할 때의 메소드 이름으로 비동기 함수 생성
  3. NextResponse, NextRequest 타입을 통해서 req 받은 값을 활용하여 로직 처리한 결과값 json 형태로 반환하는 형태

- page route
  1. app 폴더 내부에 최상위에 위치하는 page 컴포넌트로 메인 페이지 라우팅
  2. 서브 페이지 폴더에 page 컴포넌트 파일을 생성하면 서브 페이지 라우팅

##### 📌 page 동적 라우팅

제품 리스트에서 사용자가 클릭한 상품을 보여주기 위해선 상품의 id값같은 고유 값을 상세 페이지로 넘겨 보여줘야합니다.
next.js에서는 동적 라우팅 기능을 제공하여 이를 쉽게 구현할 수 있었습니다.

예시) /shop 페이지에서 상품을 클릭할 시, 하위 폴더인 /shop/[동적 라우팅] 경로로 제품 id값을 보내주면
동적 라우팅 폴더 페이지 컴포넌트에서 해당 id 값으로 제품을 필터링하여 상세 페이지를 출력할 수 있습니다.
