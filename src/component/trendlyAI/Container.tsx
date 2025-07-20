"use client";

import Intro from "@/component/trendlyAI/mode/Intro";
import Consultant from "@/component/trendlyAI/mode/Consultant";
import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { chatClose } from "@/store/chatBubbleSlice";

const Container = () => {
  // 현재 활성화된 채팅 모드
  const chatMode = useAppSelector((state) => state.chatBubble.mode);
  const dispatch = useDispatch();

  const dynamicImport = () => {
    switch (chatMode) {
      case "consultant":
        return <Consultant />;
      default:
        return <Intro />;
    }
  };

  return (
    <div className='modal trendly'>
      <div className='modal-header'>
        <button
          type='button'
          className='close-btn'
          onClick={() => dispatch(chatClose())}
        >
          <IoClose />
        </button>
      </div>
      {/* 인트로 화면 */}
      {/* 컨설팅 관련 채팅 화면 */}
      {dynamicImport()}
    </div>
  );
};

export default Container;
