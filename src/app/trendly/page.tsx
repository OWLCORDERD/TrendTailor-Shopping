"use client";

import React, { useState } from "react";
import ChatArea from "@/component/trendlyAI/page/ChatArea";
import RecentChatSideBar from "@/component/trendlyAI/page/RecentChatList";

const TrendlyPage = () => {
  const [sideBarActive, setSideBarActive] = useState<boolean>(true);

  return (
    <div className='trendly-container'>
      {/* 최근 채팅 내역 사이드바 */}
      <RecentChatSideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      />

      <ChatArea
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      />
    </div>
  );
};

export default TrendlyPage;
