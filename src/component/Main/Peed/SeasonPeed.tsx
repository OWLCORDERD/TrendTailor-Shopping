"use client";
import React, { useRef, useState, useEffect } from "react";
import { SeasonPeed as CSS } from "styles";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { clothes } from "./Peed";
import Loading from "component/fetchDB/loading/Loading";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Link from "next/link";
import { useAppDispatch } from "store/hooks";
import { seasonClothesData } from "store/staticClothes";

interface seasonClothesProps {
  seasonClothes: clothes[] | undefined;
}

const SeasonPeed = ({ seasonClothes }: seasonClothesProps) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const { mode } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(seasonClothesData(seasonClothes));
  }, []);

  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [scrollMaxWidth, setScrollMaxWidth] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* 모바일 터치 슬라이드 상태 값 */
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [mobileMQuery, setMobileMQuery] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<number>(0);

  /* slide prev 뒤로가기 버튼 클릭 이벤트*/
  const prevSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (itemRef.current && scrollWidth > 0) {
      const itemWidth = itemRef.current.clientWidth;
      setScrollWidth((initialWidth) => initialWidth - itemWidth);
      setCurrentPage((prev) => prev - 1);
    }
  };

  /* slide next 다음으로 넘어가는 버튼 클릭 이벤트 */
  const nextSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (itemRef.current) {
      const itemWidth = itemRef.current.clientWidth;
      const maxWidth = scrollMaxWidth - itemWidth * 5;

      if (scrollWidth < maxWidth) {
        setScrollWidth((initialWidth) => initialWidth + itemWidth);
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  /* matchMedia change 콜백 이벤트 함수 
  -> matches 값을 mobileMQuery state에 업데이트  */
  const screenChange = (e: MediaQueryListEvent) => {
    const matches = e.matches;
    setMobileMQuery(matches);
  };

  /* 컴포넌트가 마운트되면 계절 의류 조회 비동기 함수 실행*/
  useEffect(() => {
    /* 마운트 후 전역 window 객체에 matchMedia 메소드를 사용하여 현재 viewport width 값과
    screen max-width query 값을 비교하여 mediaQueryList 객체 반환 */
    let mql = window.matchMedia("screen and (max-width : 768px)");

    /* mediaQueryList 객체 matches 속성 값이 true일 시, MobileMQuery state 값에 업데이트 */
    if (mql.matches) {
      setMobileMQuery(mql.matches);
    }

    /* 해상도가 바뀔 때마다, matchMedia에서 인식하여 change 이벤트 콜백 함수 호출 */
    mql.addEventListener("change", screenChange);

    /* 컴포넌트가 unmount 시, matchMedia의 change 이벤트 remove */
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  useEffect(() => {
    if (seasonClothes && seasonClothes.length === 0) return;

    if (seasonClothes !== undefined) {
      const viewMaxItem = 5;

      setMaxPage(seasonClothes.length - (viewMaxItem - 1));
      setLoading(false);
    }
  }, [seasonClothes]);

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

    if (slideRef.current && !!mobileMQuery) {
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

    if (slideRef.current && !!mobileMQuery) {
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

        <CSS.ControlBox>
          <CSS.ControlState>
            <span>
              {currentPage} / {maxPage}
            </span>
          </CSS.ControlState>
          <CSS.ControlButtons>
            <CSS.ControlButton
              onClick={(e: any) => prevSlide(e)}
              aria-label='slide 뒤로 이동 버튼'
            >
              <IoIosArrowBack fontSize={25} />
            </CSS.ControlButton>

            <CSS.ControlButton
              onClick={(e: any) => nextSlide(e)}
              aria-label='slide 앞으로 이동 버튼'
            >
              <IoIosArrowForward fontSize={25} />
            </CSS.ControlButton>
          </CSS.ControlButtons>
        </CSS.ControlBox>
      </CSS.TitleBox>

      <CSS.Slider
        ref={slideRef}
        onMouseDown={(e: any) => onDragStart(e)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onMouseMove={(e: any) => onDragMove(e)}
      >
        {!loading && seasonClothes && seasonClothes.length > 0 ? (
          <CSS.SlideWrap
            ref={scrollRef}
            style={{
              transform: `translateX(-${scrollWidth}px)`,
              transition: "all 0.5s ease-in",
            }}
          >
            {seasonClothes.map((clothes) => {
              return (
                <CSS.SlideItem
                  key={clothes.productId}
                  ref={itemRef}
                  $mode={mode}
                >
                  <Link
                    href={{
                      pathname: `/shop/${clothes.productId}`,
                    }}
                  >
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
                        <span>{clothes.lprice}원</span>
                      </CSS.ProductPrice>
                    </CSS.ProductInfo>
                  </Link>
                </CSS.SlideItem>
              );
            })}
          </CSS.SlideWrap>
        ) : (
          <Loading />
        )}
      </CSS.Slider>
    </CSS.Container>
  );
};

export default SeasonPeed;
