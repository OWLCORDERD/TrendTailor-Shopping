"use client";

import { videoType } from "app/trend/page";
import React, { useState, useEffect, useRef } from "react";
import Skeleton from "./Skeleton/Skeleton";
import Loading from "component/fetchDB/loading/Loading";
import { channelDataType } from "app/trend/page";
import CurrentVideo from "component/Trend/CurrentVideo";
import VideoItem from "./VideoItem";

interface youtubeDBProps {
  youtubeDB: videoType[];
  channelData: channelDataType[];
}

const TrendVideoList = ({ youtubeDB, channelData }: youtubeDBProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  /* infinite scroll 페이징 Ref */
  const currentPage = useRef<number>(1);
  /* InterSectionObserver observe 대상 요소 (스크롤 시 해당 요소를 인식하면 DB slice 로직 실행) */
  const loadDataRef = useRef<HTMLDivElement>(null);
  /* firstIndex부터 lastIndex까지 currentPage의 currentDB 배열 */
  const [currentDB, setCurrentDB] = useState<videoType[]>([]);
  /* 다음 페이지의 값이 존재 할 때, 다음 currentDB 더미 데이터를 대입 */
  const [hasNextPage, setHasNextPage] = useState<videoType[] | null>([]);
  /* 클라이언트 뷰포트의 너비가 모바일일때, mediaQueryList 객체 matches 속성값에 따른 조건 변화*/
  const [mobileMQuery, setMobileMQuery] = useState<boolean>(false);
  /*모바일 해상도일시, 한 페이지의 데이터 갯수를 2로 변경 (default : 4) */
  const postMaxLength = mobileMQuery === true ? 2 : 4;
  /* currentPage 값에 페이지 최대 데이터 갯수를 곱하여 slice 마지막 인덱스 넘버 추출 */
  const lastIndex = currentPage.current * postMaxLength;
  /* 구한 lastIndex값에 페이지 최대 데이터 갯수를 빼면 slice 첫번째 인덱스 넘버 추출 */
  const firstIndex = lastIndex - postMaxLength;
  /* slice할 DB 최대 길이와 한 페이지에 보여질 최대 데이터 길이를 나누어 maxPage 값 추출 */
  const maxPage = Math.ceil(youtubeDB.length / postMaxLength);

  useEffect(() => {
    let mql = window.matchMedia("screen and (max-width : 768px)");

    if (mql.matches === true) {
      setMobileMQuery(mql.matches);
    }

    mql.addEventListener("change", screenChange);

    firstSkeletonSetting();

    return () => mql.removeEventListener("change", screenChange);
  }, []);

  const firstSkeletonSetting = () => {
    const firstDB = youtubeDB.slice(firstIndex, lastIndex);

    setHasNextPage(firstDB);
  };

  const screenChange = (e: MediaQueryListEvent) => {
    const matches = e.matches;

    setMobileMQuery(matches);
  };

  useEffect(() => {
    if (!loadDataRef.current || hasNextPage === null) return;

    const io = new IntersectionObserver((entries) => {
      setTimeout(() => {
        if (entries[0].isIntersecting) {
          loadingData();
        }
      }, 1000);
    });

    if (loadDataRef.current) {
      io.observe(loadDataRef.current);
    }

    return () => {
      io.disconnect();
    };
  }, [loading, hasNextPage]);

  const loadingData = () => {
    const sliceDB = youtubeDB.slice(firstIndex, lastIndex);

    let pushArray = [...currentDB];

    pushArray.push(...sliceDB);

    setCurrentDB(pushArray);

    if (currentPage.current < maxPage) {
      currentPage.current += 1;
      const nextDB = youtubeDB.slice(firstIndex, lastIndex);
      setHasNextPage(nextDB);
    } else {
      setHasNextPage(null);
      setLoading(false);
    }
  };

  const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);
  const [videoOpen, setVideoOpen] = useState<boolean>(false);

  return (
    <div className='TrendVideo-container'>
      <div className='TrendVideo-titleBox'>
        <h2>깡스타일리스트가 추천하는 패션트렌드</h2>
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

      {loading && hasNextPage !== null ? (
        <div className='loadData' ref={loadDataRef}>
          <>
            {mobileMQuery === true ? (
              <Loading />
            ) : (
              <div className='Skeleton-videoList'>
                {hasNextPage.map((skeleton) => {
                  return <Skeleton key={skeleton.id.videoId} />;
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
          allVideo={youtubeDB}
          currentVideo={currentVideo}
        />
      ) : null}
    </div>
  );
};

export default TrendVideoList;
