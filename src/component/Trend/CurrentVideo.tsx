import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "styles/currentVideo.scss";
import { videoType } from "app/trend/page";
import { motion } from "framer-motion";
import Image from "next/image";

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
  /*currentVideo-wrap Framer Motion Animation */
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

  /*currentVideo-wrap 내부에 있는 video 영역 Framer Motion Animation */
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

  /*Trend page VideoList의 비디오 아이템을 클릭하여 넘겨받은 props currentVideo 값을
  selectVideoData 상태값에 저장 (비디오를 선택할 때, selectVideo 데이터 값을 변경시키기 위해서)*/
  const [selectVideoData, setselectVideoData] = useState<videoType | null>(
    currentVideo
  );

  const [iframeSrc, setIframeSrc] = useState<string>("");

  /* currentVideo Component가 마운트 되어 props값을 selectVideoData에 업데이트하거나,
  비디오를 선택 할때마다 해당 useEffect 로직이 실행되어 iframe src경로를 생성하여 iframeSrc 상태값 저장*/
  useEffect(() => {
    const update_src = `https://www.youtube.com/embed/${selectVideoData?.id.videoId}`;

    setIframeSrc(update_src);
  }, [selectVideoData]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.overflow = "hidden";
    }

    return () => {
      if (body) {
        body.style.removeProperty("overflow");
      }
    };
  }, []);

  /* 자식 VideoList-Container 영역의 비디오 리스트 중 비디오를 클릭 할 시에
  selectVideoData state에 저장된 currentVideo 값을 클릭한 비디오로 업데이트하면서
  해당 currentRef 요소인 CurrentVideo-container의 상단으로 스크롤 위치 이동시킴 */
  const currentRef = useRef<HTMLDivElement>(null);

  const viewVideo = (e: React.MouseEvent<HTMLDivElement>, video: videoType) => {
    e.preventDefault();

    setselectVideoData(video);

    if (currentRef.current) {
      currentRef.current.scrollTo(0, 0);
    }
  };

  const closeBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpen(false);
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
              frameBorder={0}
              src={iframeSrc}
              title='YouTube video player'
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
                        <Image
                          width='250'
                          height='150'
                          src={video.snippet.thumbnails.high.url}
                          alt={`${video.snippet.title} 영상 썸네일`}
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
