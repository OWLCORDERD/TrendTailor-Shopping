import { createSlice } from "@reduxjs/toolkit";

interface ChatBubbleState {
  chatOpen: boolean;
  mode: string;
  messages: messagesType[];
  QA_step: number;
}

const initialState: ChatBubbleState = {
  chatOpen: false, // 챗봇 모달 활성화 여부
  mode: "intro",
  messages: [],
  QA_step: 0, // 컨설팅 질문 단계
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
      state.QA_step = 0; // 질문 단계 초기화
    },
    // 챗봇 모드 변경
    changeMode: (state, action: any) => {
      state.mode = action.payload.mode; // 클라이언트에서 요청한 모드로 변경

      state.messages = []; // 인트로 모드로 변경 시 메시지 초기화
      state.QA_step = 0; // 질문 단계 초기화

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
    // 2025.08.04: 컨설팅 모드 > 질문 단계에 따른 템플릿 메시지 추가
    nextStep: (state) => {
      state.QA_step = state.QA_step + 1; // 질문 단계 업데이트

      if (state.mode === "consultant") {
        switch (state.QA_step) {
          case 1:
            state.messages.push({
              role: "chatbot",
              message: {
                type: "question",
                content: {
                  title: "01. 찾고 있는 스타일의 목적은 무엇인가요?",
                  options: [
                    { label: "데일리룩", value: "daily" },
                    { label: "출근/오피스룩", value: "business" },
                    { label: "데이트룩", value: "date" },
                    { label: "하겍룩", value: "guest" },
                    { label: "기타", value: "etc" },
                  ],
                },
              },
            });
            break;

          case 2:
            state.messages.push({
              role: "chatbot",
              message: {
                type: "question",
                content: {
                  title: "02. 선호하는 스타일은 무엇인가요?",
                  options: [
                    { label: "미니멀 / 심플", value: "minimal/simple" },
                    { label: "캐주얼 / 스트리트", value: "casual/street" },
                    { label: "러블리 / 여친룩", value: "lovely" },
                    { label: "유니크 / 키치", value: "unique" },
                    { label: "클래식 / 포멀", value: "classic" },
                  ],
                },
              },
            });

            break;
        }
      }
    },
    // 현재 대화 메시지 배열에 실시간 채팅 메시지 추가
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { pushMessage, changeMode, chatOpen, chatClose, nextStep } =
  chatBubbleSlice.actions;
export default chatBubbleSlice.reducer;
