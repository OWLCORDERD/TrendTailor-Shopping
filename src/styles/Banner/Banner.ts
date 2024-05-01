import styled from "styled-components";

const Banner: any = {};

Banner.Container = styled.div`
  position: relative;
  width: 100%;
  height: 42rem;
  overflow: hidden;

  /* swiper slide pagination 영역 커스텀 디자인 */
  .swiper-pagination-horizontal {
    width: 18rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 6.25rem;
  }

  .swiper-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .swiper-pagination-bullet {
    width: 5rem;
    height: 10px;
    opacity: 0.4;
    background-color: #fff;
    border-radius: 0;
    margin: 0 0;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background-color: #fff;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    position: relative;
    width: 100%;
    height: 40rem;
    overflow: hidden;
  }

  @media screen and (max-width: 768px) {
    height: 32rem;

    .swiper-pagination-horizontal {
      width: 18rem;
      left: 50%;
      transform: translateX(-50%);
      bottom: 2rem;
    }
  }
`;

Banner.slideWrap = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 100%;
`;

Banner.slideItem = styled.div`
  position: relative;
  width: 100%;
  height: 42rem;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    content: "";
    background: linear-gradient(
      178deg,
      rgba(0, 0, 0, 0.08) 1.36%,
      rgba(0, 0, 0, 0.8) 98.66%
    );
    z-index: 1;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    height: 40rem;
  }

  @media screen and (max-width: 768px) {
    height: 32rem;
  }
`;

Banner.slideImg = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

Banner.slideInfo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10rem;
  width: 50rem;
  height: 14rem;
  z-index: 10;
  transition: all 1s ease-out;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40rem;
    height: 14rem;
    z-index: 10;
    transition: all 1s ease-out;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 9rem;
    z-index: 10;
    transition: all 1s ease-out;
  }
`;

Banner.titleBox = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

Banner.infoTitle = styled.h1`
  line-height: 6.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  color: #fff;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

Banner.txtBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  color: #fff;

  margin: 0 auto;
`;

Banner.infoTxt = styled.p`
  width: 40%;
  height: max-content;
  word-break: keep-all;
  font-size: 15px;
  font-weight: 300;
  color: #fff;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    font-size: 12px;
  }

  @media screen and (max-width: 768px) {
    width: 60%;
    font-size: 10px;
  }
`;

Banner.slideControl = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 2rem;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

Banner.prevButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
`;

Banner.nextButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
`;

export { Banner };
