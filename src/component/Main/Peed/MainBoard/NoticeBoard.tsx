"use client";

import { NoticeType } from "app/notice/page";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ThemeContext } from "../../../../../context/ThemeContext";

interface noticePropsType {
  noticeDB: NoticeType[];
}

const NoticeBoard = ({ noticeDB }: noticePropsType) => {
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
    <div className='Notice-container'>
      <div className='Notice-titleBox'>
        <h1 className='Notice-title'>Notice</h1>

        <Link href='/notice'>
          <AiOutlinePlus
            color={mode === "dark" ? "#fff" : "#000"}
            fontSize={20}
          />
        </Link>
      </div>

      <div className='Notice-slider'>
        <ul
          className='list-slider'
          style={{
            top: `-${currentSlide}00%`,
            transitionDuration: "1s",
          }}
        >
          {noticeDB.map((item: any) => {
            return (
              <li key={item.idx}>
                <Link href={`/notice/${item.idx}`}>
                  <h2>{item.title}</h2>
                  <span>{String(item.date).slice(0, 10)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NoticeBoard;
