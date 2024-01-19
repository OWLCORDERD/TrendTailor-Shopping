"use client";

import React, { SetStateAction, useState } from "react";
import Slider from "react-slick";
import Videoitem from "./Videoitem";
import "styles/youtubePeed.scss";
import "styles/slick/slick.css";
import SlideNext from "component/slideButton/SlideNext";
import SlideBefore from "component/slideButton/SlideBefore";
import { AiOutlinePlus } from "react-icons/ai";
import CurrentVideo from "./CurrentVideo";
import { videoType } from "../Peed";

interface propsYoutubeDB {
  videoData: videoType[] | null;
}

const YoutubePeed = ({ videoData }: propsYoutubeDB) => {
  const [open, setOpen] = useState<boolean>(false);

  const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);

  /*
  const videoData: videoType[] = [
    {
      id: {
        kind: "video",
        videoId: "1",
      },
      snippet: {
        channelId: "1",
        channelTitle: "크리스마스 캐롤 송",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/yrU3ac44mWQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASvsu_CTkbK4VPcT3IfS6ah-ThDg",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "2",
      },
      snippet: {
        channelId: "2",
        channelTitle: "QWER OUR STAGE",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/Ieb8IOiFfhk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC5sGOPZcOWUtuDSqrs2ynhrZH58w",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "3",
      },
      snippet: {
        channelId: "3",
        channelTitle:
          "너와 맞잡고 있었던 핫팩처럼 겨울에 들으려고 모아둔 따뜻한 노래",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "4",
      },
      snippet: {
        channelId: "4",
        channelTitle: "크리스마스 캐롤 송",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/yrU3ac44mWQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASvsu_CTkbK4VPcT3IfS6ah-ThDg",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "5",
      },
      snippet: {
        channelId: "5",
        channelTitle: "QWER OUR STAGE",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/Ieb8IOiFfhk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC5sGOPZcOWUtuDSqrs2ynhrZH58w",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "6",
      },
      snippet: {
        channelId: "6",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
  ];
  */

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

  return (
    <>
      <div className='YoutubePeed-container'>
        <div className='YoutubePeed-titleBox'>
          <h1 className='YoutubePeed-title'>Fashion Trend</h1>
          <AiOutlinePlus fontSize={30} color='#fff' />
        </div>
        <Slider {...settings}>
          {videoData !== null
            ? videoData.map((video) => {
                return (
                  <Videoitem
                    key={video.id.videoId}
                    video={video}
                    setOpen={setOpen}
                    setCurrentVideo={setCurrentVideo}
                    open={open}
                  />
                );
              })
            : null}
        </Slider>

        {open === true ? (
          <CurrentVideo
            setOpen={setOpen}
            allVideo={videoData}
            currentVideo={currentVideo}
            open={open}
          />
        ) : null}
      </div>
    </>
  );
};

export default YoutubePeed;
