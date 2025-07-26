import { createSlice } from "@reduxjs/toolkit";

interface ChatBubbleState {
  chatOpen: boolean;
  mode: string;
  messages: messagesType[];
}

const initialState: ChatBubbleState = {
  chatOpen: false, // 챗봇 모달 활성화 여부
  mode: "intro",
  messages: [],
};

const chatBubbleSlice = createSlice({
  name: "chatBubble",
  initialState,
  reducers: {
    chatOpen: (state) => {
      state.chatOpen = true; // 챗봇 모달 활성화
    },
    chatClose: (state) => {
      state.chatOpen = false; // 챗봇 모달 비활성화
      state.mode = "intro"; // 모드 초기화
      state.messages = []; // 메시지 배열 초기화
    },
    // 챗봇 모드 변경
    changeMode: (state, action: any) => {
      state.mode = action.payload.mode; // 클라이언트에서 요청한 모드로 변경
      if (action.payload.mode === "consultant") {
        state.messages = [
          {
            role: "user",
            message: {
              type: "chat",
              content: "스타일 컨설턴트를 추천받고싶어",
            },
          },
          {
            role: "chatbot",
            message: {
              type: "chat",
              content: `안녕하세요, ${action.payload.user}님! 지금부터 회원님에게 어울리는 의류 컨설팅을 위해 간단한 설문조사를 시작할게요.`,
            },
          },
        ];
      }
    },
    // 현재 대화 메시지 배열에 실시간 채팅 메시지 추가
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { pushMessage, changeMode, chatOpen, chatClose } =
  chatBubbleSlice.actions;
export default chatBubbleSlice.reducer;
