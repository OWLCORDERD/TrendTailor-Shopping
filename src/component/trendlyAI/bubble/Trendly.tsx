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

interface messageType {
  type: string;
  content: questionType; // 질문 타입은 questionType, 챗봇 답변은 string
}

const Trendly = ({ message }: { message: messageType }) => {
  const QAstep = useAppSelector((state) => state.chatBubble.QA_step);
  const QAselect = useAppSelector((state) => state.chatBubble.QA_select);
  const dispatch = useAppDispatch();

  const [multipleSelect, setMultipleSelect] = useState<bodyGenderSelect>({
    body: {
      label: "",
    },
    gender: {
      label: "",
    },
  });

  const nextQuestionStep = () => {
    dispatch(nextStep());
  };

  // 커스텀 셀릭트 박스 펼침 여부
  const [selectMenuOpen, setSelectMenuOpen] = useState<boolean>(false);

  const selectQuestion = (cont: string) => {
    const currentSelect: any = {
      step: QAstep,
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

  const multipleSelectQuestion = (cont: string, target: string) => {
    if (target === "gender") {
      multipleSelect.gender.label = cont; // 성별 선택 저장
    }

    if (target === "body") {
      multipleSelect.body.label = cont; // 체형 선택 저장
    }

    if (multipleSelect.gender.label !== "") {
      const currentSelect: any = {
        step: QAstep,
        // 선택된 성별과 체형 데이터 문자열로 저장
        selectLabel: `${multipleSelect.gender.label}`,
      };

      dispatch(handleSurveySelect(currentSelect));
    }

    if (multipleSelect.body.label !== "") {
      const currentSelect: any = {
        step: QAstep,
        // 선택된 성별과 체형 데이터 문자열로 저장
        selectLabel:
          `${multipleSelect.gender.label}` +
          ", " +
          `${multipleSelect.body.label}`,
      };

      dispatch(handleSurveySelect(currentSelect));

      setMultipleSelect({
        body: { label: "" }, // 선택 초기화
        gender: { label: "" },
      }); // 선택 초기화

      setSelectMenuOpen(false); // 셀렉트 박스 닫기
    }
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
          {"body" in message.content.options &&
          "gender" in message.content.options ? (
            <>
              {/* 성별 선택 */}
              <CSS.QuestionOptions>
                {message.content.options.gender.map((option, idx) => {
                  return (
                    <CSS.QuestionOption
                      key={idx}
                      $select={
                        QAselect.find(
                          (item: any) => item.step === message.content.step
                        )?.selectLabel.split(", ")[0] === option.label
                      }
                      disabled={
                        message.content.step !== QAstep &&
                        QAselect.find(
                          (item: any) => item.step === message.content.step
                        )?.selectLabel.split(", ")[0] !== option.label
                      }
                      onClick={() =>
                        multipleSelectQuestion(option.label, "gender")
                      }
                    >
                      {option.label}
                    </CSS.QuestionOption>
                  );
                })}
              </CSS.QuestionOptions>

              {/* 체형 선택 */}
              <CSS.BodyOptions>
                <button
                  type='button'
                  className='select-btn'
                  onClick={() => setSelectMenuOpen(!selectMenuOpen)}
                  disabled={
                    QAselect.find(
                      (item: any) => item.step === message.content.step
                    )?.selectLabel.split(", ")[1] !== undefined
                  }
                >
                  {QAselect.find(
                    (item: any) => item.step === message.content.step
                  )?.selectLabel.split(", ")[1] || "체형을 선택해주세요"}

                  <IoIosArrowDown className='drop-icon' />
                </button>

                {selectMenuOpen && (
                  <ul className='select-list'>
                    {message.content.options.body.map((option, idx) => {
                      return (
                        <button
                          type='button'
                          className='option-btn'
                          key={idx}
                          onClick={() =>
                            multipleSelectQuestion(option.label, "body")
                          }
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </ul>
                )}
              </CSS.BodyOptions>
            </>
          ) : (
            <>
              {message.content.step !== 4 && (
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
              )}
            </>
          )}
        </CSS.ChatBotQuestion>
      )}
    </>
  );
};

export default Trendly;
