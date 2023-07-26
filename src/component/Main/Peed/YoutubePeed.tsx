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
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);

  const [videoData, setVideoData] = useState<videoType[]>([]);

  const videoItemRef = useRef<HTMLDivElement>(null);

  const [slideWidth, setSlideWidth] = useState<number>(0);

  const [productWidth, setProductWidth] = useState<number>(0);

  useEffect(() => {
    setFetchStatus(true);

    return () => {
      setFetchStatus(false);
    };
  }, []);
  {
    /*
  if (!fetchStatus) {
    const datas = use(youtubeFetch());

    if (videoData.length === 0) {
      setVideoData(datas?.props.videoDB);
      setFetchStatus(false);
    }
  }
*/
  }

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

export async function youtubeFetch() {
  const youtubeAPI = axios.create({
    baseURL: "http://localhost:3001",
  });

  try {
    const apiCall = await youtubeAPI.get("/videos");

    const data = apiCall.data;

    return {
      props: {
        videoDB: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
