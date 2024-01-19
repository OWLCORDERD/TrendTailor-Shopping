"use client";

import { videoType } from "component/Main/Peed/Peed";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Skeleton from "./Skeleton/Skeleton";

interface youtubeDBProps {
  youtubeDB: videoType[];
}

const TrendVideoList = ({ youtubeDB }: youtubeDBProps) => {
  const currentPage = useRef<number>(1);
  const postMaxLength = 6;
  const loadDataRef = useRef<HTMLDivElement>(null);
  const lastIndex = currentPage.current * postMaxLength;
  const firstIndex = lastIndex - postMaxLength;
  const maxPage = Math.ceil(youtubeDB.length / postMaxLength);
  const [currentDB, setCurrentDB] = useState<videoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<videoType[] | null>([]);

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

  const firstSkeletonSetting = () => {
    setLoading(true);

    const firstDB = youtubeDB.slice(firstIndex, lastIndex);

    setHasNextPage(firstDB);
  };

  useEffect(() => {
    firstSkeletonSetting();
  }, []);

  useEffect(() => {
    if (!loadDataRef.current || hasNextPage === null) return;

    const io = new IntersectionObserver((entries) => {
      setTimeout(() => {
        if (entries[0].isIntersecting) {
          loadingData();
        }
      }, 2000);
    });

    if (loadDataRef.current) {
      io.observe(loadDataRef.current);
    }

    return () => {
      io.disconnect();
    };
  }, [loading, hasNextPage]);

  return (
    <div className='TrendVideo-container'>
      <div className='TrendVideo-titleBox'>
        <h2>깡스타일리스트가 추천하는 패션트렌드</h2>
      </div>

      <div className='Trend-videoList'>
        {currentDB
          ? currentDB.map((video) => {
              return (
                <div className='Trend-video' key={video.id.videoId}>
                  <div className='video-thumbnail'>
                    <Image
                      src={video.snippet.thumbnails.high.url}
                      width={480}
                      height={360}
                      alt='video-image'
                    />
                  </div>

                  <div className='video-infoBox'>
                    <div className='video-title'>
                      <h2>{video.snippet.title}</h2>
                    </div>

                    <div className='video-channel'>
                      <span>{video.snippet.channelTitle}</span>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <div className='loadData' ref={loadDataRef}>
        {loading && hasNextPage !== null ? (
          <div className='Skeleton-videoList'>
            {hasNextPage?.map((skeleton) => {
              return <Skeleton key={skeleton.id.videoId} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TrendVideoList;
