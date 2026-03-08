"use client";

import Intro from "@/component/trendlyAI/mode/Intro";
import Consultant from "@/component/trendlyAI/mode/Consultant/Consultant";
import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { IoClose, IoReturnUpForwardSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  changeMode,
  chatClose,
  closeClothesDetail,
} from "@/store/chatBubbleSlice";
import { TiHome } from "react-icons/ti";
import { GoHistory } from "react-icons/go";
import { useRouter } from "next/navigation";

const Container = () => {
  // 현재 활성화된 채팅 모드
  const chatMode = useAppSelector((state) => state.chatBubble.mode);
  const clothesDetailMode = useAppSelector(
    (state) => state.chatBubble.clothesDetailMode
  );
  const dispatch = useDispatch();

  const dynamicImport = () => {
    switch (chatMode) {
      case "consultant":
        return <Consultant />;
      default:
        return <Intro />;
    }
  };

  const introMode: any = {
    mode: "intro",
  };

  const router = useRouter();

  const moveTrendlyPage = () => {
    dispatch(chatClose());
    router.push("/trendly");
  };

  return (
    <div className='modal trendly'>
      <div className='modal-header'>
        {clothesDetailMode ? (
          <button
            type='button'
            className='close-btn'
            onClick={() => dispatch(closeClothesDetail())}
            style={{ transform: "rotate(180deg)" }}
          >
            <IoReturnUpForwardSharp />
          </button>
        ) : (
          <button
            type='button'
            className='close-btn'
            onClick={() => dispatch(chatClose())}
          >
            <IoClose />
          </button>
        )}

        <button className='chat-history' onClick={() => moveTrendlyPage()}>
          <GoHistory fontSize={18} />
          <span className='txt'>채팅 내역</span>
        </button>
      </div>
      {/* 인트로 화면 */}
      {/* 컨설팅 관련 채팅 화면 */}
      {dynamicImport()}

      {chatMode === "consultant" && (
        <div className='modal-footer'>
          <button
            type='button'
            className='home-btn'
            onClick={() => dispatch(changeMode(introMode.mode))}
          >
            <TiHome />
          </button>
        </div>
      )}
    </div>
  );
};

export default Container;
