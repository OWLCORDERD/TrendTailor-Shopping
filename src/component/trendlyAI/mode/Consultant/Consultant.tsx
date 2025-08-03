import React, { useEffect, useRef, useState } from "react";
import { Trendly as CSS } from "@/styles";
import TrendlyBubble from "@/component/trendlyAI/bubble/Trendly";
import { IoIosAttach } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";
import UserBubble from "@/component/trendlyAI/bubble/User";
import { warningIcon } from "@/component/svgData";

const Consultant = () => {
  const [openAIQuestion, setOpenAIQuestion] = useState<string>("");

  const messages = useAppSelector((state) => state.chatBubble.messages);
  const QA_step = useAppSelector((state) => state.chatBubble.QA_step);

  const chatArea = useRef<HTMLDivElement>(null);
  // 2025.02.02: openAI API 질문 요청
  const requestOpenAI = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 입력칸에서 enter 키 눌렀을때만 실행
    if (e.key === "Enter") {
      const res = await fetch("/api/recommendOpenAI", {
        method: "POST",
        body: JSON.stringify({
          question: openAIQuestion,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    }
  };

  // 2025.08.02: 컨설팅 모드 > 질문 템플릿 메시지 생성시마다
  // 채팅 영역 하단으로 스크롤 이동
  useEffect(() => {
    if (QA_step > 0) {
      if (chatArea.current) {
        chatArea.current.scrollTo({
          top: chatArea.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  // 2025.02.02: 사용자 질문 입력값 실시간 업데이트
  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenAIQuestion(e.target.value);
  };
  return (
    <CSS.ConsultantMode>
      <div className='chat-area' ref={chatArea}>
        {messages.map((message, index) => {
          return message.role === "user" ? (
            <UserBubble message={message.message} />
          ) : (
            <TrendlyBubble message={message.message} />
          );
        })}
        {/* 챗봇 채팅창 영역 */}
      </div>

      <CSS.WarningText>
        <span className='warning-icon'>{warningIcon.icon()}</span>
        <span className='warning-txt'>
          챗봇의 안내에 따라 설문조사에 답변해주세요.
          <br />
          결과는 서버 상태에 따라 최대 몇분 소요될 수 있습니다.
        </span>
      </CSS.WarningText>
    </CSS.ConsultantMode>
  );
};

export default Consultant;
