"use client";

import React, { useContext } from "react";
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
import { ModalContext, ModalProvider } from "../../../context/ModalContext";

const QuickMenu = () => {
  const { width } = useWindowSize();
  const menu = [
    {
      title: "공지사항",
      link: "/notice",
      iconType: "icon",
    },
  ];

  gsap.registerPlugin(ScrollTrigger);

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
    </>
  );
};

export default QuickMenu;
