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

const ChatContainer = () => {
  const { data, status } = useSession();
  const [openAIQuestion, setOpenAIQuestion] = useState<string>("");

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
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
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
        duration: 1.5,
        delayChildren: 1,
        staggerChildren: 0.5,
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

  // 2025.02.02: 사용자 질문 입력값 실시간 업데이트
  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenAIQuestion(e.target.value);
  };

  return (
    <CSS.ChatContainer>
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
            <button type='button' className='menu-btn'>
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

      {/* 챗봇 채팅창 영역 <CSS.SearchForm>
        <CSS.SearchInput>
          <input
            type='text'
            maxLength={100}
            onKeyDown={requestOpenAI}
            onChange={onChangeQuestion}
            placeholder='무엇이든 질문하세요.'
          />
          <button type='button' className='search-button'>
            <FaSearch color='#fff' fontSize={18} />
          </button>
        </CSS.SearchInput>

        <CSS.SearchTool>
          <button
            type='button'
            className='attach-file'
            onMouseEnter={() => setTooltipActive(true)}
            onMouseLeave={() => setTooltipActive(false)}
          >
            <IoIosAttach fontSize={18} />

            {tooltipActive ? (
              <motion.div
                className='tooltip'
                variants={tooltipAnimated}
                animate='animate'
                initial='initial'
              >
                <span>파일첨부</span>
              </motion.div>
            ) : null}
          </button>
        </CSS.SearchTool>
      </CSS.SearchForm> */}
    </CSS.ChatContainer>
  );
};

export default ChatContainer;
