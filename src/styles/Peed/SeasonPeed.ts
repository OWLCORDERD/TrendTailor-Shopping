import { styled } from "styled-components";

const SeasonPeed: any = {};

SeasonPeed.Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  padding: 3.125rem 6.25rem;
  background-color: #f1f1f1;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    padding: 3.125rem 6.25rem;
  }

  @media screen and (max-width: 768px) {
    padding: 3.125rem 0;
  }
`;

SeasonPeed.TitleBox = styled.div`
  width: 100%;
  height: 10rem;
  margin-bottom: 3rem;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

SeasonPeed.Title = styled.div`
  width: 100%;
  height: 5rem;
  margin-bottom: 2rem;

  h1 {
    line-height: 5rem;
    font-size: 1.8rem;
    font-family: "TheJamsil", sans-serif;
    font-weight: bold;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    h1 {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 1.2rem;
      text-align: center;
    }
  }
`;

SeasonPeed.Info = styled.div`
  width: 100%;
  height: 3rem;

  p {
    line-height: 3rem;
    font-size: 15px;
    font-family: "TheJamsil", sans-serif;
    font-weight: 400;
  }
`;

SeasonPeed.ControlBox = styled.div`
  position: absolute;
  width: 100%;
  height: 5rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

SeasonPeed.ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.25rem;
  width: 6.25rem;
  z-index: 10;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #1b1b1b;
`;

SeasonPeed.Slider = styled.div`
  position: relative;
  width: 100%;
  height: 32rem;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: calc(18rem * 4);
    height: 30rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 25rem;
  }
`;

SeasonPeed.SlideWrap = styled.div`
  width: 100%;
  height: 100%;

  .swiper-slide {
    width: calc(100% / 5) !important;
    transform: scale(1);
  }
`;

SeasonPeed.SlideItem = styled.div<{ $mode: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 20px;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: 18rem;
    padding: 0 3.125rem;
  }

  @media screen and (max-width: 768px) {
    width: 15rem;
    padding: 0;
    margin-right: 50px;

    &:first-child {
      margin-left: 50px;
    }
  }
`;

SeasonPeed.ProductImg = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    height: 18rem;
  }

  @media screen and (max-width: 768px) {
    height: 18rem;
  }
`;

SeasonPeed.ProductInfo = styled.div`
  width: 100%;
  height: 10rem;
  font-family: "TheJamsil", sans-serif;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: 7rem;
  }
`;

SeasonPeed.ProductName = styled.div`
  width: 100%;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  h2 {
    width: max-content;
    font-size: 13px;
    font-weight: 500;
    color: #000;
    font-weight: bold;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    h2 {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 768px) {
    height: 3rem;
    h2 {
      font-size: 12px;
    }
  }
`;

SeasonPeed.ProductBrand = styled.div`
  width: 100%;
  height: 3rem;

  p {
    line-height: 3rem;
    font-size: 13px;
    font-weight: 400;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    p {
      font-size: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    height: 2rem;
    p {
      line-height: 2rem;
      font-size: 10px;
    }
  }
`;

SeasonPeed.ProductPrice = styled.div`
  width: 100%;
  height: 3rem;

  span {
    line-height: 3rem;
    font-size: 12px;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    height: 2rem;
    span {
      line-height: 2rem;
      font-size: 10px;
    }
  }
`;

export { SeasonPeed };
