import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { getRecommendClothes } from "./monthlyClothesSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";

interface ChatBubbleState {
  chatOpen: boolean;
  mode: string;
  messages: messagesType[];
  // 컨설팅 모드 관련 상태 값
  QA_step: number; // QA 단계
  QA_select: selectType[]; // QA 단계별 사용자 답변 선택 값
  generateCreating: string; // 챗봇 답변 생성 여부
  consultingResultData: any; // 컨설팅 챗봇 답변 > 컨설턴트 정보 데이터
  clothesDetailMode: boolean; // 컨설팅 의류 상세 모드 여부
  currentClothes: clothes | null; // 현재 선택한 컨설팅 의류 정보
  clothesData: any[]; // 컨설팅용 의류 데이터
}

interface selectType {
  step: number;
  selectLabel: string; // 선택한 답변 레이블
}

interface ResultTemplate {
  // 컨설팅 요청 사용자 정보 및 단계별 답변 선택 값
  user: {
    info: {
      username: string;
      email: string;
    };
    QA_select: {
      step: number;
      selectLabel: string;
    }[];
  };
  assistant: {
    recommendInfo: recommendClothes[];
    products: clothes[];
  };
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
  ],
  generateCreating: "before", // 챗봇 답변 생성 중 여부 (기본값 true)
  consultingResultData: null, // 챗봇 답변 메시지
  clothesDetailMode: false, // 컨설팅 의류 상세 모드 여부
  currentClothes: null, // 현재 선택한 컨설팅 의류 정보
  clothesData: [], // 컨설팅용 의류 데이터
};

