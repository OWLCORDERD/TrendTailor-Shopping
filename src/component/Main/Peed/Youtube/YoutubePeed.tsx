"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import Slider from "react-slick";
import Videoitem from "./Videoitem";
import "styles/youtubePeed.scss";
import "styles/slick/slick.css";
import SlideNext from "component/slideButton/SlideNext";
import SlideBefore from "component/slideButton/SlideBefore";
import { AiOutlinePlus } from "react-icons/ai";
import CurrentVideo from "./CurrentVideo";
import { videoType } from "../Peed";
import axios from "axios";
import { Oval } from "react-loader-spinner";

interface peedPropsType {
  youtubeDB: videoType[];
}

const YoutubePeed = ({ youtubeDB }: peedPropsType) => {
  const [videoData, setVideoData] = useState<videoType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);

  useEffect(() => {
    if (videoData) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [videoData]);

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
          {youtubeDB.map((video) => {
            return (
              <Videoitem
                key={video.id.videoId}
                video={video}
                setOpen={setOpen}
                setCurrentVideo={setCurrentVideo}
                open={open}
              />
            );
          })}
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
