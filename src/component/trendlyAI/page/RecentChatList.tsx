"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Trendly as CSS } from "@/styles";
import logoIcon from "@/assets/images/logo-icon.png";
import chatbotCharacter from "@/assets/images/chatbot.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FiSidebar } from "react-icons/fi";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { questionBubbleIcon } from "@/component/svgData";
import { motion } from "framer-motion";
import Link from "next/link";

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
        where("user.info.email", "==", data?.user?.email)
      );

      // 쿼리 참조하여 컬렉션 내부 문서 조회
      const querySnapshot = await getDocs(selectQuery);

      if (querySnapshot.empty) {
        setLoading(false);
        throw new Error("최근 채팅 내역이 없습니다.");
      }

      const snapShotData: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data(); // 문서 데이터

        // 조회 문서 아이디와 데이터 함께 저장 처리
        snapShotData.push({
          id: doc.id,
          type: data["type"],
          title: data["title"] ?? "제목 없음",
          userSelect: data["userSelect"],
          assistant: {
            products: data["assistant.products"]?.products ?? [],
            recommendInfo: data["assistant.recommendInfo"] ?? {},
          },
          createdAt: data["createAt"] ?? "",
        });
      });

      setRecentData(snapShotData);
    } catch (err) {
      console.error("최근 채팅 내역 불러오기 오류", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    currentUserRecentListLoad();
  }, [data?.user?.email]);

  const dateFormat = (date: string) => {
    return new Date(date).toLocaleDateString("ko-KR");
  };

  const sideBarMotion = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  return (
    <CSS.RecentChatSideBar $sideActive={sideBarActive}>
      <div className='sidebar-control'>
        {sideBarActive && (
          <Link className='logo-icon' href='/'>
            <Image
              src={logoIcon}
              width={70}
              height={70}
              alt='trendTailor 로고 아이콘'
            />
          </Link>
        )}

        <button
          type='button'
          className='toggle-btn'
          onClick={() => setSideBarActive(!sideBarActive)}
        >
          <FiSidebar />
        </button>
      </div>

      {sideBarActive && (
        <div className='recent-chat-list'>
          <h1 className='chat-list-title'>최근 채팅 내역</h1>

          <motion.ul
            className='chat-list'
            variants={sideBarMotion}
            initial='initial'
            animate='animate'
          >
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
                      className='chatbot-character'
                    />
                  </div>
                  <p className='no-data-txt'>최근 채팅 내역이 없습니다.</p>
                </div>
              </>
            ) : (
              recentData.map((item, index) => (
                <>
                  <div className='chat-item'>
                    <span className='type-label consult'>
                      {item.type === "consulting" ? "컨설팅" : "채팅"}
                    </span>

                    <Link href={`/trendly/${item.id}`} className='chat-title'>
                      {item.title ?? "제목"}
                    </Link>

                    <span className='chat-date'>
                      {dateFormat(item.createdAt)}
                    </span>
                  </div>
                </>
              ))
            )}
          </motion.ul>
        </div>
      )}
    </CSS.RecentChatSideBar>
  );
};

export default RecentChatList;
