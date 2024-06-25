"use client";
import React, { useRef, useState, useEffect } from "react";
import { SeasonPeed as CSS } from "styles";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { clothes } from "./Peed";
import Loading from "component/fetchDB/loading/Loading";
import Link from "next/link";
import { useAppDispatch } from "store/hooks";
import { seasonClothesUpdate } from "store/staticClothes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "styles/swiper/swiper.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface seasonClothesProps {
  seasonClothes: clothes[] | undefined;
}

const SeasonPeed = ({ seasonClothes }: seasonClothesProps) => {
  const slideButtonIcon = [
    {
      name: "prev",
      icon: () => (
        <svg
          width='100'
          height='80'
          viewBox='0 0 100 80'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M35 40L62.5285 10H65L37.5 40L65 70H62.5285L35 40Z'
            fill='black'
          />
        </svg>
      ),
    },
    {
      name: "next",
      icon: () => (
        <svg
          width='100'
          height='80'
          viewBox='0 0 100 80'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M65 40L37.2599 10H35L62.4138 40L35 70H37.2599L65 40Z'
            fill='black'
          />
        </svg>
      ),
    },
  ];
  const itemRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [maxPage, setMaxPage] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(seasonClothesUpdate(seasonClothes));
  }, []);

  useEffect(() => {
    if (seasonClothes && seasonClothes.length === 0) return;

    if (seasonClothes !== undefined) {
      const viewMaxItem = 5;

      setMaxPage(seasonClothes.length - (viewMaxItem - 1));
      setLoading(false);
    }
  }, [seasonClothes]);

  return (
    <CSS.Container>
      <CSS.TitleBox>
        <CSS.Title>
          <h1>시즌 추천 시리즈</h1>
        </CSS.Title>
        <CSS.Info>
          <p>실시간으로 계절에 맞는 모든 브랜드의 의류들을 추천해드립니다.</p>
        </CSS.Info>
      </CSS.TitleBox>

      <CSS.Slider>
        {!loading && seasonClothes && seasonClothes.length > 0 ? (
          <CSS.SlideWrap>
            <Swiper
              slidesPerView={5}
              loop={true}
              pagination={false}
              navigation={{
                nextEl: ".next",
                prevEl: ".prev",
              }}
              modules={[Navigation]}
            >
              {seasonClothes.map((clothes) => {
                return (
                  <SwiperSlide>
                    <CSS.SlideItem key={clothes.productId} ref={itemRef}>
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </CSS.SlideWrap>
        ) : (
          <Loading />
        )}
      </CSS.Slider>

      <CSS.ControlBox>
        <CSS.ControlButton aria-label='slide prev button' className='prev'>
          {slideButtonIcon[0].icon()}
        </CSS.ControlButton>

        <CSS.ControlButton aria-label='slide next button' className='next'>
          {slideButtonIcon[1].icon()}
        </CSS.ControlButton>
      </CSS.ControlBox>
    </CSS.Container>
  );
};

export default SeasonPeed;
