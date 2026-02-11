import styled from "styled-components";

const Trendly: any = {};

// Trendly 챗봇 채팅 모달 내부 컨텐츠 영역

// 챗봇 인트로
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

Trendly.UserDirectInput = styled.div`
  display: block;
  width: 100%;
  padding: 20px 0;

  & > input[type="text"] {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: 1px solid #d5d5d5;
    border-radius: 20px;
    font-size: 16px;
    font-family: "TheJamsil", sans-serif;

    &:focus {
      outline: none;
    }
  }

  .submit-btn {
    width: 100%;
    margin: 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    border: none;
    padding: 10px 20px;
    background-color: var(--colorMain);
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
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

Trendly.RecommendResult = styled.div`
  padding: 20px;
  overflow-y: scroll;
`;

// 컨설팅 결과 화면 섹션 영역
Trendly.ResultSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 80px;
  padding: 50px;

  .result-info {
    max-width: 500px;
    &-title {
      display: block;
      margin-top: 10px;
      font-size: 24px;
      font-weight: bold;
    }

    .select-keyword {
      margin: 40px 0;

      &-item {
        margin-bottom: 50px;

        .index-title {
          font-size: 18px;
          font-weight: bold;
        }

        .keyword-list {
          margin-top: 10px;

          .keyword {
            display: inline-block;
            vertical-align: middle;
            padding: 10px 30px;
            background: var(--colorMain);
            color: #fff;
            margin-left: 20px;
            border-radius: 10px;

            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
    }
  }

  .product-list {
    display: grid;
    width: calc(100% - 500px);
    height: 750px;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
    padding: 0 30px;
    overflow-y: scroll;

    &-item {
      .product-inner {
        .product-img {
          width: 100%;
          height: 320px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .product-info {
          padding: 0 20px;
          margin-top: 25px;

          .product-title {
            width: 100%;
            display: block;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            word-break: keep-all;
            line-height: 20px;
          }

          .product-maker {
            display: block;
            font-size: 14px;
            color: rgb(70, 70, 70);
            font-weight: bold;
          }
        }

        &:hover {
          .product-img {
            transform: scale(1.05);
            transition: all 0.3s ease-in-out;
          }
          .product-info {
            .product-title {
              text-decoration: underline;
              text-underline-offset: 4px;
            }
          }
        }
      }
    }
  }
`;

// 컨설팅 결과 화면 > 검색 실패 에러 화면
Trendly.ResultError = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  padding: 20px 0;

  .error-icon {
    width: 140px;
    height: 140px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .txt-wrap {
    max-width: 250px;

    .error-txt {
      display: block;
      text-align: center;
      word-break: keep-all;
      font-size: 16px;
      font-weight: 500;
      color: rgb(48, 48, 48);
      margin-bottom: 15px;
    }

    .error-sub-txt {
      display: block;
      margin-top: 10px;
      text-align: center;
      font-size: 14px;
      color: rgb(100, 100, 100);
    }
  }

  .retry-btn {
    width: 250px;
    padding: 10px 20px;
    color: #fff;
    background-color: var(--colorMain);
    transition: all 0.2s ease-in-out;
    border: none;

    &:hover {
      background-color: rgb(43, 85, 221);
    }
  }
`;

Trendly.ChannelDetail = styled.div`
  .channel-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 150px;
    margin: 0 auto;

    .channel-img {
      width: 120px;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .channel-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - 150px);
      height: 100%;

      .index {
        .channel-name {
          display: block;
          font-size: 17px;
          font-weight: bold;
        }

        .channel-subscriber {
          display: flex;
          gap: 20px;
          align-items: center;
          margin: 10px 0;
          font-size: 13px;
          color: #777;
          font-weight: 500;

          .title {
            font-weight: bold;
          }
        }
      }

      .channel-link {
        display: block;
        width: 100%;
        padding: 10px 20px;
        text-align: center;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        background-color: var(--colorMain);
        border: none;
      }
    }
  }

  .recommend-comment {
    width: 100%;
    margin: 20px 0;

    .index {
      display: block;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 20px;
    }

    .comment {
      font-weight: 500;
      color: #777;
      font-size: 15px;
      word-break: keep-all;
    }

    .keyword {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #777;

      .title {
        font-weight: bold;
      }
    }
  }
`;

Trendly.ChatArea = styled.div<{ $sideActive: boolean }>`
  width: ${(props) => (props.$sideActive ? "calc(100% - 350px)" : "100%")};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
`;

Trendly.ChatInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: calc(100% - 50px);
  overflow-y: scroll;
  margin: 0 auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* 좌측 네비게이션 바 */
Trendly.RecentChatSideBar = styled.div<{ $sideActive: boolean }>`
  width: ${(props) => (props.$sideActive ? "350px" : "100px")};
  background-color: #f5f5f5;
  height: 100vh;
  padding: 15px 20px;
  transition: all 0.3s ease-in-out;

  // 좌측 네비게이션 바 > 상단 컨트롤 바
  .sidebar-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;

    .toggle-btn {
      display: block;
      width: 70px;
      height: 70px;
      border: none;
      background-color: transparent;

      & > svg {
        font-size: 30px;
        color: var(--colorMain);
      }
    }
  }

  // 채팅 목록 영역
  .recent-chat-list {
    padding: 20px 10px;

    // 영역 대제목
    .chat-list-title {
      font-size: 20px;
      font-weight: bold;
    }

    // 채팅 목록
    .chat-list {
      padding: 25px 0;

      .loading-txt {
        margin: 20px 0;
        font-size: 16px;
        font-weight: bold;
      }

      // 컨텐츠 노데이터 상태인 경우
      &:has(.no-data) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 20px 0;
      }

      .no-data {
        display: flex;
        flex-direction: column;
        gap: 30px;

        &-icon {
          position: relative;
          width: 150px;
          height: 200px;

          .question-bubble {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }

          .chatbot-character {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 120px;
            height: 100px;
          }
        }
      }

      // 목록 데이터가 존재할 경우 채팅 히스토리 아이템
      .chat-item {
        display: block;
        height: 28px;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        .type-label {
          display: inline-block;
          vertical-align: middle;
          text-align: center;
          padding: 6.5px 7px;
          font-size: 12px;
          color: #fff;
          width: 50px;
          margin-right: 10px;

          &.consult {
            border-radius: 5px;
            background-color: var(--colorMain);
          }
        }

        .chat-title {
          display: inline-block;
          vertical-align: middle;
          width: calc(100% - 150px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 16px;
          margin-right: 10px;

          &:hover {
            text-decoration: underline;
          }
        }

        .chat-date {
          font-size: 12px;
        }
      }
    }
  }
`;

export { Trendly };
