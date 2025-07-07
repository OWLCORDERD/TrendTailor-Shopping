import Image from "next/image";
import React, { useState } from "react";
import PreviewVideo from "./PreviewVideo/PreviewVideo";
import { IoIosPlayCircle } from "react-icons/io";

interface videoItemProps {
  video: videoType;
  key: number;
  mobileMQuery: boolean;
  setVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channelData: channelDataType[] | undefined;
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
  const viewVideo = (
    e: React.MouseEvent<SVGElement | HTMLDivElement>,
    video?: videoType
  ) => {
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
        <div className='trend-video' key={key}>
          <div className='video-thumbnail'>
            <Image
              src={video.snippet.thumbnails.high.url}
              width={480}
              height={360}
              alt={`${video.snippet.title} 썸네일 이미지`}
            />

            <div className='play-video'>
              <IoIosPlayCircle onClick={(e) => viewVideo(e, video)} />
            </div>
          </div>

          <div className='video-infoBox'>
            <div className='channel-img'>
              <Image
                src={channelData? channelData[0].snippet.thumbnails.high.url : ''}
                width='100'
                height='100'
                alt={`${channelData ? channelData[0].snippet.title : ''} 채널 이미지`}
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
          className='trend-video'
          key={video.id.videoId}
          onMouseMove={() => thumbnailVideoOpen(video)}
          onMouseOut={() => thumbnailVideoClose()}
        >
          <div className='video-thumbnail' onClick={(e) => viewVideo(e, video)}>
            {/* {currentVideo && currentVideo.id.videoId === video.id.videoId ? (
              <PreviewVideo
                currentVideo={currentVideo.id.videoId}
                currentIndex={key}
              /> */}
            <Image
              src={video.snippet.thumbnails.high.url}
              width={480}
              height={360}
              alt={`${video.snippet.title} 썸네일 이미지`}
            />
          </div>

          <div className='video-infoBox'>
            <div className='channel-img'>
              <Image
                src={channelData? channelData[0].snippet.thumbnails.high.url: ''}
                width='100'
                height='100'
                alt={`${channelData? channelData[0].snippet.title: ''} 채널 이미지`}
              />
            </div>
            <div className='title-channel'>
              <div className='video-title'>
                <span>{video.snippet.title}</span>
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
