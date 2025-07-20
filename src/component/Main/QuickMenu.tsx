"use client";

import React, { useEffect, useRef } from "react";
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

  // 챗봇 모달 활성화 여부 체크
  const selector = useAppSelector((state) => state.chatBubble.chatOpen);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const stickyArea = document.querySelector("main");

  //   gsap.to(".quick-menu", {
  //     bottom: "50%",
  //     display: "none",
  //     scrollTrigger: {
  //       trigger: stickyArea,
  //       start: "95% top",
  //       end: "bottom bottom",
  //       scrub: 1,
  //     },
  //   });

  //   gsap.to(".trendly-modal", {
  //     display: "none",
  //     scrollTrigger: {
  //       trigger: stickyArea,
  //       start: "95% top",
  //       end: "bottom bottom",
  //       scrub: 1,
  //     },
  //   });

  //   const refresh = ScrollTrigger.refresh();

  //   window.addEventListener("resize", () => refresh);
  //   window.addEventListener("orientationchange", () => refresh);
  //   window.addEventListener("visibilitychange", () => refresh);

  //   return () => {
  //     gsap.killTweensOf(".quick-menu");
  //     window.removeEventListener("resize", () => refresh);
  //     window.removeEventListener("orientationchange", () => refresh);
  //     window.removeEventListener("visibilitychange", () => refresh);
  //   };
  // }, []);
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
          <CSS.ScrollTop>
            <ScrollToTop type='click' />
          </CSS.ScrollTop>
          <CSS.Chatbot onClick={() => dispatch(chatOpen())}>
            <Image
              src={ChatbotIcon}
              alt='챗봇 아이콘'
              width={50}
              height={50}
              priority
            />
          </CSS.Chatbot>
        </CSS.AdditionalMenu>
      </div>

      {selector && <TrendlyContainer />}
    </>
  );
};

export default QuickMenu;
