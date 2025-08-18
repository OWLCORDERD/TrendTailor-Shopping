import React, { useEffect, useRef, useState } from "react";
import { Trendly as CSS } from "@/styles";
import TrendlyBubble from "@/component/trendlyAI/bubble/Trendly";
import { useAppSelector } from "@/store/hooks";
import UserBubble from "@/component/trendlyAI/bubble/User";
import { warningIcon } from "@/component/svgData";
import Chatbot from "assets/images/chatbot.png";
import Image from "next/image";
import { motion } from "framer-motion";

const Consultant = () => {
  const messages = useAppSelector((state) => state.chatBubble.messages);
  const QA_step = useAppSelector((state) => state.chatBubble.QA_step);
  const generateRecommendation = useAppSelector(
    (state) => state.chatBubble.generateCreating
  );
  const consultingResultData = useAppSelector(
    (state) => state.chatBubble.consultingResultData
  );

  const [loading, setLoading] = useState<boolean>(false);

  const chatArea = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // 로딩 이후 답변 가공 완료되어 로딩 상태 초기화될때 답변 출력
    if (!generateRecommendation) {
      console.log(consultingResultData);
    }
  }, [generateRecommendation, consultingResultData]);
  return (
    <CSS.ConsultantMode>
      {/* 컨설팅 답변 생성 중 나타나는 UI */}
      {generateRecommendation ? (
        <CSS.RecommendationLoading>
          <motion.div
            className='chatbot'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='chatbot-character'>
              <Image src={Chatbot} width={310} height={250} alt='챗봇 아이콘' />
            </div>

            <div className='chatbot-bubble'>
              <span className='comment'>회원님의 성향을 분석중입니다</span>
              <ul className='loading-dot'>
                <li className='dot'></li>
                <li className='dot'></li>
                <li className='dot'></li>
              </ul>
            </div>
          </motion.div>
          <span className='loading-text'>
            Trendly 챗봇이 최적의 컨설턴트를 찾는중입니다.
            <br /> 잠시만 기다려주세요!
          </span>
        </CSS.RecommendationLoading>
      ) : (
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
      )}

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
