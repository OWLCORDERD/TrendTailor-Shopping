"use client";

import UseFetch from "component/UseFetch";
import "styles/newsSlider.scss";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { NewsItemType } from "./Peed";

const NewsSlider = (): JSX.Element => {
  const NewsItems: NewsItemType[] = UseFetch("http://localhost:3001/News");

  const itemRef = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState<any>();
  const [product, setProduct] = useState<number>(0);

  useEffect(() => {
    if (!NewsItems) {
      clearTimeout(loop);
    }
    const swiperLoop = setTimeout(() => {
      setProduct((prev) => {
        if (prev < NewsItems.length - 1) {
          return prev + 1;
        }
        return 0;
      });
    }, 3000);

    setLoop(swiperLoop);

    return clearTimeout(loop);
  }, [NewsItems, product, setProduct]);

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
