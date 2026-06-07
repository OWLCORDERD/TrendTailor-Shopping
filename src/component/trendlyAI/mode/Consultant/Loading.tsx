import React from "react";
import { Trendly as CSS } from "@/styles/Trendly";
import { motion } from "framer-motion";
import Image from "next/image";
import Chatbot from "@/assets/images/chatbot.png";

const Loading = () => {
  return (
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
        회원님의 스타일에 맞는 의상을 찾는중이에요.
        <br /> 잠시만 기다려주세요!
      </span>
    </CSS.RecommendationLoading>
  );
};

export default Loading;
