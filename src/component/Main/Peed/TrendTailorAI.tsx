'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TrendTailorAI as CSS } from '@/styles/Peed/TrendTailorAI';
import { FaUser } from 'react-icons/fa';
import NextImage from '@/component/common/NextImage';
import { keywordSearch } from '@/component/svgData';
import chatbotImg from '@/assets/images/chatbot.png';
import sampleResultList from '@/assets/images/consultant/clothes-list.png';
import sampleResultNav from '@/assets/images/consultant/navigator.png';
import SystemLabel from '@/component/Dashboard/ui/SystemLabel';

const TrendTailorAI = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  // 2026.08.23. 사용자 뷰포트 > 컴포넌트 노출 시점 애니메이션 실행 처리
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || hasPlayed) return;

    // 화면 노출 시점 intersectionObserver 생성
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // 애니메이션 실행 여부 업데이트
        setHasPlayed(true);
        // intersectionObserver 트리거 해제
        observer.unobserve(sectionEl);
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    // 최초 마운트 시점 애니메이션 실행 트리거 등록
    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, [hasPlayed]);

  // 채팅 말풍선 및 컨설팅 결과 이미지 애니메이션
  const elementByMotion = {
    // 채팅 말풍선 및 컨설팅 결과 이미지 컨테이너
    container: {
      hidden: {},
      show: {
        transition: {
          // 두 요소 간의 애니메이션 지연 시간 설정
          staggerChildren: 1.2,
        },
      },
    },

    // 채팅 말풍선 애니메이션
    chatSample: {
      hidden: {
        opacity: 0,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0,
        },
      },
    },

    // 채팅 말풍선 내부 요소 애니메이션
    chatBubble: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      show: {
        opacity: 1,
        y: 0,
      },
    },

    // 컨설팅 결과 이미지 애니메이션
    sampleResult: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      show: {
        opacity: 1,
        y: 0,
      },
    },
  };
  return (
    <CSS.Container
      ref={sectionRef}
      variants={elementByMotion.container}
      initial="hidden"
      animate={hasPlayed ? 'show' : 'hidden'}
      className="timeline-section"
    >
      <SystemLabel type="eyebrow" labelTxt="TREND CONSULTING AI" />
      <CSS.Intro>
        <h2 className="title">TrendTailor AI</h2>
        <p className="description">
          Trendly AI는 고객님의 설문조사 및 소통을 통해 원하는 스타일의 트랜드를
          컨설팅해드립니다.
        </p>
      </CSS.Intro>

      <CSS.Contents>
        <CSS.SampleChat variants={elementByMotion.chatSample}>
          <CSS.UserBubble variants={elementByMotion.chatBubble}>
            <div className="profile">
              <FaUser size={24} color="#333" />
            </div>
            <div className="bubble">
              <span>미니멀한 스타일의 바지 추천 좀 해줘</span>
            </div>
          </CSS.UserBubble>

          <CSS.GenerateBubble variants={elementByMotion.chatBubble}>
            {keywordSearch.icon()}
            <span>사용자 설문 선택 내용 분석 중...</span>
          </CSS.GenerateBubble>

          <CSS.AgentBubble variants={elementByMotion.chatBubble}>
            <div className="profile">
              <NextImage
                src={chatbotImg}
                width={50}
                height={40}
                alt="챗봇 이미지"
              />
            </div>
            <div className="bubble">
              <span>
                회원님의 선택 사항을 기반으로 10건의 트랜드 의류를 발견했어요.
                각 상품마다 추천한 이유와 꿀팁 및 키포인트를 설명해드릴게요.
              </span>
            </div>
          </CSS.AgentBubble>
        </CSS.SampleChat>

        <CSS.SampleResult variants={elementByMotion.sampleResult}>
          <NextImage
            src={sampleResultNav}
            alt="트랜드 컨설팅 결과 이미지"
            width={280}
          />
          <NextImage
            src={sampleResultList}
            alt="트랜드 컨설팅 결과 이미지"
            width={420}
          />
        </CSS.SampleResult>
      </CSS.Contents>
    </CSS.Container>
  );
};

export default TrendTailorAI;
