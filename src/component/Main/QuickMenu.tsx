"use client";

import React from "react";
import { QuickMenu as CSS } from "styles";
import { IoSearch } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import Link from "next/link";
import ChatbotIcon from "assets/images/chatbot.png";
import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToTop } from "@/hooks/ScrollToTop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { chatOpen } from "@/store/chatBubbleSlice";
import TrendlyContainer from "@/component/trendlyAI/Container";
import AlertModal from "../common/modal/Alert";
import { AnimatePresence } from "framer-motion";

const QuickMenu = () => {
  const { width } = useWindowSize();
  const menu = [
    {
      title: "공지사항",
      link: "/notice",
      iconType: "icon",
    },
    {
      title: "쇼핑 검색",
      link: "/shop",
      iconType: "icon",
    },
  ];

  gsap.registerPlugin(ScrollTrigger);

  const modalProps = {
    type: "login",
    title: "로그인 후 이용 가능한 서비스입니다.",
    content: "로그인하여 패션 컨설턴트의 맞춤 컨설팅을 받아보세요!",
  };

  // 로그인 모달 활성화 여부
  const modalOpen = useAppSelector((state) => state.modal.modalOpen);
  // 챗봇 모달 활성화 여부 체크
  const chatContainerOpen = useAppSelector(
    (state) => state.chatBubble.chatOpen
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <div className='quick-menu'>
        <CSS.Menu>
          {menu.map((item, index) => (
            <li className='menu-item' key={index}>
              <Link href={item.link} prefetch={true}>
                {item.iconType === "icon" ? (
                  <div className='menu-icon'>
                    {item.link === "/notice" ? (
                      <HiSpeakerphone />
                    ) : (
                      <IoSearch />
                    )}
                  </div>
                ) : null}
                <span className='menu-title'>{item.title}</span>
              </Link>
            </li>
          ))}
        </CSS.Menu>

        <CSS.AdditionalMenu>
          <CSS.Chatbot onClick={() => dispatch(chatOpen())}>
            <Image
              src={ChatbotIcon}
              alt='챗봇 아이콘'
              width={50}
              height={50}
              priority
            />
          </CSS.Chatbot>
          <ScrollToTop type='click' />
        </CSS.AdditionalMenu>
      </div>

      {/* 퀵 메뉴 챗봇 버튼 클릭 시 챗봇 모달 활성화 */}
      {chatContainerOpen && <TrendlyContainer />}

      {/* 컨설팅 메뉴 클릭 시, 로그인 여부 체크하여 모달 노출 */}
      <AnimatePresence>
        {modalOpen && (
          <AlertModal
            title={modalProps.title}
            content={modalProps.content}
            type={modalProps.type}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickMenu;
