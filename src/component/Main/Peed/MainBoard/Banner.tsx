"use client";

import React from "react";
import "styles/banner.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
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
    <div className='Banner-container'>
      <Swiper
        className='slide-wrap'
        slidesPerView={1}
        navigation={{
          nextEl: ".slide-next",
          prevEl: ".slide-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {slideDB?.map((slide) => {
          return (
            <SwiperSlide className='slide-item' key={slide.id}>
              <div className='slide-imgBox'>
                <Image
                  src={slide.image}
                  alt='슬라이드 이미지'
                  width={2560}
                  height={1440}
                />
              </div>

              <div className='slide-infoBox' key={slide.id}>
                <div className='slide-title'>
                  <h1>{slide.title}</h1>
                </div>

                <div className='slide-info'>
                  <p>{slide.info}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className='slide-control'>
          <div className='slide-prev'>
            <IoIosArrowBack color='#fff' fontSize={70} />
          </div>

          <div className='slide-next'>
            <IoIosArrowForward color='#fff' fontSize={70} />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
