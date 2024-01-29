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

const YoutubePeed = () => {
  const [videoData, setVideoData] = useState<videoType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);

  const getYoutubeDB = () => {
    const youtubeAPI = "https://www.googleapis.com/youtube/v3/search";
    axios
      .get(
        `${youtubeAPI}?part=snippet&maxResults=20&channelId=UC8a6z7i9qypp9PqJ_0HhBrw&type=video&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
      .then((res) => res.data)
      .then((data) => setVideoData(data.items));
  };

  useEffect(() => {
    getYoutubeDB();
  }, []);

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
        {!loading ? (
          <Slider {...settings}>
            {videoData.map((video) => {
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
        ) : (
          <div className='YoutubePeed-loading'>
            <Oval
              visible={true}
              height='50'
              width='50'
              color='#000'
              secondaryColor='#fff'
              ariaLabel='oval-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        )}

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
