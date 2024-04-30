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

  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [scrollMaxWidth, setScrollMaxWidth] = useState<number>(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  let mobileMedia: boolean = window.matchMedia(
    "screen and (max-width : 768px)"
  ).matches;

  const [seasonClothes, setSeasonClothes] = useState<clothes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* slide prev 뒤로가기 버튼 클릭 이벤트*/
  const prevSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (itemRef.current && scrollWidth > 0) {
      const itemWidth = itemRef.current.clientWidth;
      setScrollWidth((initialWidth) => initialWidth - itemWidth - 50);
    }
  };

  /* slide next 다음으로 넘어가는 버튼 클릭 이벤트 */
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

  /* Naver Open API를 활용한 query 문자열 (계절 의류) 의류 조회 */
  const searchSeasonClothes = async () => {
    const searchQuery: string = "봄 의류";
    const viewResult: number = 20;
    /*Naver Open API 요청 시 header에 포함되는 Client-Id, Client-Secret 객체 생성 */
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

    /*Naver Open API 비동기 데이터 통신 결과값의 items 배열의 데이터들마다
    title 속성 문자열 값에 포함된 태그 제거하는 replace 작업 진행 */
    const replaceTitle: clothes[] = clothesData.map((clothes) => {
      return {
        title: clothes.title.replace(/<[^>]*>?/g, ""),
        link: clothes.link,
        image: clothes.image,
        lprice: clothes.lprice,
        hprice: clothes.hprice,
        mallName: clothes.mallName,
        productId: clothes.productId,
        productType: clothes.productType,
        brand: clothes.brand,
        maker: clothes.maker,
        category1: clothes.category1,
        category2: clothes.category2,
        category3: clothes.category3,
        category4: clothes.category4,
      };
    });

    /*API fetch -> replaceTitle 과정까지 끝난 이후 SeasonClothes state에 데이터 객체 저장 */
    setSeasonClothes(replaceTitle);

    /* 로딩 스피너 종료 */
    setLoading(false);
  };

  /* 컴포넌트가 마운트되면 계절 의류 조회 비동기 함수 실행 */
  useEffect(() => {
    searchSeasonClothes();
  }, []);

  /*로딩 스피너가 업데이트되면 scrollRef 요소로 저장된 dom element의
  clientWidth 값 구한 뒤 scrollMaxWidth state에 저장 */
  useEffect(() => {
    if (loading) return;

    if (!loading && scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      setScrollMaxWidth((initial) => initial + clientWidth);
    }
  }, [loading]);

  /* 모바일 slider 드레그 슬라이딩 이벤트 */

  /*(요소 안에서 마우스 왼쪽 버튼 클릭시 실행되는 MouseDown 이벤트 */
  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDrag(true);

    if (slideRef.current && mobileMedia === true) {
      setStartX(e.pageX);
      setScrollLeft(slideRef.current.scrollLeft);
    }
  };

  /* 요소 안에서 마우스 클릭을 때거나 마우스 커서를 밖으로 이동 할 시 실행되는 MouseLeave, MouseUp 이벤트 */
  const onDragEnd = () => {
    setIsDrag(false);
  };

  /*요소 안에서 마우스를 움직일시 실행되는 MouseMove 이벤트 */
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrag) return;

    e.preventDefault();

    if (slideRef.current && mobileMedia === true) {
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
          <CSS.ControlButton onClick={(e: any) => prevSlide(e)}>
            <IoIosArrowBack fontSize={20} />
          </CSS.ControlButton>

          <CSS.ControlButton onClick={(e: any) => nextSlide(e)}>
            <IoIosArrowForward fontSize={20} />
          </CSS.ControlButton>
        </CSS.SlideControl>
      </CSS.TitleBox>

      <CSS.Slider
        ref={slideRef}
        onMouseDown={(e: any) => onDragStart(e)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onMouseMove={(e: any) => onDragMove(e)}
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
