"use client";

import React, { useState, useEffect, SetStateAction, useCallback } from "react";
import "styles/banner.scss";
import Image from "next/image";

const Banner = () => {
  const introContent = [
    {
      id: 1,
      keyword: "search",
    },
    {
      id: 2,
      keyword: "season",
    },
    {
      id: 3,
      keyword: "youtube",
    },
    {
      id: 4,
      keyword: "shared",
    },
  ];

  const [loop, setLoop] = useState<any>();

  const [loading, setLoading] = useState<boolean>(true);

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    if (loading === false) {
      const timeout = setTimeout(() => {
        setCurrent((prev) => {
          if (prev < introContent.length - 1) {
            return prev + 1;
          }
          return 0;
        });
      }, 3000);

      setLoop(timeout);
    }

    return () => {
      clearTimeout(loop);
    };
  }, [current, loading]);

  return (
    <section className='Banner-container'>
      <div className='Introduce-Box'>
        <div className='Static-Welcome'>
          <h1>welcome to wish</h1>
        </div>

        <div className='Introduce-content'>
          <div className='Dynamic-content'>
            <div className='content-bracket'>
              <span>[</span>
              <span>]</span>
            </div>

            <ul
              style={{ top: `-${current}00%`, transition: "all 0.5s ease-in" }}
            >
              {introContent.map((item) => {
                return (
                  <li key={item.id}>
                    <h2>{item.keyword}</h2>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='Static-content'>
            <h2>Clothes Trand</h2>
          </div>
        </div>
      </div>

      <div className='Banner-ImgBox'>
        <video src='./sampleVideo/bannerVideo.mp4' muted loop autoPlay />
      </div>

      <div className='rotate-scroll'>
        <div className='scroll-text'>
          <span>scroll</span>
        </div>

        <Image
          src='/images/scroll.png'
          width={150}
          height={150}
          alt='rotate-img'
        />
      </div>
    </section>
  );
};

export default Banner;
