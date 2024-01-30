"use client";

import { NoticeType } from "app/notice/page";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ThemeContext } from "../../../../../context/ThemeContext";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const NoticeBoard = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [noticeDB, setNoticeDB] = useState<NoticeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loop, setLoop] = useState<any>();

  const { mode } = useContext(ThemeContext);

  const noticeFetch = async () => {
    try {
      const res = await axios.get("/api/viewNotice");

      if (res.status === 200) {
        setNoticeDB(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    noticeFetch();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [noticeDB]);

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
        {!loading ? (
          <ul
            className='list-slider'
            style={{
              top: `-${currentSlide}00%`,
              transitionDuration: "1s",
            }}
          >
            {noticeDB.map((item) => {
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
        ) : (
          <div className='Notice-loading'>
            <Oval
              visible={true}
              height='50'
              width='50'
              color='#000'
              secondaryColor='rgba(0,0,0,0.3)'
              ariaLabel='oval-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
