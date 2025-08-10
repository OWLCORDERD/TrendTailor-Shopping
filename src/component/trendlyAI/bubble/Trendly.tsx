import React, { ReactNode } from "react";
import { Trendly as CSS } from "@/styles";
import chatbotImg from "@/assets/images/chatbot.png";
import Image from "next/image";
import { questionIcon } from "@/component/svgData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeMode,
  chatClose,
  consultantPrompt,
  handleConsultantPrompt,
  nextStep,
} from "@/store/chatBubbleSlice";

interface messageType {
  type: string;
  content: questionType; // 질문 타입은 questionType, 챗봇 답변은 string
}

const Trendly = ({ message }: { message: messageType }) => {
  const QAstep = useAppSelector((state) => state.chatBubble.QA_step);
  const QAselect = useAppSelector((state) => state.chatBubble.QA_select);
  const dispatch = useAppDispatch();

  const nextQuestionStep = () => {
    dispatch(nextStep());
  };

  const selectQuestion = (cont: string, step: number) => {
    const currentSelect: any = {
      step: step,
      selectLabel: cont,
    };
    dispatch(handleConsultantPrompt(currentSelect));
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
          <CSS.QuestionOptions>
            {message.content.options.map((option, idx) => {
              return (
                <CSS.QuestionOption
                  $select={
                    QAselect.filter(
                      (item: any) => item.step === message.content.step
                    )[0]?.selectLabel === option.label
                  }
                  key={idx}
                  onClick={() => selectQuestion(option.label, QAstep)}
                >
                  {option.label}
                </CSS.QuestionOption>
              );
            })}
          </CSS.QuestionOptions>
        </CSS.ChatBotQuestion>
      )}
    </>
  );
};

export default Trendly;
