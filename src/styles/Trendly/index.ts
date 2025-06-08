import styled from "styled-components";

const Trendly: any = {};

Trendly.ChatContainer = styled.div`
  position: relative;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding-top: 100px;
`;

Trendly.Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  font-family: "TheJamsil", sans-serif;

  .character {
    position: relative;
    width: 100%;
    height: 15rem;

    &-logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 310px;
      height: 250px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-bubble {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .bubble {
        width: 450px;
        padding: 20px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        border: 1px solid rgb(188, 188, 188);
        background-color: #fff;

        & > span {
          display: block;
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          color: var(--subTxtColor);
          text-align: center;
        }
      }
    }
  }

  .comment-menu {
    .intro-comment {
      width: 100%;
      padding: 20px 0 60px 0;

      .title {
        display: block;
        margin-bottom: 2rem;
        text-align: center;
        font-size: 2rem;
        font-weight: 400;
      }

      .desc {
        font-weight: 400;
        font-size: 1.2rem;
        text-align: center;
      }
    }

    .intro-menu {
      margin: 0 auto;

      & > span {
        display: block;
        width: 100%;
        margin-bottom: 2rem;
        font-size: 1.2rem;
        text-align: center;
      }

      .menu-btn {
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 10px 20px;
        width: 30rem;
        font-size: 1.2rem;
        font-weight: 600;
        background-color: transparent;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        margin-bottom: 1.5rem;

        &:nth-child(2) {
          color: var(--colorMain);
          border: 2px solid var(--colorMain);
          margin-bottom: 20px;

          & > svg {
            fill: var(--colorMain);
          }

          &:hover {
            color: #fff;
            background-color: var(--colorMain);

            & > svg {
              fill: #fff;
            }
          }
        }

        &:nth-child(3) {
          border: 2px solid var(--txtColor);
          color: var(--txtColor);

          &:hover {
            color: #fff;
            background-color: var(--txtColor);

            & > svg {
              color: #fff;
            }
          }
        }
      }
    }
  }
`;

Trendly.SearchForm = styled.div`
  display: none;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
  padding: 25px 50px;
  max-width: 1200px;
  height: 150px;
  border: 1px solid #d5d5d5;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

Trendly.SearchInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;

  & > input[type="text"] {
    width: 80%;
    height: 100%;
    background: transparent;
    border: none;
    font-family: "TheJamsil", sans-serif;
    font-size: 18px;

    &:focus {
      outline: none;
    }
  }

  .search-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #000;
    cursor: pointer;
    border: none;
  }
`;

Trendly.SearchTool = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 30px;

  .attach-file {
    position: relative;
    width: 30px;
    height: 30px;
    border: none;
    background: transparent;
    color: #000;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .tooltip {
    position: absolute;
    left: 50%;
    top: -60px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 40px;
    background: #000;
    border-radius: 10px;

    &::before {
      position: absolute;
      left: 50%;
      bottom: -20px;
      content: "";
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-top: 12px solid #000;
    }

    span {
      font-family: "TheJamsil", sans-serif;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }
`;

export { Trendly };
