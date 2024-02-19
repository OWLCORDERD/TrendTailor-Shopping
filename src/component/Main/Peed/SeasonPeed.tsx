"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import "styles/seasonPeed.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Oval } from "react-loader-spinner";
import { clothes } from "./Peed";

const SeasonPeed = () => {
  const slideRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [scrollWidth, setScrollWidth] = useState(0);
  const [slideMaxWidth, setSlideMaxWidth] = useState(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [seasonClothes, setSeasonClothes] = useState<clothes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const searchSeasonClothes = async () => {
    const searchQuery: string = "겨울";
    const viewResult: number = 20;
    const naverApiHeaders: any = {
      "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
    };
    const res = await fetch(
      `/api/clothes?query=${searchQuery}&display=${viewResult}`,
      {
        cache: "no-store",
        headers: naverApiHeaders,
      }
    );

    const data = await res.json();

    const clothesData: clothes[] = data.items;

    const replaceTitle: clothes[] = clothesData.map((cloth) => {
      return {
        title: cloth.title.replace(/<[^>]*>?/g, ""),
        link: cloth.link,
        image: cloth.image,
        lprice: cloth.lprice,
        hprice: cloth.hprice,
        mallName: cloth.mallName,
        productId: cloth.productId,
        productType: cloth.productType,
        brand: cloth.brand,
        maker: cloth.maker,
        category1: cloth.category1,
        category2: cloth.category2,
        category3: cloth.category3,
        category4: cloth.category4,
      };
    });

    setSeasonClothes(replaceTitle);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    searchSeasonClothes();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      setSlideMaxWidth(scrollRef.current.clientWidth);
    }
  }, [scrollRef]);

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
        {!!loading ? (
          <div className='loading'>
            <Oval
              visible={true}
              height='50'
              width='50'
              color='#000'
              secondaryColor='rgba(0,0,0,0.5)'
              ariaLabel='oval-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        ) : null}
        <div
          className='slide-wrap'
          ref={scrollRef}
          style={{
            transform: `translateX(-${scrollWidth}px)`,
            transition: "all 0.5s ease-in",
          }}
        >
          {!loading && seasonClothes.length > 0
            ? seasonClothes.map((clothes) => {
                return (
                  <div
                    className='slide-item'
                    key={clothes.productId}
                    ref={itemRef}
                  >
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
                        <span>{clothes.lprice}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default SeasonPeed;
