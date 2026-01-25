"use client";

import React, { useState } from "react";
import Result from "@/component/trendlyAI/mode/Consultant/Result";
import RecentChatSideBar from "@/component/trendlyAI/page/RecentChatList";

const TrendlyDetailPage = ({ params }: any) => {
  const id: string = params.id;
  const [sideBarActive, setSideBarActive] = useState<boolean>(true);

  return (
    <div className='trendly-container'>
      {/* 최근 채팅 내역 사이드바 */}
      <RecentChatSideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      />
      {/* 채팅 인트로 or 모드 화면 영역 */}
      <Result docId={id} />;
    </div>
  );
};

export default TrendlyDetailPage;
