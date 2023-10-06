import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "styles/currentVideo.scss";
import { videoType } from "./YoutubePeed";

interface currentIdPropsType {
  currentVideo: videoType | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allVideo: videoType[];
}

const CurrentVideo = ({
  currentVideo,
  setOpen,
  allVideo,
}: currentIdPropsType) => {
  const [selectVideoData, setselectVideoData] = useState<videoType | null>(
    currentVideo
  );

  const iframeSrc = `https://www.youtube.com/embed/${selectVideoData?.id.videoId}`;

  const closeBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpen(false);
  };

  const viewVideo = (e: React.MouseEvent<HTMLDivElement>, video: videoType) => {
    e.preventDefault();

    setselectVideoData(video);
  };
  return (
    <section className='CurrentVideo-container'>
      <div className='CurrentVideo-wrap'>
        <div className='Current-video'>
          <div className='Current-iframe'>
            <iframe
              width='560'
              height='315'
              src={iframeSrc}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </div>

          <div className='CurrentVideo-contentBox'>
            <h2 className='Video-title'>{selectVideoData?.snippet.title}</h2>
            <p className='Video-channel'>
              {selectVideoData?.snippet.channelTitle}
            </p>
            <div className='Video-description'>
              <span>{selectVideoData?.snippet.description}</span>
            </div>
          </div>
        </div>

        <div className='VideoList-container'>
          <button
            type='button'
            className='close-button'
            onClick={(e) => closeBtn(e)}
          >
            <AiOutlineClose color={"#fff"} />
          </button>

          <div className='Video-ListBox'>
            {allVideo.map((video) => {
              return (
                <div
                  className='videoList-item'
                  key={video.id.videoId}
                  onClick={(e) => viewVideo(e, video)}
                  role='presentation'
                >
                  <div className='video-imgBox'>
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt='videoImg'
                    />
                  </div>

                  <div className='video-contentBox'>
                    <h2 className='video-title'>{video.snippet.title}</h2>
                    <span className='video-channel'>
                      {video.snippet.channelTitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentVideo;
