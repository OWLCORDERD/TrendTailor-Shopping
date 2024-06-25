"use client";

import React from "react";
import { Banner as CSS } from "styles";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "styles/swiper/swiper.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface slideType {
  id: number;
  image: string;
  title: string;
  info: string;
}

interface MainBoardPropsType {
  slideDB: slideType[];
}

const Banner = ({ slideDB }: MainBoardPropsType) => {
  return (
    <CSS.Container>
      <CSS.slideWrap>
        <Swiper
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".slide-next",
            prevEl: ".slide-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={50}
          centeredSlides={true}
          loop={true}
        >
          {slideDB?.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <CSS.slideItem>
                  <CSS.slideImg>
                    <Image
                      src={slide.image}
                      alt='슬라이드 이미지'
                      width={2560}
                      height={1440}
                    />
                  </CSS.slideImg>

                  <CSS.slideInfo key={slide.id}>
                    <CSS.titleBox>
                      <CSS.infoTitle>{slide.title}</CSS.infoTitle>
                    </CSS.titleBox>

                    <CSS.txtBox>
                      <CSS.infoTxt>{slide.info}</CSS.infoTxt>
                    </CSS.txtBox>
                  </CSS.slideInfo>
                </CSS.slideItem>
              </SwiperSlide>
            );
          })}
          <CSS.slideControl>
            <CSS.prevButton className='slide-prev'>
              <IoIosArrowBack color='#fff' fontSize={50} />
            </CSS.prevButton>

            <CSS.nextButton className='slide-next'>
              <IoIosArrowForward color='#fff' fontSize={50} />
            </CSS.nextButton>
          </CSS.slideControl>
        </Swiper>
      </CSS.slideWrap>
    </CSS.Container>
  );
};

export default Banner;
