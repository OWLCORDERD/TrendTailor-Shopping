"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Videoitem from "./Videoitem";
import "styles/youtubePeed.scss";
import "styles/slick/slick.css";
import SlideNext from "component/slideButton/SlideNext";
import SlideBefore from "component/slideButton/SlideBefore";
import { AiOutlinePlus } from "react-icons/ai";
import CurrentVideo from "./CurrentVideo";

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

  /*
  const videoData: videoType[] = [
    {
      id: {
        kind: "ko",
        videoId: "ho",
      },
      snippet: {
        channelId: "123",
        channelTitle: "민혁",
        description: "임시 데이터입니다.",
        thumbnails: {
          high: {
            url: "/News/Avandress.jpg",
          },
        },
        title: "제목입니다.",
      },
    },
    {
      id: {
        kind: "ko",
        videoId: "ho",
      },
      snippet: {
        channelId: "123",
        channelTitle: "민혁",
        description: "임시 데이터입니다.",
        thumbnails: {
          high: {
            url: "/News/Avandress.jpg",
          },
        },
        title: "제목입니다.",
      },
    },
    {
      id: {
        kind: "ko",
        videoId: "ho",
      },
      snippet: {
        channelId: "123",
        channelTitle: "민혁",
        description: "임시 데이터입니다.",
        thumbnails: {
          high: {
            url: "/News/Avandress.jpg",
          },
        },
        title: "제목입니다.",
      },
    },
    {
      id: {
        kind: "ko",
        videoId: "ho",
      },
      snippet: {
        channelId: "123",
        channelTitle: "민혁",
        description: "임시 데이터입니다.",
        thumbnails: {
          high: {
            url: "/News/Avandress.jpg",
          },
        },
        title: "제목입니다.",
      },
    },
    {
      id: {
        kind: "ko",
        videoId: "ho",
      },
      snippet: {
        channelId: "123",
        channelTitle: "민혁",
        description: "임시 데이터입니다.",
        thumbnails: {
          high: {
            url: "/News/Avandress.jpg",
          },
        },
        title: "제목입니다.",
      },
    },
    {
      id: {
        kind: "ko",
        videoId: "ho",
      },
      snippet: {
        channelId: "123",
        channelTitle: "민혁",
        description: "임시 데이터입니다.",
        thumbnails: {
          high: {
            url: "/News/Avandress.jpg",
          },
        },
        title: "제목입니다.",
      },
    },
    {
      id: {
        kind: "ko",
        videoId: "ho",
      },
      snippet: {
        channelId: "123",
        channelTitle: "민혁",
        description: "임시 데이터입니다.",
        thumbnails: {
          high: {
            url: "/News/Avandress.jpg",
          },
        },
        title: "제목입니다.",
      },
    },
  ];
  */

  const [open, setOpen] = useState<boolean>(false);

  const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 700,
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "0",
    nextArrow: <SlideNext />,
    prevArrow: <SlideBefore />,
  };

  const youtubeAPI = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: { key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY },
  });

  const youtubeFetch = async () => {
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
  };

  useEffect(() => {
    youtubeFetch();
  }, []);

  return (
    <div className='YoutubePeed-container'>
      <div className='YoutubePeed-titleBox'>
        <h1 className='YoutubePeed-title'>Fashion Trend</h1>
        <AiOutlinePlus fontSize={30} color='#fff' />
      </div>
      <Slider {...settings}>
        {videoData.map((video) => {
          return (
            <Videoitem
              key={video.id.videoId}
              video={video}
              setOpen={setOpen}
              setCurrentVideo={setCurrentVideo}
            />
          );
        })}
      </Slider>

      {open === true ? (
        <CurrentVideo
          setOpen={setOpen}
          allVideo={videoData}
          currentVideo={currentVideo}
        />
      ) : null}
    </div>
  );
};

export default YoutubePeed;
