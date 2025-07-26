"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import { Trendly as CSS } from "styles";
import Chatbot from "assets/images/chatbot.png";
import { motion } from "framer-motion";
import { IoIosChatboxes } from "react-icons/io";
import { HiDocumentCheck } from "react-icons/hi2";
import { useAppDispatch } from "@/store/hooks";
import { changeMode } from "@/store/chatBubbleSlice";

const ChatContainer = () => {
  const { data, status } = useSession();
  const [openAIQuestion, setOpenAIQuestion] = useState<string>("");

  const dispatch = useAppDispatch();

  // 챗봇 인트로 애니메이션
  const chatbotAnimated = {
    initial: {
      y: "50%",
    },
    animate: {
      y: 0,
      transition: {
        duration: 1.5,
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  // 챗봇 인트로 말풍선
  const bubbleAnimated = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5, // 애니메이션 지속 시간
      },
    },
  };

  // 챗봇 메뉴 애니메이션
  const menuAnimated = {
    initial: {
      display: "none",
    },

    animate: {
      display: "block",
      transition: {
        duration: 2,
        delayChildren: 1,
        staggerChildren: 1,
      },
    },
  };

  // 챗봇 description & 메뉴
  const menuItemAnimated = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // 애니메이션 지속 시간
      },
    },
  };

  const modePayload: any = {
    mode: "consultant",
    user: data && data.user ? data.user.name : "익명",
  };

  return (
    <CSS.Intro>
      <motion.div
        className='character'
        variants={chatbotAnimated}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <div className='character-logo'>
          <Image src={Chatbot} width={310} height={250} alt='챗봇 아이콘' />
        </div>

        <motion.ul
          className='character-bubble'
          variants={chatbotAnimated}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <motion.li variants={bubbleAnimated} className='bubble'>
            <span>요즘 유행하는 룩이 궁금하신가요?</span>
          </motion.li>

          <motion.li variants={bubbleAnimated} className='bubble'>
            <span>당신에게 어울릴 의상을 컨설팅 해드릴게요.</span>
          </motion.li>
        </motion.ul>
      </motion.div>

      <motion.div
        className='comment-menu'
        variants={menuAnimated}
        initial='initial'
        animate='animate'
      >
        <motion.div className='intro-comment' variants={menuItemAnimated}>
          {status === "authenticated" ? (
            <h1 className='title'>
              안녕하세요 <strong>{data?.user?.name}님,</strong>
            </h1>
          ) : (
            <h1 className='title'>
              안녕하세요 <strong>익명의 회원님,</strong>
            </h1>
          )}
          <p className='desc'>오늘 당신의 패션 컨설턴트입니다.</p>
        </motion.div>

        <motion.div className='intro-menu' variants={menuItemAnimated}>
          <span>무엇을 도와드릴까요?</span>
          <button
            type='button'
            className='menu-btn'
            onClick={() => dispatch(changeMode(modePayload))}
          >
            <HiDocumentCheck fontSize={30} />
            컨설턴트 추천
          </button>
          <button type='button' className='menu-btn'>
            <IoIosChatboxes fontSize={30} />
            채팅 시작
          </button>
        </motion.div>
      </motion.div>
    </CSS.Intro>
  );
};

export default ChatContainer;
