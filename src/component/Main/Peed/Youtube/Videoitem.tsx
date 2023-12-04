import React, { useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { videoType } from "../Peed";

interface videoProps {
  video: videoType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<videoType | null>>;
  open: boolean;
}

const Videoitem = ({ video, setOpen, setCurrentVideo, open }: videoProps) => {
  const viewVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpen(true);

    setCurrentVideo(video);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (open === true) {
      if (body) {
        body.style.overflow = "hidden";
      }
    } else {
      if (body) {
        body.style.overflow = "auto";
      }
    }
  }, [open]);

  return (
    <>
      <div className='video-item'>
        <div className='video-thumbnail'>
          <img src={video.snippet.thumbnails.high.url} alt='thumbnail' />
          <button
            type='button'
            className='hover-playButton'
            onClick={(e) => viewVideo(e)}
          >
            <AiFillPlayCircle className='play-button' color={"#fff"} />
          </button>
        </div>

        <div className='video-content'>
          <div className='video-title'>
            <h2>{video.snippet.title}</h2>
          </div>
          <div className='video-channel'>
            <span>{video.snippet.channelTitle}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Videoitem;
