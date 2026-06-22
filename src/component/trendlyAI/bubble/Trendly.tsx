import React, { useState } from "react";
import { Trendly as CSS } from "@/styles";
import chatbotImg from "@/assets/images/chatbot.png";
import Image from "next/image";
import { questionIcon } from "@/component/svgData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeMode,
  handleSurveySelect,
  nextStep,
} from "@/store/chatBubbleSlice";
import { IoIosArrowDown } from "react-icons/io";
import ErrorModal from "@/component/common/modal/Error";

interface messageType {
  type: string;
  content: questionType; // 질문 타입은 questionType, 챗봇 답변은 string
}

// 설문 단계별 사용자 선택 객체 타입
// > (설문 단계, 선택 라벨 문자열)
interface selectOptions {
  step: number;
  selectLabel: string;
};

const Trendly = ({
  message,
  viewOnly,
}: {
  message: string | messageType;
  viewOnly?: boolean;
}) => {
  const QAstep = useAppSelector((state) => state.chatBubble.QA_step);
  const QAselect = useAppSelector((state) => state.chatBubble.QA_select);
  const dispatch = useAppDispatch();

  const [directlyInput, setDirectlyInput] = useState<string>("");

  const [error, setError] = useState<string>("");

  const directlyInputUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (directlyInput.trim() === "") {
      setError("answer-error");
      return;
    }

    if (typeof message !== 'string') {
      const surveySelect: selectOptions = {
        step: message.content.step,
        selectLabel: directlyInput,
      } 

      await dispatch(
        handleSurveySelect({
          step: message.content.step,
          selectLabel: directlyInput,
        })
      );
    }
  };

  const nextQuestionStep = () => {
    dispatch(nextStep());
  };

  const selectQuestion = (cont: string) => {
    const currentSelect: any = {};

    // 채팅 전용 메시지가 아닌 설문 단계별 선택 메시지인 경우 
    if (typeof message !== 'string') {
      currentSelect.step = message.content.step;
      currentSelect.selectLabel = cont;
    };

    dispatch(handleSurveySelect(currentSelect));
  };

  const stepSelectDisabled = (currentStep: number, selectLabel: string) => {
    if (typeof message === 'string') return;

    return (
      QAselect.find((item: any) => item.step === currentStep)?.selectLabel !==
        "" &&
      QAselect.find((item: any) => item.step === message.content.step)
        ?.selectLabel !== selectLabel
    );
  };

  const introMode: any = {
    mode: "intro",
  };

  return (
    <>
      {/*챗봇 채팅 전용 모드 말풍선 */}
      {typeof message === 'string' && viewOnly && (
        <CSS.ChatBotBubble>
          <CSS.BubbleWrap>
            <CSS.ChatBotIcon>
              <Image src={chatbotImg} alt='Chat Bot Icon' />
            </CSS.ChatBotIcon>
            <CSS.ChatBotMessage>{message}</CSS.ChatBotMessage>
          </CSS.BubbleWrap>
        </CSS.ChatBotBubble>
      )}
      {/* 챗봇 답변 영역 */}
      {typeof message !== 'string' && message.type === "chat" && (
        <CSS.ChatBotBubble>
          <CSS.BubbleWrap>
            <CSS.ChatBotIcon>
              <Image src={chatbotImg} alt='Chat Bot Icon' />
            </CSS.ChatBotIcon>
            <CSS.ChatBotMessage>{message.content}</CSS.ChatBotMessage>
          </CSS.BubbleWrap>
          {QAstep === 0 && !viewOnly && (
            <div className='btn-wrap'>
              <button
                type='button'
                className='start-btn'
                onClick={() => nextQuestionStep()}
              >
                시작하기
              </button>
              <button
                type='button'
                className='exit-btn'
                onClick={() => dispatch(changeMode(introMode.mode))}
              >
                돌아가기
              </button>
            </div>
          )}
        </CSS.ChatBotBubble>
      )}
      {/* 챗봇 질문 선택 영역 */}
      {typeof message !== 'string' && message.type === "question" && (
        <CSS.ChatBotQuestion class='title'>
          <CSS.QuestionTitle>
            <span className='question-icon'>{questionIcon.icon()}</span>
            {message.content.title}
          </CSS.QuestionTitle>
          {/* 질문 선택 옵션 목록 */}
          {QAselect.find((item: any) => item.step === message.content.step)
            ?.selectLabel === "etc" && (
            <CSS.UserDirectInput>
              <input
                type='text'
                placeholder={message.content.placeholder}
                onChange={(e) => setDirectlyInput(e.target.value)}
              />
              <button
                type='button'
                className='submit-btn'
                onClick={(e) => directlyInputUpdate(e)}
              >
                다음 단계로 이동
              </button>
            </CSS.UserDirectInput>
          )}
          <CSS.QuestionOptions>
            {message.content.options.map((option, idx) => {
              return (
                <CSS.QuestionOption
                  $select={
                    QAselect.filter(
                      (item: any) => item.step === message.content.step
                    )[0]?.selectLabel === option.value
                  }
                  disabled={stepSelectDisabled(
                    message.content.step,
                    option.value
                  )}
                  key={idx}
                  onClick={() => selectQuestion(option.value)}
                >
                  {option.label}
                </CSS.QuestionOption>
              );
            })}
          </CSS.QuestionOptions>
        </CSS.ChatBotQuestion>
      )}
      {error === "answer-error" && (
        <ErrorModal
          errorMessage='답변을 입력해야 다음 단계로 넘어갈 수 있습니다.'
          setError={setError}
        />
      )}
    </>
  );
};

export default Trendly;
