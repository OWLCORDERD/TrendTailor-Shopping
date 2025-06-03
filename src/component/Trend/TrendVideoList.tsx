"use client";

import { videoType } from "app/trendly/page";
import React, { useState, useEffect, useRef } from "react";
import Skeleton from "./Skeleton/Skeleton";
import Loading from "component/fetchDB/loading/Loading";
import { channelDataType } from "app/trendly/page";
import CurrentVideo from "component/Trend/CurrentVideo";
import VideoItem from "./VideoItem";

interface youtubeDBProps {
  channelData: channelDataType[];
  videoData: videoType[];
}

const TrendVideoList = ({ channelData, videoData }: youtubeDBProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  /* infinite scroll 페이징 Ref */
  const currentPage = useRef<number>(1);
  /* InterSectionObserver observe 대상 요소 (스크롤 시 해당 요소를 인식하면 DB slice 로직 실행) */
  const loadDataRef = useRef<HTMLDivElement>(null);
  /* firstIndex부터 lastIndex까지 currentPage의 currentDB 배열 */
  const [currentDB, setCurrentDB] = useState<videoType[]>([]);
  /* 다음 페이지의 값이 존재 할 때, Skeleton 로딩 UI 반복문 추출을 위한 상태값 */
  const [hasNextPage, setHasNextPage] = useState<number[] | undefined>();
  /* 클라이언트 뷰포트의 너비가 모바일일때, mediaQueryList 객체 matches 속성값에 따른 조건 변화*/
  const [mobileMQuery, setMobileMQuery] = useState<boolean>(false);
  /*모바일 해상도일시, 한 페이지의 데이터 갯수를 2로 변경 (default : 4) */
  const postMaxLength = mobileMQuery ? 2 : 8;
  /* slice할 videoData length와 한 페이지에 보여질 최대 데이터 length 값을 나누어 maxPage 값 추출 */
  const maxPage = Math.ceil(videoData.length / postMaxLength);
  const lastIndex = currentPage.current * postMaxLength;
  const firstIndex = lastIndex - postMaxLength;

  useEffect(() => {
    let mql = window.matchMedia("screen and (max-width : 768px)");

    if (mql.matches === true) {
      setMobileMQuery(mql.matches);
    }

    mql.addEventListener("change", screenChange);

    return () => mql.removeEventListener("change", screenChange);
  }, []);

  useEffect(() => {
    skeletonSetting();
  }, []);

  const skeletonSetting = () => {
    const skeletonArray = [];
    for (let i = 0; i < postMaxLength; i++) {
      skeletonArray.push(i);
    }
    setHasNextPage(skeletonArray);
  };

  const screenChange = (e: MediaQueryListEvent) => {
    const matches = e.matches;

    setMobileMQuery(matches);
  };

  useEffect(() => {
    if (!loadDataRef.current || hasNextPage === undefined) return;

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          loadingData();
        }, 1000);
      }
    });

    if (loadDataRef.current) {
      io.observe(loadDataRef.current);
    }

    return () => {
      io.disconnect();
    };
  }, [loading, hasNextPage]);

  const loadingData = async () => {
    if (currentPage.current < maxPage) {
      skeletonSetting();
    } else {
      setLoading(false);
    }

    const currentData = videoData.slice(firstIndex, lastIndex);

    let dataArray = [...currentDB];

    dataArray.push(...currentData);

    setCurrentDB(dataArray);

    currentPage.current += 1;
  };

  const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);
  const [videoOpen, setVideoOpen] = useState<boolean>(false);

  return (
    <div className='TrendVideo-container'>
      <div className='TrendVideo-titleBox'>
        <h2>{channelData[0].snippet.title}님의 최신 영상</h2>
      </div>

      <div className='Trend-videoList'>
        {currentDB.map((video, index) => {
          return (
            <VideoItem
              key={index}
              video={video}
              mobileMQuery={mobileMQuery}
              setVideoOpen={setVideoOpen}
              channelData={channelData}
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
            />
          );
        })}
      </div>

      {loading ? (
        <div className='loadData' ref={loadDataRef}>
          <>
            {mobileMQuery === true ? (
              <Loading />
            ) : (
              <div className='Skeleton-videoList'>
                {hasNextPage?.map((skeleton) => {
                  return <Skeleton key={skeleton} />;
                })}
              </div>
            )}
          </>
        </div>
      ) : null}

      {videoOpen ? (
        <CurrentVideo
          open={videoOpen}
          setOpen={setVideoOpen}
          allVideo={videoData}
          currentVideo={currentVideo}
        />
      ) : null}
    </div>
  );
};

export default TrendVideoList;
