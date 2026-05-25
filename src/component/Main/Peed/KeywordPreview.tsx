import React, { useMemo, useState } from "react";
import { MainBanner as CSS } from "@/styles/Banner/Main";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaKey } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import NextImage from "@/component/common/NextImage";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { closeDetailPreview } from "@/store/simulationInstance";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const KeywordPreview = () => {
  const currentDetail = useAppSelector(
    (state) => state.simulation.currentDetail
  );

  const dispatch = useAppDispatch();

  const [currentSlide, setCurrentSlide] = useState<string>("all");

  const currentSlideData = useMemo(() => {
    if (!currentDetail) return [];
    const clothesList = [];

    if (currentSlide === "all") {
      currentDetail.typeOfClothes.forEach((category) => {
        clothesList.push(...category.clothes);
      });
    } else {
      const category = currentDetail.typeOfClothes.find(
        (cat) => cat.type === currentSlide
      );

      if (category) {
        clothesList.push(...category.clothes);
      }
    }
    return clothesList;
  }, [currentSlide, currentDetail]);

  const renderMotion = {
    keyword: {
      initial: {
        opacity: 0,
        transform: "translateY(20px)",
      },
      animate: {
        opacity: 1,
        transform: "translateY(0)",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      },
    },
    relatedClothes: {
      initial: {
        opacity: 0,
        transform: "translateY(20px)",
      },
      animate: {
        opacity: 1,
        transform: "translateY(0)",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.3,
        },
      },
    },
  };

  return (
    <CSS.KeywordPreview>
      <CSS.Keyword
        variant={renderMotion.keyword}
        initial={renderMotion.keyword.initial}
        animate={renderMotion.keyword.animate}
      >
        <FaArrowRotateLeft
          fontSize={20}
          color={"#000"}
          onClick={() => dispatch(closeDetailPreview())}
          aria-label='키워드 프리뷰 초기화 버튼'
          className='reset-btn'
        />
        <CSS.KeywordTitle>
          <FaKey />
          <p>{currentDetail?.keyword}</p>
        </CSS.KeywordTitle>

        <CSS.PreviewImage>
          <NextImage
            width={150}
            height={150}
            src={
              currentDetail?.typeOfClothes[0]?.clothes[0]?.image ||
              "/placeholder.png"
            }
            hasSkeleton
            alt='키워드 메인 이미지'
          />
        </CSS.PreviewImage>
        <CSS.KeywordDescription>
          {currentDetail?.typeOfClothes[0]?.clothes[0]?.description ||
            "선택한 키워드에 대한 설명이 없습니다."}
        </CSS.KeywordDescription>
      </CSS.Keyword>

      <CSS.RelatedClothes
        variant={renderMotion.relatedClothes}
        initial={renderMotion.relatedClothes.initial}
        animate={renderMotion.relatedClothes.animate}
        exit={{
          opacity: 0,
          transform: "translateY(20px)",
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <CSS.FilterTab>
          <button
            className={currentSlide === "all" ? "tab-btn active" : "tab-btn"}
            onClick={() => setCurrentSlide("all")}
          >
            All
          </button>
          {currentDetail?.typeOfClothes.map((category) => (
            <button
              key={category.type}
              className={
                currentSlide === category.type ? "tab-btn active" : "tab-btn"
              }
              onClick={() => setCurrentSlide(category.type)}
            >
              {category.type}
            </button>
          ))}
        </CSS.FilterTab>
        <CSS.Slider>
          <CSS.SlideWrap>
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              loop={true}
              modules={[Navigation, Autoplay, Pagination]}
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              pagination={{
                type: "progressbar",
                clickable: true,
              }}
              speed={1000}
            >
              {currentSlideData.length > 0 &&
                currentSlide === "all" &&
                currentSlideData.map((clothing, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <CSS.SlideItem>
                        <CSS.ClothesImg>
                          {clothing.image && (
                            <NextImage
                              key={index}
                              width={150}
                              height={150}
                              src={clothing.image || "/placeholder.png"}
                              alt={`관련 의상 ${index + 1}`}
                              hasSkeleton
                            />
                          )}
                        </CSS.ClothesImg>

                        <CSS.ClothesInfo>
                          <p className='title'>{clothing.title}</p>
                          <span className='brand'>
                            {clothing.maker !== ""
                              ? clothing.maker
                              : clothing.mallName}
                          </span>
                        </CSS.ClothesInfo>
                      </CSS.SlideItem>
                    </SwiperSlide>
                  );
                })}

              {currentSlideData.length > 0 &&
                currentSlide === "TOP" &&
                currentSlideData.map((clothing, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <CSS.SlideItem>
                        <CSS.ClothesImg>
                          {clothing.image && (
                            <NextImage
                              key={index}
                              width={150}
                              height={150}
                              src={clothing.image || "/placeholder.png"}
                              alt={`관련 의상 ${index + 1}`}
                              hasSkeleton
                            />
                          )}
                        </CSS.ClothesImg>

                        <CSS.ClothesInfo>
                          <p className='title'>{clothing.title}</p>
                          <span className='brand'>
                            {clothing.maker !== ""
                              ? clothing.maker
                              : clothing.mallName}
                          </span>
                        </CSS.ClothesInfo>
                      </CSS.SlideItem>
                    </SwiperSlide>
                  );
                })}

              {currentSlideData.length > 0 &&
                currentSlide === "BOTTOM" &&
                currentSlideData.map((clothing, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <CSS.SlideItem>
                        <CSS.ClothesImg>
                          {clothing.image && (
                            <NextImage
                              key={index}
                              width={150}
                              height={150}
                              src={clothing.image || "/placeholder.png"}
                              alt={`관련 의상 ${index + 1}`}
                              hasSkeleton
                            />
                          )}
                        </CSS.ClothesImg>

                        <CSS.ClothesInfo>
                          <p className='title'>{clothing.title}</p>
                          <span className='brand'>
                            {clothing.maker !== ""
                              ? clothing.maker
                              : clothing.mallName}
                          </span>
                        </CSS.ClothesInfo>
                      </CSS.SlideItem>
                    </SwiperSlide>
                  );
                })}

              {currentSlideData.length > 0 &&
                currentSlide === "OUTER" &&
                currentSlideData.map((clothing, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <CSS.SlideItem>
                        <CSS.ClothesImg>
                          {clothing.image && (
                            <NextImage
                              key={index}
                              width={150}
                              height={150}
                              src={clothing.image || "/placeholder.png"}
                              alt={`관련 의상 ${index + 1}`}
                              hasSkeleton
                            />
                          )}
                        </CSS.ClothesImg>

                        <CSS.ClothesInfo>
                          <p className='title'>{clothing.title}</p>
                          <span className='brand'>
                            {clothing.maker !== ""
                              ? clothing.maker
                              : clothing.mallName}
                          </span>
                        </CSS.ClothesInfo>
                      </CSS.SlideItem>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </CSS.SlideWrap>
        </CSS.Slider>

        <CSS.ControlBox>
          <CSS.ControlButton aria-label='slide prev button' className='prev'>
            <IoIosArrowBack fontSize={20} />
          </CSS.ControlButton>

          <CSS.ControlButton aria-label='slide next button' className='next'>
            <IoIosArrowForward fontSize={20} />
          </CSS.ControlButton>
        </CSS.ControlBox>
      </CSS.RelatedClothes>
    </CSS.KeywordPreview>
  );
};

export default KeywordPreview;
