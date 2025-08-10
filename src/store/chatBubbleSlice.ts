import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ChatBubbleState {
  chatOpen: boolean;
  mode: string;
  messages: messagesType[];
  // 컨설팅 모드 관련 상태 값
  QA_step: number;
  QA_select: selectType[];
  QA_prompt: "";
}

interface selectType {
  step: number;
  selectLabel: string; // 선택한 답변 레이블
}

const initialState: ChatBubbleState = {
  chatOpen: false, // 챗봇 모달 활성화 여부
  mode: "intro",
  messages: [],
  QA_step: 0, // 컨설팅 질문 단계
  // 컨설팅 질문 단계에서 선택한 답변 저장 배열
  QA_select: [
    {
      step: 1,
      selectLabel: "", // 선택한 답변 레이블
    },
    {
      step: 2,
      selectLabel: "",
    },
    {
      step: 3,
      selectLabel: "",
    },
    {
      step: 4,
      selectLabel: "",
    },
    {
      step: 5,
      selectLabel: "",
    },
    {
      step: 6,
      selectLabel: "",
    },
  ],
  QA_prompt: "",
};

// 2025.08.11: 컨설팅 모드 > 단계별 답변 선택 시 호출되는 thunk 함수
export const handleConsultantPrompt = createAsyncThunk(
  "chatbubble/handleConsultantPrompt",
  async (selectLabel: any, { getState, dispatch }) => {
    // 사용자가 선택한 단계 답변 저장
    dispatch(stepSelector(selectLabel));

    // 실시간 상태관리 호출
    const state = getState() as { chatBubble: ChatBubbleState };

    // 모든 단계의 선택이 완료되었다면 프롬프트 문자 구성
    const allStepSelect = state.chatBubble.QA_select.find(
      (item) => item.selectLabel === ""
    );

    // 단계별 선택지 조합하여 프롬프트 문자 셋팅
    if (!allStepSelect) {
      state.chatBubble.QA_select.forEach((item) => {
        switch (item.step) {
          case 1:
            state.chatBubble.QA_prompt += `추천받을 스타일의 목적은 ${item.selectLabel}(을/를) 찾고 있고,`;
            break;
          case 2:
            state.chatBubble.QA_prompt +=
              " " + `${item.selectLabel} 한 스타일을 좋아해. `;
            break;
          case 3:
            state.chatBubble.QA_prompt += `현재 계절은 ${item.selectLabel}에 알맞게 소재 추천해줬으면 하고,`;
            break;
          case 4:
            state.chatBubble.QA_prompt +=
              " " + `사용자의 성별 및 체형은 ${item.selectLabel},`;
            break;
          case 5:
            state.chatBubble.QA_prompt += `즐겨입고 선호하는 브랜드는 ${item.selectLabel}이야. `;
            break;
          case 6:
            state.chatBubble.QA_prompt +=
              " " +
              `최종적으로 추천받고 싶은 항목, 카테고리는 ${item.selectLabel} 위주로 추천해줘! `;
            break;
        }
      });
    } else {
      // 단계 이동하여 다음 질문 셋팅
      dispatch(nextStep());
    }
  }
);

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
      state.QA_prompt = ""; // 프롬프트 문자 초기화
      state.QA_select = initialState.QA_select; // 선택 배열 초기화

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
                  step: 1,
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
                  step: 2,
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

          case 3:
            state.messages.push({
              role: "chatbot",
              message: {
                type: "question",
                content: {
                  title: "03. 어떤 계절 또는 날씨의 의상을 찾으시나요?",
                  step: 3,
                  options: [
                    { label: "여름 / 더운 날", value: "summer" },
                    { label: "간절기 (봄 / 가을)", value: "spring" },
                    { label: "겨울 / 추운 날", value: "winter" },
                  ],
                },
              },
            });

            break;
        }
      }
    },
    // 단계별 선택 저장 및 프롬프트 문자 구성
    stepSelector: (state, action: any) => {
      const userAnswer = action.payload;

      // 선택한 단계의 라벨로 기존 배열 업데이트
      const updateStepSelect = state.QA_select.map((item) => {
        return item.step === state.QA_step ? userAnswer : item;
      });

      state.QA_select = updateStepSelect;
    },
    // 현재 대화 메시지 배열에 실시간 채팅 메시지 추가
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  pushMessage,
  changeMode,
  chatOpen,
  chatClose,
  nextStep,
  stepSelector,
} = chatBubbleSlice.actions;
export default chatBubbleSlice.reducer;
