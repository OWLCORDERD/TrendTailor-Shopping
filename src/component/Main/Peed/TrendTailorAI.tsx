"use client";

import React from "react";
import { TrendTailorAI as CSS } from "@/styles/Peed/TrendTailorAI";
import { FaUser } from "react-icons/fa";
import NextImage from "@/component/common/NextImage";
import { keywordSearch } from "@/component/svgData";
import chatbotImg from "@/assets/images/chatbot.png";

const TrendTailorAI = () => {
  return (
    <CSS.Container>
      <CSS.Intro>
        <h2 className='title'>Trend Consulting Tailored AI</h2>
        <p className='description'>
          Trendly AI는 고객님의 설문조사 및 소통을 통해 원하는 스타일의 트랜드를
          컨설팅해드립니다.
        </p>
      </CSS.Intro>

      <CSS.Contents>
        <CSS.SampleChat>
          <CSS.UserBubble>
            <div className='profile'>
              <FaUser size={24} color='#333' />
            </div>
            <div className='bubble'>
              <span>미니멀한 스타일의 바지 추천 좀 해줘</span>
            </div>
          </CSS.UserBubble>

          <CSS.GenerateBubble>
            {keywordSearch.icon()}
            <span>사용자 설문 선택 내용 분석 중...</span>
          </CSS.GenerateBubble>

          <CSS.AgentBubble>
            <div className='profile'>
              <NextImage
                src={chatbotImg}
                width={50}
                height={40}
                alt='챗봇 이미지'
              />
            </div>
            <div className='bubble'>
              <span>
                회원님의 선택 사항을 기반으로 10건의 트랜드 의류를 발견했어요.
                각 상품마다 추천한 이유와 꿀팁 및 키포인트를 설명해드릴게요.
              </span>
            </div>
          </CSS.AgentBubble>
        </CSS.SampleChat>

        <CSS.SampleResult></CSS.SampleResult>
      </CSS.Contents>
    </CSS.Container>
  );
};

export default TrendTailorAI;
