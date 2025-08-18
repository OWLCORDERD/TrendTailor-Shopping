import styled from "styled-components";

const Trendly: any = {};

Trendly.Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  font-family: "TheJamsil", sans-serif;
  padding: 30px 30px 0 30px;

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
      padding: 20px 0 30px 0;

      .title {
        display: block;
        margin-bottom: 2rem;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
      }

      .desc {
        font-weight: 400;
        font-size: 16px;
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

        &:nth-child(1) {
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

        &:nth-child(2) {
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

  .chat-area {
    height: calc(100% - 150px);
    overflow-y: auto;
    padding: 30px 20px;
  }
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

// 채팅 말풍선

// AI 챗봇 말풍선
Trendly.ChatBotBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  margin: 20px 0;

  .btn-wrap {
    width: 100%;
    display: flex;
    gap: 30px;
    margin-top: 20px;

    .start-btn {
      display: block;
      flex: 1;
      height: 30px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background-color: var(--colorMain);
      border: none;
    }

    .exit-btn {
      display: block;
      flex: 1;
      height: 30px;
      color: rgb(65, 65, 65);
      text-align: center;
      line-height: 30px;
      border: 2px solid rgb(65, 65, 65);
      border: none;
    }
  }
`;

Trendly.BubbleWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

// 챗봇 질문 선택 답변 폼 영역
Trendly.ChatBotQuestion = styled.div`
  width: 100%;
  margin: 20px 0;
`;

// 챗봇 질문 제목 인덱스 영역
Trendly.QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  padding: 20px 30px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: var(--colorMain);
  color: #fff;
`;

// 챗봇 질문 선택 옵션 영역
Trendly.QuestionOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 35px;
  margin-top: 20px;
`;

// 신체 유형 선택 select 커스텀
Trendly.BodyOptions = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 0;

  .select-btn {
    position: relative;
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    border: 1px solid #d5d5d5;
    border-radius: 20px;
    background: #fff;
    color: #333;
    font-weight: bold;

    .drop-icon {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      color: #333;
    }
  }

  .select-list {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    border: 1px solid #d5d5d5;
    border-radius: 20px;
    overflow: hidden;

    .option-btn {
      display: block;
      width: 100%;
      padding: 10px 20px;
      background: transparent;
      color: #333;
      border: none;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`;

// 챗봇 질문 옵션 버튼
Trendly.QuestionOption = styled.button<{ $select: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 2 - 20px);
  padding: 20px;
  font-size: 16px;
  color: #777;
  border: ${(props) =>
    props.$select ? "2px solid var(--colorMain)" : "2px solid transparent"};
  background-color: #fff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  pointer-events: ${(props) => (props.$select ? "none" : "auto")};

  &:hover {
    border: 2px solid var(--colorMain);
  }
`;

// 컨설팅 챗봇 답변 생성 중 로딩 화면
Trendly.RecommendationLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 150px);

  .chatbot {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 40px;

    &-character {
      margin: 0 auto;
      width: 120px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-bubble {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      gap: 10px;
      width: 300px;
      padding: 20px;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      border: 1px solid rgb(188, 188, 188);
      background-color: #fff;

      .comment {
        font-weight: bold;
        color: var(--colorMain);
      }

      .loading-dot {
        display: flex;
        align-items: center;
        gap: 10px;

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--colorMain);
          animation: dotBlink 1s infinite forwards;
          opacity: 0;
          margin-bottom: 2px;

          &:nth-child(1) {
            animation-delay: 0s;
          }

          &:nth-child(2) {
            animation-delay: 1s;
          }

          &:nth-child(3) {
            animation-delay: 2s;
          }

          @keyframes dotBlink {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .loading-text {
    display: block;
    width: calc(100% - 50px);
    margin: 0 auto;
    text-align: center;
    color: #333;
    padding-top: 50px;
    font-size: 16px;
  }
`;

Trendly.WarningText = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px 0;

  .warning-icon {
    width: 30px;
    height: 30px;
  }

  .warning-txt {
    font-size: 16px;
    color: var(--colorMain);
  }
`;

// 사용자 답변 말풍선
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export { Trendly };
