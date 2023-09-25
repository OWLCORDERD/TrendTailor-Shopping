import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { videoType } from "./YoutubePeed";

interface videoProps {
  video: videoType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<videoType | null>>;
}

const Videoitem = ({ video, setOpen, setCurrentVideo }: videoProps) => {
  const viewVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpen(true);

    setCurrentVideo(video);
  };

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
            <AiFillPlayCircle className='play-button' />
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
