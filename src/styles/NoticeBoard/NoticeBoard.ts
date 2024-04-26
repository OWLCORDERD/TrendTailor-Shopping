import { styled } from "styled-components";

const NoticeBoard: any = {};

NoticeBoard.Container = styled.div`
  position: relative;
  width: 100%;
  height: 12.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6.25rem;

  @media screen and (max-width: 768px) {
    height: 10rem;
    flex-direction: column;
    padding: 0 2rem;
  }
`;

NoticeBoard.TitleBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 30%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

NoticeBoard.Title = styled.h1`
  line-height: 5rem;
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    font-size: 1.2rem;
  }
`;

NoticeBoard.Slider = styled.div`
  position: relative;
  width: 65%;
  height: 5rem;
  z-index: 100;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 3rem;
  }
`;

NoticeBoard.List = styled.ul`
  position: absolute;
  top: 0;
  width: 100%;
  height: 25rem;

  li {
    position: relative;
    width: 100%;
    height: 5rem;

    a {
      width: 100%;
      height: 100%;
      font-family: "Noto Sans KR", sans-serif;
      color: #000;

      &:hover h2 {
        text-decoration: underline;
      }

      h2 {
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        line-height: 5rem;

        &:hover {
          text-decoration: underline;
        }
      }

      span {
        position: absolute;
        width: max-content;
        display: inline-block;
        right: 0;
        font-weight: bold;
        font-size: 13px;
        line-height: 5rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    height: 15rem;
    li {
      height: 3rem;
      a {
        h2 {
          font-size: 12px;
          line-height: 3rem;
        }

        span {
          line-height: 3rem;
          font-size: 10px;
        }
      }
    }
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    li {
      a {
        h2 {
          font-size: 12px;
        }

        span {
          font-size: 10px;
        }
      }
    }
  }
`;

export { NoticeBoard };
