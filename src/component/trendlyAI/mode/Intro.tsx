"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Trendly as CSS } from "styles";
import Chatbot from "assets/images/chatbot.png";
import { motion } from "framer-motion";
import { IoIosChatboxes } from "react-icons/io";
import { HiDocumentCheck } from "react-icons/hi2";
import { useAppDispatch } from "@/store/hooks";
import { changeMode } from "@/store/chatBubbleSlice";
import { openModal } from "@/store/modalSlice";
import { ModalContext } from "../../../../context/ModalContext";

const ChatContainer = () => {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();

  const { modalOpen } = useContext(ModalContext);

  // 챗봇 인트로 애니메이션
  const chatbotAnimated = {
    initial: {
      y: "30",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
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

  const consultantMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 비로그인 사용자일 시, 로그인 모달 노출
    if (status !== "authenticated") {
      const options: any = {
        title: "로그인 후 이용 가능한 서비스입니다.",
        type: "login",
        dynamicComponent: "LoginContent",
      };

      console.log(modalOpen);

      if (modalOpen) {
        modalOpen(options);
      }
      return;
    } else {
      // 로그인 사용자일 시, 컨설턴트 모드 변경
      dispatch(changeMode(modePayload));
    }
  };

  const chatMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("현재 개발중입니다.");
    return;
  };

  const modePayload: any = {
    mode: "consultant",
    user: data?.user?.name,
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
          <motion.li variants={chatbotAnimated} className='bubble'>
            <span>요즘 유행하는 룩이 궁금하신가요?</span>
          </motion.li>

          <motion.li variants={chatbotAnimated} className='bubble'>
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
        <div className='intro-comment'>
          {status === "authenticated" ? (
            <h1 className='title'>
              안녕하세요 <strong>{data?.user?.name}님,</strong>
            </h1>
          ) : (
            <h1 className='title'>
              안녕하세요 <strong>익명의 회원님,</strong>
            </h1>
          )}
          <p className='desc'>
            오늘 당신의 패션 컨설턴트입니다.
            <br />
            무엇을 도와드릴까요?
          </p>
        </div>

        <div className='intro-menu'>
          <button
            type='button'
            className='menu-btn'
            onClick={(e) => consultantMode(e)}
          >
            <HiDocumentCheck fontSize={30} />
            컨설턴트 추천
          </button>
          <button
            type='button'
            className='menu-btn'
            onClick={(e) => chatMode(e)}
          >
            <IoIosChatboxes fontSize={30} />
            채팅 시작
          </button>
        </div>
      </motion.div>
    </CSS.Intro>
  );
};

export default ChatContainer;
