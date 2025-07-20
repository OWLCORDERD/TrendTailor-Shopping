import { createSlice } from "@reduxjs/toolkit";

interface ChatBubbleState {
  chatOpen: boolean;
  mode: string;
  messages: messageType[];
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
    changeMode: (state, action) => {
      state.mode = action.payload;
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
