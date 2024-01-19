import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "styles/currentVideo.scss";
import { videoType } from "../Peed";
import { motion } from "framer-motion";

interface currentIdPropsType {
  currentVideo: videoType | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allVideo: videoType[] | null;
  open: boolean;
}

const CurrentVideo = ({
  currentVideo,
  setOpen,
  allVideo,
}: currentIdPropsType) => {
  const currentRef = useRef<HTMLDivElement>(null);

  const openAnimate = {
    initial: {
      opacity: 0,
    },

    animate: {
      opacity: 1,

      transition: {
        duration: 1,
      },
    },
  };

  const openCurrentVideo = {
    initial: {
      opacity: 0,
    },

    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1,
      },
    },
  };
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

    if (currentRef.current) {
      currentRef.current.scrollTo(0, 0);
    }
  };
  return (
    <div className='CurrentVideo-container' ref={currentRef}>
      <motion.div
        className='CurrentVideo-wrap'
        variants={openAnimate}
        animate='animate'
        initial='initial'
      >
        <button
          type='button'
          className='close-button'
          onClick={(e) => closeBtn(e)}
        >
          <AiOutlineClose color={"#fff"} />
        </button>
        <motion.div className='Current-video' variants={openCurrentVideo}>
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
        </motion.div>

        <motion.div className='VideoList-container' variants={openCurrentVideo}>
          <div className='Video-ListBox'>
            {allVideo
              ? allVideo.map((video) => {
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
                })
              : null}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CurrentVideo;
