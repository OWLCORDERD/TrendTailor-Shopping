import axios from "axios";
import React, { useEffect, useState, useRef, use, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Videoitem from "./Videoitem";
import "styles/youtubePeed.scss";

export interface videoType {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    title: string;
  };
}

const YoutubePeed = () => {
  const [videoData, setVideoData] = useState<videoType[]>([]);

  const videoItemRef = useRef<HTMLDivElement>(null);

  const [slideWidth, setSlideWidth] = useState<number>(0);

  const [productWidth, setProductWidth] = useState<number>(0);

  const youtubeAPI = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: { key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY },
  });

  useEffect(() => {
    youtubeAPI
      .get("search", {
        params: {
          part: "snippet",
          type: "video",
          q: "패션 트랜드",
          maxResults: 20,
        },
      })
      .then((res) => res.data.items)
      .then((data) => setVideoData(data));

    return () => {
      setVideoData([]);
    };
  }, []);

  useEffect(() => {
    const slideWidth = videoItemRef.current?.clientWidth;

    if (slideWidth !== undefined && videoData.length !== 0) {
      setProductWidth(productWidth + slideWidth);
    }
  }, [videoData]);

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (slideWidth < 9540) {
      setSlideWidth(slideWidth + productWidth + 50);
    }
  };

  const beforeSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (slideWidth > 0) {
      setSlideWidth(slideWidth - productWidth - 50);
    }
  };

  return (
    <div className='YoutubePeed-container'>
      <div className='YoutubePeed-titleBox'>
        <h1 className='YoutubePeed-title'>Fashion Trend</h1>
        <div className='slide-control'>
          <button
            type='button'
            className='slide-before'
            onClick={(e) => beforeSlide(e)}
          >
            <AiOutlineLeft />
          </button>

          <button
            type='button'
            className='slide-next'
            onClick={(e) => nextSlide(e)}
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
      <div className='Youtube-slider'>
        <div
          className='slide-wrap'
          style={{ left: `-${slideWidth}px`, transition: "all 0.5s ease-in" }}
        >
          {videoData.map((video) => {
            return (
              <Videoitem
                key={video.id.videoId}
                video={video}
                videoItemRef={videoItemRef}
                videoData={videoData}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YoutubePeed;
