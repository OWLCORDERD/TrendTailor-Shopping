"use client";

import Intro from "@/component/trendlyAI/mode/Intro";
import Consultant from "@/component/trendlyAI/mode/Consultant";
import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";

const Page = () => {
  const chatMode = useAppSelector((state) => state.chatBubble.mode);

  const dynamicImport = () => {
    switch (chatMode) {
      case "consultant":
        return <Consultant />;
      default:
        return <Intro />;
    }
  };

  return (
    <section className='trendly-container'>
      {/* 인트로 화면 */}
      {/* 컨설팅 관련 채팅 화면 */}
      {dynamicImport()}
    </section>
  );
};

export default Page;
