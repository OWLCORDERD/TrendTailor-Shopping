"use client";

import React, { use, useState } from "react";
import Result from "@/component/trendlyAI/mode/Consultant/Result";
import RecentChatSideBar from "@/component/trendlyAI/page/RecentChatList";

// 2026.10.17: Next.js 16부터 params가 Promise로 전달되므로 React use()로 언래핑
const TrendlyDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
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
