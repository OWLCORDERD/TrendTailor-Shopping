"use client";
import React, { useRef, useState, useEffect } from "react";
import { clothes, peedFetchDBType, seasonType } from "./Peed";
import Image from "next/image";
import "styles/seasonPeed.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SeasonPeed = ({ seasonDB, clothesDB }: any) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [scrollWidth, setScrollWidth] = useState(0);
  const [slideMaxWidth, setSlideMaxWidth] = useState(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const date = new Date();

  const month = date.getMonth() + 1;

  const filterSeason: seasonType[] = seasonDB.filter(
    (season: any) => season.month === month
  );

  const seasonClothes: clothes[] = clothesDB.filter(
    (clothes: any) => clothes.category4 === filterSeason[0].season
  );

  const prevSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (itemRef.current && slideMaxWidth > 0) {
      const itemWidth = itemRef.current.clientWidth;
      setScrollWidth((initialWidth) => initialWidth - itemWidth - 50);
    }
  };

  const nextSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (itemRef.current) {
      const itemWidth = itemRef.current.clientWidth + 50;
      if (scrollWidth < slideMaxWidth - itemWidth * 3) {
        setScrollWidth((initialWidth) => initialWidth + itemWidth);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      setSlideMaxWidth(scrollRef.current.clientWidth);
    }
  }, []);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDrag(true);

    if (slideRef.current) {
      setStartX(e.pageX);
      setScrollLeft(slideRef.current.scrollLeft);
    }
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrag) return;

    e.preventDefault();

    if (slideRef.current) {
      const delta = e.pageX - startX;

      slideRef.current.scrollLeft = scrollLeft + delta;
    }
  };

  return (
    <div className='SeasonPeed-container'>
      <div className='SeasonPeed-titleBox'>
        <div className='SeasonPeed-title'>
          <h1>Seasonal collection</h1>
        </div>

        <div className='slide-control'>
          <div className='slide-prev' onClick={(e) => prevSlide(e)}>
            <IoIosArrowBack fontSize={30} />
          </div>

          <div className='slide-next' onClick={(e) => nextSlide(e)}>
            <IoIosArrowForward fontSize={30} />
          </div>
        </div>
      </div>

      <div
        className='SeasonPeed-slider'
        ref={slideRef}
        onMouseDown={(e) => onDragStart(e)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onMouseMove={(e) => onDragMove(e)}
      >
        <div
          className='slide-wrap'
          ref={scrollRef}
          style={{
            transform: `translateX(-${scrollWidth}px)`,
            transition: "all 0.5s ease-in",
          }}
        >
          {seasonClothes.map((clothes) => {
            return (
              <div className='slide-item' key={clothes.productId} ref={itemRef}>
                <div className='product-imgBox'>
                  <Image
                    src={clothes.image}
                    alt='시즌 추천 의류'
                    width='600'
                    height='600'
                  />
                </div>

                <div className='product-info'>
                  <div className='product-name'>
                    <h2>{clothes.title}</h2>
                  </div>

                  <div className='product-brand'>
                    <p>{clothes.brand}</p>
                  </div>

                  <div className='product-price'>
                    <span>{clothes.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeasonPeed;
