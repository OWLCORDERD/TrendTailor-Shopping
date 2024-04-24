"use client";
import React, { useRef, useState, useEffect } from "react";
import { SeasonPeed as CSS } from "styles";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { clothes } from "./Peed";
import Loading from "component/fetchDB/loading/Loading";

const SeasonPeed = () => {
  const slideRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollMaxWidth, setScrollMaxWidth] = useState(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [seasonClothes, setSeasonClothes] = useState<clothes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const prevSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (itemRef.current && scrollWidth > 0) {
      const itemWidth = itemRef.current.clientWidth;
      setScrollWidth((initialWidth) => initialWidth - itemWidth - 50);
    }
  };

  const nextSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (itemRef.current && scrollRef.current) {
      const itemWidth = itemRef.current.clientWidth + 50;
      const maxWidth = scrollMaxWidth - itemWidth * 3;

      if (scrollWidth < maxWidth) {
        setScrollWidth((initialWidth) => initialWidth + itemWidth);
      }
    }
  };

  const searchSeasonClothes = async () => {
    const searchQuery: string = "봄";
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
    searchSeasonClothes();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!loading && scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      setScrollMaxWidth((initial) => initial + clientWidth);
    }
  }, [loading]);

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
    <CSS.Container>
      <CSS.TitleBox>
        <CSS.Title>
          <h1>Seasonal collection</h1>
        </CSS.Title>

        <CSS.SlideControl>
          <CSS.ControlButton onClick={(e) => prevSlide(e)}>
            <IoIosArrowBack fontSize={20} />
          </CSS.ControlButton>

          <CSS.ControlButton onClick={(e) => nextSlide(e)}>
            <IoIosArrowForward fontSize={20} />
          </CSS.ControlButton>
        </CSS.SlideControl>
      </CSS.TitleBox>

      <CSS.Slider
        ref={slideRef}
        onMouseDown={(e) => onDragStart(e)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onMouseMove={(e) => onDragMove(e)}
      >
        {!!loading && seasonClothes.length === 0 ? (
          <Loading />
        ) : (
          <CSS.SlideWrap
            ref={scrollRef}
            style={{
              transform: `translateX(-${scrollWidth}px)`,
              transition: "all 0.5s ease-in",
            }}
          >
            {seasonClothes.map((clothes) => {
              return (
                <CSS.SlideItem key={clothes.productId} ref={itemRef}>
                  <CSS.ProductImg>
                    <Image
                      src={clothes.image}
                      alt='시즌 추천 의류'
                      width='600'
                      height='600'
                    />
                  </CSS.ProductImg>

                  <CSS.ProductInfo>
                    <CSS.ProductName>
                      <h2>{clothes.title}</h2>
                    </CSS.ProductName>

                    <CSS.ProductBrand>
                      <p>{clothes.brand}</p>
                    </CSS.ProductBrand>

                    <CSS.ProductPrice>
                      <span>{clothes.lprice}</span>
                    </CSS.ProductPrice>
                  </CSS.ProductInfo>
                </CSS.SlideItem>
              );
            })}
          </CSS.SlideWrap>
        )}
      </CSS.Slider>
    </CSS.Container>
  );
};

export default SeasonPeed;
