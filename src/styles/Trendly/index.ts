import styled from "styled-components";

const Trendly: any = {};

Trendly.Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  font-family: "TheJamsil", sans-serif;
  padding: 50px 30px;

  .character {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    &-logo {
      width: 160px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-bubble {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      width: calc(100% - 200px);

      .bubble {
        width: 100%;
        padding: 10px 20px;
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        border: 1px solid rgb(188, 188, 188);
        background-color: #fff;

        & > span {
          display: block;
          width: 100%;
          font-size: 13px;
          font-weight: bold;
          color: var(--subTxtColor);
          text-align: center;
        }
      }
    }
  }

  .comment-menu {
    width: 100%;

    .intro-comment {
      width: 100%;
      padding: 20px 0 60px 0;

      .title {
        display: block;
        margin-bottom: 2rem;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
      }

      .desc {
        font-weight: 400;
        font-size: 20px;
        text-align: center;
      }
    }

    .intro-menu {
      width: 100%;

      & > span {
        display: block;
        width: 100%;
        margin-bottom: 2rem;
        font-size: 16px;
        text-align: center;
      }

      .menu-btn {
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 10px 20px;
        width: 100%;
        font-size: 18px;
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

// 컨설팅 모드 컨테이너
Trendly.ConsultantMode = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  margin: 0 auto;
  padding: 0 20px;
`;

Trendly.ChatArea = styled.div`
  height: calc(100% - 150px);
  overflow-y: auto;
  padding: 30px 20px;
`;

Trendly.SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 2rem auto 0 auto;
  padding: 20px 30px;
  width: calc(100% - 40px);
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
    font-size: 16px;

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

// 파일 첨부 기능 비활성화 (보류)
// Trendly.SearchTool = styled.div`
//   position: relative;
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   height: 30px;

//   .attach-file {
//     position: relative;
//     width: 30px;
//     height: 30px;
//     border: none;
//     background: transparent;
//     color: #000;
//     cursor: pointer;

//     svg {
//       width: 100%;
//       height: 100%;
//     }
//   }

//   .tooltip {
//     position: absolute;
//     left: 50%;
//     top: -60px;
//     transform: translateX(-50%);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 80px;
//     height: 40px;
//     background: #000;
//     border-radius: 10px;

//     &::before {
//       position: absolute;
//       left: 50%;
//       bottom: -20px;
//       content: "";
//       transform: translateX(-50%);
//       width: 0;
//       height: 0;
//       border-left: 10px solid transparent;
//       border-right: 10px solid transparent;
//       border-bottom: 10px solid transparent;
//       border-top: 12px solid #000;
//     }

//     span {
//       font-family: "TheJamsil", sans-serif;
//       font-size: 14px;
//       font-weight: bold;
//       color: #fff;
//     }
//   }
// `;

// 채팅 말풍선

// AI 챗봇 말풍선
Trendly.ChatBotBubble = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 100%;
  margin-bottom: 20px;
`;

Trendly.ChatBotMessage = styled.div`
  width: calc(100% - 80px);
  padding: 20px 30px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: #fff;
  word-break: keep-all;
  font-size: 14px;
`;

Trendly.ChatBotIcon = styled.div`
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  padding: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// AI 챗봇 말풍선
Trendly.UserBubble = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 100%;
  margin-bottom: 20px;
`;

Trendly.UserMessage = styled.div`
  width: calc(100% - 80px);
  padding: 20px 40px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: var(--colorMain);
  word-break: keep-all;
  font-size: 14px;
  color: #fff;
`;

Trendly.UserProfile = styled.div`
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: initial;
  }
`;

export { Trendly };
