import React from "react";
import "styles/skeleton.scss";

interface videoId {
  key: number;
}
const Skeleton = ({ key }: videoId) => {
  return (
    <div className='Skeleton-video' key={key}>
      <div className='Skeleton-thumbnail'></div>

      <div className='Skeleton-infoBox'>
        <div className='Skeleton-channelImg'></div>
        <div className='title-channel'>
          <div className='Skeleton-title'></div>
          <div className='Skeleton-channel'></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
