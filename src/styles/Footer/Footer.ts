import styled from "styled-components";

const FooterCSS: any = {};

FooterCSS.Inner = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;
  background-color: #000;
  padding: 2rem 6.25rem;
  display: flex;
  justify-content: space-between;
`;

FooterCSS.MainCont = styled.div`
  width: 40%;
  height: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

FooterCSS.Logo = styled.div`
  width: 100%;
  height: 8rem;
`;

FooterCSS.MainLogo = styled.div`
  width: 100%;

  h1 {
    line-height: 5rem;
    font-family: $Raleway-font;
    text-transform: uppercase;
    font-size: 1.5rem;
    color: #fff;
  }
`;

FooterCSS.LogoInfo = styled.div`
  width: 100%;

  p {
    font-size: 14px;
    font-family: $Raleway-font;
    text-transform: uppercase;
    line-height: 3rem;
    color: #fff;
  }
`;

FooterCSS.MainMenu = styled.div`
  width: 100%;
  height: 3rem;

  ul {
    width: 100%;
    height: 100%;

    li {
      display: inline-block;
      width: calc(100% / 3);
      line-height: 3rem;

      a {
        color: #fff;
        font-family: $Noto-Korean;
        font-size: 14px;
      }
    }
  }
`;

FooterCSS.Community = styled.div`
  width: 100%;
  height: 3rem;

  h2 {
    width: 100%;
    line-height: 3rem;
    font-size: 1.2rem;
    font-family: $Raleway-font;
    text-transform: uppercase;
    margin-bottom: 3rem;
    color: #fff;
  }

  ul {
    width: 100%;
    height: 100%;

    li {
      display: inline-block;
      width: calc(100% / 3);
      line-height: 3rem;

      a {
        color: #fff;
        font-family: $Noto-Korean;
        font-size: 14px;
      }
    }
  }
`;

FooterCSS.SubCont = styled.div`
  position: relative;
  width: 30%;
  height: 100%;
  color: #fff;
`;

FooterCSS.Customer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
`;

FooterCSS.CustomerTitle = styled.div`
  width: 100%;

  h2 {
    width: 100%;
    line-height: 5rem;
    font-size: 1.2rem;
    font-family: $Raleway-font;
    text-transform: uppercase;
    color: #fff;
  }
`;

FooterCSS.CustomerNumber = styled.div`
  width: 100%;
  height: 5rem;

  span {
    line-height: 5rem;
    font-size: 1.2rem;
    font-family: $Raleway-font;
    text-transform: uppercase;
    color: #fff;
  }
`;

FooterCSS.Operation = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6rem;
`;

FooterCSS.OperationList = styled.ul`
  width: 100%;
  height: 100%;

  li {
    display: inline-block;
    width: 15rem;
    height: 3rem;
    line-height: 3rem;

    span {
      color: #fff;
      font-size: 14px;
    }
  }
`;

FooterCSS.Banking = styled.div`
  position: relative;
  width: 25%;
  height: 15rem;
`;

FooterCSS.BankingTitle = styled.div`
  width: 100%;

  h2 {
    line-height: 5rem;
    font-size: 1.2rem;
    font-family: $Raleway-font;
    text-transform: uppercase;
    color: #fff;
  }
`;

FooterCSS.BankingInfo = styled.ul`
  width: 100%;
  height: 10rem;

  li {
    display: block;
    width: 100%;
    height: calc(10rem / 2);

    p {
      line-height: calc(10rem / 2);
      font-size: 14px;
      color: #fff;
      font-weight: bold;
    }
  }
`;

FooterCSS.CopyRight = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 3rem;
  text-transform: uppercase;
  font-size: 14px;
  color: #fff;
`;

export { FooterCSS };
