"use client";

import React from "react";
import { QuickMenu as CSS } from "styles";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import ChatbotIcon from "assets/images/chatbot.png";
import { useWindowSize } from "utils/hooks/useWindowSize";
import Image from "next/image";

const QuickMenu = () => {
  // 2025.06.01: 뷰포트 실시간 너비에 따라 퀵메뉴 렌더링 여부 업데이트
  const { width } = useWindowSize();

  const menu = [
    {
      title: "컨설팅 챗봇",
      link: "/trendly",
      iconType: "image",
    },
    {
      title: "쇼핑 검색",
      link: "/shop",
      iconType: "icon",
      icon: IoSearch,
    },
  ];
  return (
    <>
      {width > 768 ? (
        <CSS.Container>
          <CSS.Title>Quick Menu</CSS.Title>
          <CSS.Menu>
            {menu.map((item, index) => (
              <li className='menu-item' key={index}>
                <Link href={item.link} prefetch={true}>
                  {item.iconType === "image" ? (
                    <div className='menu-icon'>
                      <Image src={ChatbotIcon} alt='trendly 챗봇 아이콘' />
                    </div>
                  ) : (
                    <div className='menu-icon'>
                      <IoSearch />
                    </div>
                  )}
                  <span className='menu-title'>{item.title}</span>
                </Link>
              </li>
            ))}
          </CSS.Menu>
        </CSS.Container>
      ) : null}
    </>
  );
};

export default QuickMenu;
