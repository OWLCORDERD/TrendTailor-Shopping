"use client";

import { NoticeType } from "app/notice/page";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ThemeContext } from "../../../../../context/ThemeContext";
import { NoticeBoard as CSS } from "styles";

interface MainBoardPropsType {
  noticeDB: NoticeType[];
}

const NoticeBoard = ({ noticeDB }: MainBoardPropsType) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loop, setLoop] = useState<any>();

  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    const swiperLoop = setTimeout(() => {
      setCurrentSlide((prev) => {
        if (prev < noticeDB.length - 1) {
          return prev + 1;
        }
        return 0;
      });
    }, 5000);

    setLoop(swiperLoop);

    return () => {
      clearTimeout(loop);
    };
  }, [currentSlide, setCurrentSlide, noticeDB]);

  return (
    <CSS.Container>
      <CSS.TitleBox>
        <CSS.Title>Notice</CSS.Title>

        <Link href='/notice'>
          <AiOutlinePlus
            color={mode === "dark" ? "#fff" : "#000"}
            fontSize={20}
            aria-label='공지사항 더보기 버튼'
          />
        </Link>
      </CSS.TitleBox>

      <CSS.Slider>
        <CSS.List
          style={{
            top: `-${currentSlide}00%`,
            transitionDuration: "1s",
          }}
        >
          {noticeDB ? (
            noticeDB.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={`/notice/${item.id}`}>
                    <h2>{item.title}</h2>
                    <span>{String(item.date).slice(0, 10)}</span>
                  </Link>
                </li>
              );
            })
          ) : (
            <li>
              <a>
                <h2>공지사항 데이터 로딩 중..</h2>
                <span></span>
              </a>
            </li>
          )}
        </CSS.List>
      </CSS.Slider>
    </CSS.Container>
  );
};

export default NoticeBoard;
