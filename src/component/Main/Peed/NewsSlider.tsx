"use client";

import "styles/newsSlider.scss";
import React, { useEffect, useState, useRef, use } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const NewsSlider = (): JSX.Element => {
  const NewsItems = [
    {
      id: 1,
      img_url: "./News/Covernat.jpg",
      title: "커버낫 클로버하트 퀼팅 시리즈 발매",
      info: "커버낫에서 2023.07.10 ~ 07.16 기간동안 최대 10% 할인전을 준비했습니다.",
    },
    {
      id: 2,
      img_url: "./News/Avandress.jpg",
      title: "어반드레스 인기 우먼라인 아이템 특별전",
      info: "어반드레스에서 2023.07.10 ~ 07.16 기간동안 최대 55% 할인전을 준비했습니다.",
    },
    {
      id: 3,
      img_url: "./News/CPGN_STUDIO.jpg",
      title: "꼼파뇨 23 HOT SUMMER 맨즈 캡슐 컬렉션 발매",
      info: "꼼파뇨 특가 2023.07.10 ~ 08.11 기간동안 최대 35% 할인전을 준비했습니다.",
    },
    {
      id: 4,
      img_url: "./News/ROCCI.jpg",
      title: "로씨로씨 23SS 인기상품 인플루언서 할인전",
      info: "로씨로씨에서만! 2023.07.10 ~ 07.31 기간동안 인플루언서의 인기 상품을 할인하고 있습니다.",
    },
  ];

  const itemRef = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState<any>();
  const [product, setProduct] = useState<number>(0);

  useEffect(() => {
    const swiperLoop = setTimeout(() => {
      setProduct((prev) => {
        if (prev < NewsItems.length - 1) {
          return prev + 1;
        }
        return 0;
      });
    }, 3000);

    setLoop(swiperLoop);

    return () => {
      clearTimeout(loop);
    };
  }, [product, setProduct]);

  const beforeSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (product > 0) {
      setProduct(product - 1);
    }
  };

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (product < NewsItems.length - 1) {
      setProduct(product + 1);
    }
  };
  return (
    <div className='MainPeed-News'>
      <div className='News-title'>
        <h1>news</h1>
      </div>

      <div className='News-Slider'>
        <div className='Slide-control'>
          <button
            type='button'
            className='slide-before'
            onClick={(e) => beforeSlide(e)}
          >
            <AiOutlineLeft />
          </button>

          <button
            type='button'
            className='slide-next'
            onClick={(e) => nextSlide(e)}
          >
            <AiOutlineRight />
          </button>
        </div>
        <div
          className='Slider-wrapper'
          style={{ left: `-${product}00%`, transition: "all 0.5s ease-in" }}
        >
          {NewsItems.map((item) => {
            return (
              <div className='Slide-item' key={item.id} ref={itemRef}>
                <div className='Slide-ImgBox'>
                  <img src={item.img_url} alt='News-SlideImg' />
                </div>

                <div className='Slide-content'>
                  <h2>{item.title}</h2>
                  <p>{item.info}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsSlider;
