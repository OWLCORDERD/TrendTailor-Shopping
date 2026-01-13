"use client";

import React, { useEffect, useState } from "react";
import { Trendly as CSS } from "@/styles";
import logoIcon from "@/assets/images/logo-icon.png";
import chatbotCharacter from "@/assets/images/chatbot.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FiSidebar } from "react-icons/fi";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { questionBubbleIcon } from "@/component/svgData";

interface propsType {
  sideBarActive: boolean;
  setSideBarActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecentChatList = ({ sideBarActive, setSideBarActive }: propsType) => {
  const { data } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [recentData, setRecentData] = useState<Array<any>>([]);

  // 2026.01.14: 현재 로그인 사용자 최근 채팅 내역 조회
  const currentUserRecentListLoad = async () => {
    setLoading(true);

    try {
      // 조회 컬렉션 경로
      const collectionRef = collection(db, "recent-chats");

      // 조회 조건 쿼리
      const selectQuery = query(
        collectionRef,
        where("userEmail", "==", data?.user?.email)
      );

      // 쿼리 참조하여 컬렉션 내부 문서 조회
      const querySnapshot = await getDocs(selectQuery);

      if (querySnapshot.empty) {
        setLoading(false);
        throw new Error("최근 채팅 내역이 없습니다.");
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        setRecentData((prev) => [...prev, data]);
      });
    } catch (err) {
      console.error("최근 채팅 내역 불러오기 오류", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    async () => {
      await currentUserRecentListLoad();
    };
  }, []);

  return (
    <CSS.RecentChatSideBar>
      <div className='sidebar-inner'>
        <div className='sidebar-inner-control'>
          <Image
            src={logoIcon}
            width={70}
            height={70}
            alt='trendTailor 로고 아이콘'
          />

          <FiSidebar />
        </div>

        <div className='recent-chat-list'>
          {loading ? (
            <div className='loading-txt'>최근 채팅 내역 불러오는 중...</div>
          ) : recentData.length === 0 ? (
            <>
              <div className='no-data'>
                <div className='no-data-icon'>
                  <div className='question-bubble'>
                    {questionBubbleIcon.icon()}
                  </div>
                  <Image
                    src={chatbotCharacter}
                    width={50}
                    height={50}
                    alt='최근 채팅 내역 없음 아이콘'
                  />
                </div>
                <p className='no-data-txt'>최근 채팅 내역이 없습니다.</p>
              </div>
            </>
          ) : (
            recentData.map((item, index) => (
              <div key={index} className='chat-item'></div>
            ))
          )}
        </div>
      </div>
    </CSS.RecentChatSideBar>
  );
};

export default RecentChatList;
