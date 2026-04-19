import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "styles/currentVideo.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import Loading from "../common/Loading";

interface currentIdPropsType {
  currentVideo: videoType | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allVideo: videoType[] | [];
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

  // 현 비디오 외의 비디오 목록
  const [pagination, setPagination] = useState({
    perPage: 5,
    currentPage: 1,
    totalCount: 0,
    totalPage: allVideo.length / 5,
  });

  const paginationRef = useRef<HTMLDivElement | null>(null);

  const [currentPageList, setCurrentPageList] = useState<any>([]);

  // 현재 선택한 영상을 제외한 나머지 컨설턴트 영상 목록

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

  useEffect(() => {
    if (pagination.currentPage > 1) {
      const startIndex = (pagination.currentPage - 1) * pagination.perPage;
      const endIndex = startIndex + pagination.perPage;

      const newVideos = allVideo.slice(startIndex, endIndex);

      setCurrentPageList([...currentPageList, ...newVideos]);
    }

    if (pagination.currentPage >= pagination.totalPage) {
      if (paginationRef.current) {
        paginationRef.current.style.display = "none";
      }
    }
  }, [pagination.currentPage]);

  useEffect(() => {
    if (currentVideo?.id.videoId && allVideo.length > 0) {
      const filterCurrentVideo = allVideo.filter(
        (video) => video.id.videoId !== currentVideo?.id.videoId
      );

      setPagination((prev) => ({
        ...prev,
        totalCount: filterCurrentVideo.length,
        totalPage: Math.ceil(filterCurrentVideo.length / prev.perPage),
      }));

      setCurrentPageList(filterCurrentVideo.slice(0, pagination.perPage));
    }
  }, []);

  useEffect(() => {
    if (paginationRef.current) {
      const intersectionObserver: IntersectionObserver =
        new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setTimeout(() => {
              setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
              }));
            }, 500);
          }
        });

      intersectionObserver.observe(paginationRef.current);

      return () => {
        intersectionObserver.disconnect();
      };
    }
  }, [paginationRef.current]);

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
    <div className='video-container' ref={currentRef}>
      <motion.div
        className='container-wrapper'
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

        <motion.div className='current-player' variants={openCurrentVideo}>
          <div className='video-iframe'>
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

          <div className='video-cont'>
            <h2 className='video-title'>{selectVideoData?.snippet.title}</h2>
            <p className='video-channel'>
              {selectVideoData?.snippet.channelTitle}
            </p>
            <div className='video-desc'>
              <span>{selectVideoData?.snippet.description}</span>
            </div>
          </div>
        </motion.div>

        <motion.div className='video-list' variants={openCurrentVideo}>
          <>
            <div className='count'>
              <span className='total-count'>
                총 <strong>{pagination.totalCount}건</strong>
              </span>

              <span className='page-count'>
                {pagination.currentPage} / {pagination.totalPage} 페이지
              </span>
            </div>
            {currentPageList.length > 0
              ? currentPageList.map((video: any) => {
                  return (
                    <div
                      className='video-item'
                      key={video.id.videoId}
                      onClick={(e) => viewVideo(e, video)}
                      role='presentation'
                    >
                      <div className='video-thumbnail'>
                        <Image
                          width='250'
                          height='150'
                          src={video.snippet.thumbnails.high.url}
                          alt={`${video.snippet.title} 영상 썸네일`}
                        />
                      </div>

                      <div className='video-cont'>
                        <h2 className='video-title'>{video.snippet.title}</h2>
                        <span className='video-channel'>
                          {video.snippet.channelTitle}
                        </span>
                      </div>
                    </div>
                  );
                })
              : null}

            <div className='pagination' ref={paginationRef}>
              <Loading colorTheme={"#fff"} />
            </div>
          </>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CurrentVideo;
