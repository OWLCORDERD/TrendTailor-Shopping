import React, { useEffect, useRef, useState } from 'react';
import { Trendly as CSS } from '@/styles';
import TrendlyBubble from '@/component/trendlyAI/bubble/Trendly';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import UserBubble from '@/component/trendlyAI/bubble/User';
import { warningIcon } from '@/component/svgData';
import Loading from './Loading';
import Result from './Result';
import { chatClose, recommendResultSession } from '@/store/chatBubbleSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PiWarningCircle } from 'react-icons/pi';

const Consultant = () => {
  const messages = useAppSelector(state => state.chatBubble.messages);
  const QA_step = useAppSelector(state => state.chatBubble.QA_step);
  const generateRecommendation = useAppSelector(
    state => state.chatBubble.generateCreating
  );
  // 컨설팅 챗봇 결과 응답 데이터
  const consultingResultData = useAppSelector(
    state => state.chatBubble.consultingResultData
  );

  const chatArea = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  // 2025.08.02: 컨설팅 모드 > 질문 템플릿 메시지 생성시마다
  // 채팅 영역 하단으로 스크롤 이동
  useEffect(() => {
    if (QA_step > 0) {
      if (chatArea.current) {
        chatArea.current.scrollTo({
          top: chatArea.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);

  // 2025.08.26: 컨설팅 모드 상태에 따른 화면 전환 관리
  const dynamicChatScreen = () => {
    switch (generateRecommendation) {
      case 'before':
        return (
          <div className="chat-area" ref={chatArea}>
            {messages.map((message: messagesType, index: number) => {
              return message.role === 'user' ? (
                <UserBubble message={message.message} key={index} />
              ) : (
                <TrendlyBubble message={message.message} key={index} />
              );
            })}
            {/* 챗봇 채팅창 영역 */}
          </div>
        );
      case 'creating':
        return <Loading />;
      case 'complete':
        dispatch(chatClose());
      case 'error':
        return (
          <div className="chat-area" ref={chatArea}>
            {messages.map((message: messagesType, index: number) => {
              return message.role === 'user' ? (
                <UserBubble message={message.message} key={index} />
              ) : (
                <TrendlyBubble message={message.message} key={index} />
              );
            })}
          </div>
        );
    }
  };

  const { data } = useSession();

  useEffect(() => {
    if (
      consultingResultData &&
      consultingResultData.products &&
      consultingResultData.products.length > 0
    ) {
      dispatch(recommendResultSession(data)); // 컨설팅 결과 세션 저장
    }
  }, [consultingResultData]);
  return (
    <CSS.ConsultantMode>
      {/* 실시간 컨설팅 단계에 따른 화면 전환
      1. 컨설팅 질문 선택 
      2. 모든 질문 답변 선택 시, 답변 생성 로딩 활성화
      3. 완료된 컨설팅 답변 화면
      */}
      {dynamicChatScreen()}

      <CSS.WarningText>
        <PiWarningCircle className="warning-icon" />
        <span className="warning-txt">
          챗봇의 안내에 따라 설문조사에 답변해주세요.
          <br />
          결과는 서버 상태에 따라 최대 몇분 소요될 수 있습니다.
        </span>
      </CSS.WarningText>
    </CSS.ConsultantMode>
  );
};

export default Consultant;
