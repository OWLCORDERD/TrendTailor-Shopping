"use client";

import React, { useState } from "react";
import ChatArea from "@/component/trendlyAI/page/ChatArea";
import RecentChatSideBar from "@/component/trendlyAI/page/RecentChatList";

const TrendlyPage = () => {
  const [sideBarActive, setSideBarActive] = useState<boolean>(true);

  return (
    <section className='trendly-container'>
      {/* 최근 채팅 내역 사이드바 */}
      <RecentChatSideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      />

      {/* 채팅 인트로 or 모드 화면 영역 */}
      <ChatArea
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      />
    </section>
  );
};

export default TrendlyPage;
