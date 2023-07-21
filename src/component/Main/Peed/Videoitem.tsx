import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { clothes } from "component/Main/Peed/SeasonPeed";
import CurrentVideo from "./CurrentVideo";
import { videoType } from "./YoutubePeed";

interface videoProps {
  video: videoType;
  videoItemRef: React.ForwardedRef<HTMLDivElement>;
  videoData: videoType[];
}

const Videoitem = ({ video, videoItemRef, videoData }: videoProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const viewVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setOpen(!open);
  };

  return (
    <>
      <div className='video-item' ref={videoItemRef}>
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
      {open === true ? (
        <CurrentVideo
          currentVideo={video}
          setOpen={setOpen}
          allVideo={videoData}
        />
      ) : null}
    </>
  );
};

export default Videoitem;
