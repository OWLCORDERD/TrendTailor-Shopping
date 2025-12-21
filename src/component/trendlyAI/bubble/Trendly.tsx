import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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

const Trendly = ({ message }: { message: messageType }) => {
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
    await dispatch(
      handleSurveySelect({
        step: message.content.step,
        selectLabel: directlyInput,
      })
    );

    console.log("직접 입력 후 다음 단계 이동");
    console.log(QAselect);
  };

  const nextQuestionStep = () => {
    dispatch(nextStep());
  };

  const selectQuestion = (cont: string) => {
    const currentSelect: any = {
      step: message.content.step,
      selectLabel: cont,
    };
    dispatch(handleSurveySelect(currentSelect));
  };

  const stepSelectDisabled = (currentStep: number, selectLabel: string) => {
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
      {/* 챗봇 답변 영역 */}
      {message.type === "chat" && (
        <CSS.ChatBotBubble>
          <CSS.BubbleWrap>
            <CSS.ChatBotIcon>
              <Image src={chatbotImg} alt='Chat Bot Icon' />
            </CSS.ChatBotIcon>
            <CSS.ChatBotMessage>{message.content}</CSS.ChatBotMessage>
          </CSS.BubbleWrap>
          {QAstep === 0 && (
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
      {message.type === "question" && (
        <CSS.ChatBotQuestion class='title'>
          <CSS.QuestionTitle>
            <span className='question-icon'>{questionIcon.icon()}</span>
            {message.content.title}
          </CSS.QuestionTitle>
          {/* 질문 선택 옵션 목록 */}
          {QAselect.find((item: any) => item.step === message.content.step)
            ?.selectLabel === "직접입력" && (
            <CSS.UserDirectInput>
              <input
                type='text'
                placeholder='답변을 직접 입력하세요.'
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
                    )[0]?.selectLabel === option.label
                  }
                  disabled={stepSelectDisabled(
                    message.content.step,
                    option.label
                  )}
                  key={idx}
                  onClick={() => selectQuestion(option.label)}
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
