import { styled } from "styled-components";

const SeasonPeed: any = {};

SeasonPeed.Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  padding: 3.125rem 6.25rem;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    padding: 3.125rem;
  }

  @media screen and (max-width: 768px) {
    padding: 3.125rem 0;
  }
`;

SeasonPeed.TitleBox = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(25rem * 4 + 150px);
  height: 5rem;
  margin-bottom: 3rem;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: calc(18rem * 4 + 60px);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

SeasonPeed.Title = styled.div`
  width: 80%;
  height: 5rem;

  h1 {
    line-height: 5rem;
    font-size: 1.5rem;
    font-family: "Raleway", sans-serif;
    text-transform: uppercase;
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

SeasonPeed.SlideControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 12rem;
  height: 5rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

SeasonPeed.ControlButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 2rem;
  z-index: 10;
  cursor: pointer;
`;

SeasonPeed.Slider = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: calc(25rem * 4 + 150px);
  height: 40rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: calc(18rem * 4 + 60px);
    height: 30rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 25rem;
  }
`;

SeasonPeed.SlideWrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: max-content;
  height: 100%;
  display: inline-flex;
`;

SeasonPeed.SlideItem = styled.div`
  position: relative;
  width: 25rem;
  height: 100%;
  margin-right: 50px;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: 18rem;
    margin-right: 30px;
  }

  @media screen and (max-width: 768px) {
    width: 15rem;
    margin-right: 1rem;

    &:nth-child(1) {
      margin-left: 1rem;
    }
  }
`;

SeasonPeed.ProductImg = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    height: 20rem;
  }

  @media screen and (max-width: 768px) {
    height: 18rem;
  }
`;

SeasonPeed.ProductInfo = styled.div`
  width: 100%;
  height: 10rem;
  font-family: "Noto Sans KR", sans-serif;

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

  h2 {
    width: max-content;
    font-size: 15px;
    font-weight: 500;
    color: #878787;
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
    font-size: 15px;
    font-weight: bold;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    span {
      font-size: 12px;
    }
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
