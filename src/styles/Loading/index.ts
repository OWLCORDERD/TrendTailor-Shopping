import { styled } from "styled-components";

const Loading: any = {};

// 컨텐츠 로딩 컨테이너
Loading.ContentsContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 페이지 이동 로딩 컨테이너
Loading.PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
`;

export { Loading };
