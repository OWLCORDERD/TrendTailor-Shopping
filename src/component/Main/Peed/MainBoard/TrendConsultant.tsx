"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { TrendConsultant as CSS } from "@/styles";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import VideoItem from "@/component/Trend/VideoItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useWindowSize } from "@/utils/hooks/useWindowSize";

interface consultantDataType {
  trendYoutuber: channelDataType[] | undefined;
  trendYoutubeVideo: videoType[] | undefined;
}

const TrendConsultant = ({
  trendYoutuber,
  trendYoutubeVideo,
}: consultantDataType) => {
  // 2025.06.22 Feat: 인기 컨설턴트 유튜버 채널 설명 데이터 가공
  const youtuberIntro = useMemo(() => {
    if (trendYoutuber && trendYoutuber.length > 0) {
      // 유튜버 소개 description 줄바꿈에 따른 배열 변환
      const desc = trendYoutuber[0].snippet.description.split("\n");
      // 줄바꿈 첫번째 텍스트 추출 (제목)
      const introTitle = desc[0];
      desc.shift(); // description 배열에서 첫번째 텍스트 제거

      const introDesc = desc.join("\n"); // 나머지 텍스트를 하나의 문자열로 병합 (설명)
      return {
        title: introTitle,
        desc: introDesc,
      };
    }
  }, [trendYoutuber]);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { width } = useWindowSize();

  const [mobileMQuery, setMobileMQuery] = useState<boolean>(false);

  useEffect(() => {
    let mql = window.matchMedia("screen and (max-width : 768px)");

    if (mql.matches === true) {
      setMobileMQuery(mql.matches);
    }

    mql.addEventListener("change", screenChange);

    return () => mql.removeEventListener("change", screenChange);
  }, []);

  const screenChange = (e: MediaQueryListEvent) => {
    const matches = e.matches;

    setMobileMQuery(matches);
  };

  const [currentPage, setCurrentPage] = useState<number>(0);

  const paginationUpdate = (swiper: any) => {
    setCurrentPage(swiper.activeIndex);
  };

  const swiperUpdate = (swiper: any) => {
    // 페이지네이션 활성화 인덱스 업데이트
    setCurrentPage(swiper.activeIndex);
  };

  const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);
  const [videoOpen, setVideoOpen] = useState<boolean>(false);

  return (
    <CSS.Container>
      <CSS.Title>Trend Consultant</CSS.Title>

      {trendYoutuber ? (
        <CSS.ProfileBox>
          <div className='channel-img'>
            <Image
              src={trendYoutuber[0].snippet.thumbnails.high.url}
              width={650}
              height={800}
              alt='컨설턴트 프로필 이미지'
            />
          </div>

          <div className='channel-info'>
            <div className='channel-info-name'>
              <span className='index'>금주 인기 컨설턴트</span>
              <span className='name'>{trendYoutuber[0].snippet.title}</span>
            </div>

            <div className='channel-info-desc'>
              <span className='title'>{youtuberIntro?.title}</span>
              <span className='desc'>{youtuberIntro?.desc}</span>
            </div>
          </div>
        </CSS.ProfileBox>
      ) : null}

      {trendYoutubeVideo ? (
        <CSS.VideoBox>
          <div className='slide-control'>
            <span className='slide-pagination'>
              {currentPage + 1} / {trendYoutubeVideo.length}
            </span>
            <div className='btn-wrap'>
              <button type='button' className='slide-prev' ref={prevRef}>
                <IoIosArrowBack fill='#fff' />
              </button>
              <button type='button' className='slide-next' ref={nextRef}>
                <IoIosArrowForward fill='#fff' />
              </button>
            </div>
          </div>

          <div className='slide-container'>
            <Swiper
              spaceBetween={30}
              slidesPerView={"auto"}
              centeredSlides={true}
              modules={[Navigation, Pagination]}
              loop={true}
              speed={300}
              onSlideChange={(swiper) => paginationUpdate(swiper)}
              onLoad={(swiper) => swiperUpdate(swiper)}
              navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current,
              }}
            >
              {trendYoutubeVideo.map((video, index) => (
                <SwiperSlide key={index}>
                  <VideoItem
                    key={index}
                    video={video}
                    mobileMQuery={mobileMQuery}
                    setVideoOpen={setVideoOpen}
                    channelData={trendYoutuber}
                    currentVideo={currentVideo}
                    setCurrentVideo={setCurrentVideo}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </CSS.VideoBox>
      ) : null}
    </CSS.Container>
  );
};

export default TrendConsultant;
