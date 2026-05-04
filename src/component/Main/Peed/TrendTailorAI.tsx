"use client";

import React, { useEffect, useState } from "react";
import { TrendTailorAI as CSS } from "@/styles/Peed/TrendTailorAI";
import { FaUser } from "react-icons/fa";
import NextImage from "@/component/common/NextImage";
import { keywordSearch } from "@/component/svgData";
import chatbotImg from "@/assets/images/chatbot.png";
import sampleResultImg from "@/assets/images/clothes-list.png";
import { motion, animate, useAnimation } from "framer-motion";

const TrendTailorAI = () => {
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const loop = async () => {
      while (isMounted) {
        await controls.start("show");
        await new Promise((res) => setTimeout(res, 2000)); // 전체 끝난 후 대기
        await controls.start("hidden");
      }
    };
    loop();

    return () => {
      isMounted = false;
    };
  }, [controls]);

  const elementByMotion = {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 1.2,
        },
      },
    },

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

    resultSample: {
      hidden: {
        opacity: 0,
        x: -50,
      },
      show: {
        opacity: 1,
        x: 0,
      },
    },
  };
  return (
    <CSS.Container
      variants={elementByMotion.container}
      animate={controls}
      initial='hidden'
      className='timeline-section'
    >
      <CSS.Intro>
        <h2 className='title'>Trend Consulting Tailored AI</h2>
        <p className='description'>
          Trendly AI는 고객님의 설문조사 및 소통을 통해 원하는 스타일의 트랜드를
          컨설팅해드립니다.
        </p>
      </CSS.Intro>

      <CSS.Contents>
        <CSS.SampleChat variants={elementByMotion.chatSample}>
          <CSS.UserBubble variants={elementByMotion.chatBubble}>
            <div className='profile'>
              <FaUser size={24} color='#333' />
            </div>
            <div className='bubble'>
              <span>미니멀한 스타일의 바지 추천 좀 해줘</span>
            </div>
          </CSS.UserBubble>

          <CSS.GenerateBubble variants={elementByMotion.chatBubble}>
            {keywordSearch.icon()}
            <span>사용자 설문 선택 내용 분석 중...</span>
          </CSS.GenerateBubble>

          <CSS.AgentBubble variants={elementByMotion.chatBubble}>
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

        <CSS.SampleResult variants={elementByMotion.resultSample}>
          <NextImage
            src={sampleResultImg}
            alt='트랜드 컨설팅 결과 이미지'
            width={580}
            height={850}
          />
        </CSS.SampleResult>
      </CSS.Contents>
    </CSS.Container>
  );
};

export default TrendTailorAI;