// 2025.09.07 [mhlim]: 선택한 답변 목록 전송 ->  추천 검색 결과 요청하는 thunk 함수
export const recommendOpenAI = createAsyncThunk(
  "chatbubble/recommendOpenAI",
  async (clothesData: clothes[], { getState, dispatch }) => {
    const state = getState() as { chatBubble: ChatBubbleState };
    try {
      const res = await fetch("/api/recommendOpenAI", {
        method: "POST",
        body: JSON.stringify({
          selectClothes: clothesData,
        }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error("Failed to fetch recommend openAI data");
      }

      return data;
    } catch (err) {
      // Open AI API 응답 오류 시점
      // > extraReducers rejected 대신 직접 generate 에러 핸들링 처리
      dispatch(recommendAIError());
      return err;
    }
  }
);

export const recommendResultSession = createAsyncThunk(
  "chatbubble/recommendResultSession",
  async (userData: any, { getState, dispatch }) => {
    const state = getState() as { chatBubble: ChatBubbleState };
    const userQASelect = state.chatBubble.QA_select;

    try {
      const template: ResultTemplate = {
        user: {
          info: {
            username: userData?.user?.name ?? "",
            email: userData?.user?.email ?? "",
          },
          QA_select: userQASelect,
        },
        // 추천 의류 목록
        assistant: {
          recommendInfo: [],
          products: [],
        },
      };

      // 추천 의류 목록 데이터 조회
      const productPromises =
        state.chatBubble.consultingResultData.products.map(
          async (product: recommendClothes) => {
            const searchData = await dispatch(
              getRecommendClothes(product.productId)
            );
            return searchData.payload as clothes;
          }
        );

      const products = await Promise.all(productPromises);
      template.assistant.products = products;
      template.assistant.recommendInfo =
        state.chatBubble.consultingResultData.products;

      const recentChatsCollection = collection(db, "recent-chats");

      const res = await addDoc(recentChatsCollection, {
        ...template,
        createAt: new Date().toISOString(),
      });

      return res;
    } catch (err) {
      console.error("Failed to fetch recommend result session");
      return err;
    }
  }
);

export const retryRecommendOpenAI = createAsyncThunk(
  "chatbubble/retryConsulting",
  async (_, { dispatch, getState }) => {
    // 컨설팅 재시도 -> 상태 로딩중으로 초기화
    dispatch(retryConsulting());

    // 다시 openAI 및 youtube API 채널 컨설턴트 추천 요청
    // dispatch(recommendOpenAI());
  }
);

// 2025.08.11: 컨설팅 모드 > 단계별 답변 선택 시 호출되는 thunk 함수
export const handleSurveySelect = createAsyncThunk(
  "chatbubble/handleSurveySelect",
  async (selectObject: any, { getState, dispatch }) => {
    // 사용자가 선택한 단계 답변 저장
    dispatch(stepSelector(selectObject));

    // 실시간 상태관리 호출
    const state = getState() as { chatBubble: ChatBubbleState };

    // 모든 단계의 선택이 완료되었다면 프롬프트 문자 구성
    const allStepSelect = state.chatBubble.QA_select.every(
      (item) => item.selectLabel !== "" && item.selectLabel !== "직접입력"
    );

    // 모든 질문 단계 선택 완료 시 챗봇 답변 요청
    if (allStepSelect) {
      // 1단계: 사용자 답변 기반 컨설팅 의류 데이터 필터링
      await dispatch(searchConsultingClothes());
    } else {
      // 현재 단계에서 직접 입력 선택한 경우, 다음 단계 이동 제한
      if (selectObject.selectLabel !== "etc") {
        // 단계 이동하여 다음 질문 셋팅
        dispatch(nextStep());
      } else {
        return;
      }
    }
  }
);

export const searchConsultingClothes = createAsyncThunk(
  "chatbubble/handleSearchClothes",
  async (_, { getState, dispatch }) => {
    const state = getState() as { chatBubble: ChatBubbleState };

    try {
      // 1단계: 선택 단계별 라벨 기반으로 의류 데이터 필터링 요청
      const res = await fetch("/api/searchClothes", {
        method: "POST",
        body: JSON.stringify({
          type: "consulting",
          select: state.chatBubble.QA_select,
        }),
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch consulting clothes data");
      } else {
        const data = await res.json();

        if (data.clothesData.length > 0) {
          // 2단계: 필터링 데이터 기반 챗봇 답변 요청
          await dispatch(recommendOpenAI(data.clothesData));
        }

        return data;
      }
    } catch (err) {
      return err;
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
      state.messages = []; // 인트로 모드로 변경 시 메시지 초기화
      state.QA_step = 0; // 질문 단계 초기화
      state.QA_select = initialState.QA_select; // 선택 배열 초기화
      state.generateCreating = "before"; // 챗봇 답변 생성 중 여부 초기화
      state.consultingResultData = {}; // 컨설팅 챗봇 답변 데이터 초기화
      state.clothesDetailMode = false; // 컨설팅 의류 상세 모드 비활성화
      state.currentClothes = null; // 현재 선택한 컨설팅 의류 정보 초기화
    },
    // 챗봇 모드 변경
    changeMode: (state, action: any) => {
      state.mode = action.payload.mode; // 클라이언트에서 요청한 모드로 변경

      state.messages = []; // 인트로 모드로 변경 시 메시지 초기화
      state.QA_step = 0; // 질문 단계 초기화
      state.QA_select = initialState.QA_select; // 선택 배열 초기화
      state.generateCreating = "before"; // 챗봇 답변 생성 중 여부 초기화
      state.consultingResultData = {}; // 컨설팅 챗봇 답변 데이터 초기화
      state.clothesDetailMode = false; // 컨설팅 의류 상세 모드 비활성화
      state.currentClothes = null; // 현재 선택한 컨설팅 의류 정보 초기화

      if (action.payload.mode === "consultant") {
        state.messages = [
          {
            role: "user",
            message: {
              type: "chat",
              content: "내가 찾는 조건에 맞는 의류를 컨설팅 받고싶어",
            },
          },
          {
            role: "chatbot",
            message: {
              type: "chat",
              content: `안녕하세요, ${action.payload.user}님! 지금부터 회원님이 찾으시는 의류 컨설팅을 도와드릴 Trendly 챗봇이에요! 우선 간단한 설문조사를 시작할게요.`,
            },
          },
        ];
      }
    },
    // 2025.08.04: 컨설팅 모드 > 질문 단계에 따른 템플릿 메시지 추가
    nextStep: (state) => {
      if (state.QA_step < 5) {
        state.QA_step = state.QA_step + 1; // 질문 단계 업데이트
      }

      if (state.mode === "consultant") {
        switch (state.QA_step) {
          case 1:
            state.messages.push({
              role: "chatbot",
              message: {
                type: "question",
                content: {
                  title: "01. 어떤 아이템을 찾고 계신가요?",
                  step: 1,
                  placeholder: "의류 종류 키워드를 입력하세요.",
                  options: [
                    { label: "아우터", value: "outer" },
                    { label: "상의", value: "top" },
                    { label: "하의", value: "bottom" },
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
                  title:
                    "02. 다음 중, 평소 선호하거나 찾고싶은 스타일은 무엇인가요?",
                  step: 2,
                  options: [
                    { label: "오피스룩", value: "office" },
                    { label: "스포티/운동룩", value: "sportify" },
                    { label: "스트릿", value: "street" },
                    { label: "미니멀", value: "minimal" },
                    { label: "빈티지", value: "vintage" },
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
                  title: "03. 어떤 성별의 스타일을 추천받고 싶으신가요?",
                  step: 3,
                  options: [
                    { label: "여성", value: "female" },
                    { label: "남성", value: "male" },
                    { label: "모두", value: "default" },
                  ],
                },
              },
            });

            break;

          case 4:
            state.messages.push({
              role: "chatbot",
              message: {
                type: "question",
                content: {
                  title: "04. 원하시는 가격선을 선택해주세요",
                  step: 4,
                  placeholder: "원하시는 가격을 숫자로 직접 입력하세요.",
                  options: [
                    { label: "5만원 이하", value: "50000" },
                    { label: "10만원 이하", value: "100000" },
                    { label: "20만원 이하", value: "200000" },
                    { label: "직접입력", value: "etc" },
                  ],
                },
              },
            });

            break;

          case 5:
            state.messages.push({
              role: "chatbot",
              message: {
                type: "question",
                content: {
                  title:
                    "05. 마지막으로 인기도 vs 가성비, 어떤 의류를 더 선호하시나요?",
                  step: 5,
                  options: [
                    { label: "인기도", value: "popular" },
                    { label: "가성비", value: "cheap" },
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
      const updateStepSelect = state.QA_select.map((item: any) => {
        return item.step === state.QA_step ? userAnswer : item;
      });

      state.QA_select = updateStepSelect;
    },
    // 단계 직접 입력 선택 케이스 > 사용자 입력 값 저장
    stepDirectInputUpdate: (state, action: any) => {
      const userDirectInput = action.payload;

      // 선택한 단계의 라벨로 기존 배열 업데이트
      const updateStepInput = state.QA_select.map((item: any) => {
        return (
          item.step === state.QA_step && {
            ...item,
            userDirectInput: userDirectInput,
          }
        );
      });

      state.QA_select = updateStepInput;
    },
    // 프롬프트 혹은 API 문제로 인해 오류 발생 시, 재시도 화면 버튼 이벤트
    retryConsulting: (state) => {
      state.generateCreating = "creating";
      state.consultingResultData = {};
    },
    recommendAIError: (state) => {
      state.generateCreating = "error";

      state.messages = [
        {
          role: "user",
          message: {
            type: "chat",
            content: "내가 찾는 조건에 맞는 의류를 컨설팅 받고싶어",
          },
        },
        {
          role: "chatbot",
          message: {
            type: "chat",
            content: `회원님에게 제공할 최적의 의류를 조회하는 과정에서 오류가 발생했습니다. 다시 시도해주세요.`,
          },
        },
      ];
    },
    // 현재 대화 메시지 배열에 실시간 채팅 메시지 추가
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // AI 컨설팅 추천 상품 상세 모드 관리
    consultingClothesDetail: (state, action) => {
      state.currentClothes = action.payload;
      state.clothesDetailMode = true; // 컨설팅 의류 상세 모드 활성화
    },
    closeClothesDetail: (state) => {
      state.currentClothes = null;
      state.clothesDetailMode = false; // 컨설팅 의류 상세 모드 비활성화
    },
  },
  extraReducers: (builder) => {
    builder.addCase(recommendOpenAI.pending, (state) => {
      state.generateCreating = "creating"; // 챗봇 답변 생성 중
    }),
      builder.addCase(recommendOpenAI.fulfilled, (state, action: any) => {
        state.consultingResultData = action.payload.recommend; // 챗봇 답변 데이터 저장
      });
    builder.addCase(recommendOpenAI.rejected, (state) => {
      state.generateCreating = "error"; // 챗봇 답변 생성 에러
    });
    builder.addCase(searchConsultingClothes.fulfilled, (state, action: any) => {
      state.clothesData = action.payload.clothesData; // 추후 의류 데이터 저장
    });
    builder.addCase(recommendResultSession.fulfilled, (state, action: any) => {
      if (
        action.payload.id &&
        `recent-chats/${action.payload.id}` === action.payload.path
      ) {
        state.generateCreating = "complete"; // 챗봇 답변 생성 완료
        window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/trendly/${action.payload.id}`;
      }
    });
    builder.addCase(recommendResultSession.rejected, (state) => {
      state.generateCreating = "error"; // 챗봇 답변 생성 에러
    });
  },
});

export const {
  pushMessage,
  changeMode,
  chatOpen,
  chatClose,
  nextStep,
  stepSelector,
  retryConsulting,
  consultingClothesDetail,
  closeClothesDetail,
  stepDirectInputUpdate,
  recommendAIError,
} = chatBubbleSlice.actions;
export default chatBubbleSlice.reducer;
