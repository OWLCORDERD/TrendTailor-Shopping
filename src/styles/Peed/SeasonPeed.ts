import { styled } from "styled-components";

const SeasonPeed: any = {};

SeasonPeed.Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  padding: 3.125rem 6.25rem;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    padding: 3.125rem 6.25rem;
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
  width: 100%;
  height: 5rem;
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
  width: 20rem;
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

SeasonPeed.ControlBox = styled.div`
  position: relative;
  width: 15rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

SeasonPeed.ControlState = styled.div`
  width: 10rem;

  span {
    font-family: "TheJamsil", sans-serif;
    font-weight: bold;
    font-size: 14px;
  }
`;

SeasonPeed.ControlButtons = styled.div`
  position: relative;
  width: 5rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

SeasonPeed.ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  z-index: 10;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #c1c1c1;
  color: #1b1b1b;
`;

SeasonPeed.Slider = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: calc(20rem * 5);
  height: 32rem;
  overflow-x: scroll;

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
  position: absolute;
  left: 0;
  top: 0;
  width: max-content;
  height: 100%;
  display: inline-flex;
`;

SeasonPeed.SlideItem = styled.div<{ $mode: string }>`
  position: relative;
  width: 20rem;
  height: 100%;
  padding: 1rem 3.125rem;

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
