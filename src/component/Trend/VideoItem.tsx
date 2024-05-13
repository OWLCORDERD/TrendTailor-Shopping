import { channelDataType } from "app/trend/page";
import { videoType } from "app/trend/page";
import Image from "next/image";
import React, { useState } from "react";
import PreviewVideo from "./PreviewVideo/PreviewVideo";
import { IoIosPlayCircle } from "react-icons/io";

interface videoItemProps {
  video: videoType;
  key: number;
  mobileMQuery: boolean;
  setVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channelData: channelDataType[];
  currentVideo: videoType | null;
  setCurrentVideo: React.Dispatch<React.SetStateAction<videoType | null>>;
}

const VideoItem = ({
  key,
  video,
  mobileMQuery,
  setVideoOpen,
  setCurrentVideo,
  currentVideo,
  channelData,
}: videoItemProps) => {
  const viewVideo = (e: React.MouseEvent<SVGElement>, video?: videoType) => {
    e.preventDefault();

    setVideoOpen(true);

    if (video) {
      setCurrentVideo(video);
    }
  };

  const thumbnailVideoOpen = (video: videoType) => {
    setCurrentVideo(video);
  };

  const thumbnailVideoClose = () => {
    setCurrentVideo(null);
  };

  return (
    <>
      {mobileMQuery === true ? (
        <div className='Trend-video' key={key}>
          <div className='video-thumbnail'>
            <Image
              src={video.snippet.thumbnails.high.url}
              width={480}
              height={360}
              alt='video-image'
            />

            <div className='play-video'>
              <IoIosPlayCircle onClick={(e) => viewVideo(e, video)} />
            </div>
          </div>

          <div className='video-infoBox'>
            <div className='channel-img'>
              <Image
                src={channelData[0].snippet.thumbnails.high.url}
                width='100'
                height='100'
                alt={`${channelData[0].snippet.title} 채널 이미지`}
              />
            </div>
            <div className='title-channel'>
              <div className='video-title'>
                <h2>{video.snippet.title}</h2>
              </div>

              <div className='video-channel'>
                <span>{video.snippet.channelTitle}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='Trend-video'
          key={video.id.videoId}
          onMouseMove={() => thumbnailVideoOpen(video)}
          onMouseOut={() => thumbnailVideoClose()}
        >
          <div className='video-thumbnail' onClick={(e) => viewVideo(e)}>
            {currentVideo && currentVideo.id.videoId === video.id.videoId ? (
              <PreviewVideo
                currentVideo={currentVideo.id.videoId}
                currentIndex={key}
              />
            ) : (
              <Image
                src={video.snippet.thumbnails.high.url}
                width={480}
                height={360}
                alt='video-image'
              />
            )}
          </div>

          <div className='video-infoBox'>
            <div className='channel-img'>
              <Image
                src={channelData[0].snippet.thumbnails.high.url}
                width='100'
                height='100'
                alt={`${channelData[0].snippet.title} 채널 이미지`}
              />
            </div>
            <div className='title-channel'>
              <div className='video-title'>
                <h2>{video.snippet.title}</h2>
              </div>

              <div className='video-channel'>
                <span>{video.snippet.channelTitle}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoItem;
