import { createSlice } from "@reduxjs/toolkit";

interface ChatBubbleState {
  mode: string;
  messages: messageType[];
}

const initialState: ChatBubbleState = {
  mode: "intro",
  messages: [],
};

const chatBubbleSlice = createSlice({
  name: "chatBubble",
  initialState,
  reducers: {
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

export const { pushMessage, changeMode } = chatBubbleSlice.actions;
export default chatBubbleSlice.reducer;
