import React from "react";
import "styles/skeleton.scss";

interface videoId {
  key: string;
}
const Skeleton = ({ key }: videoId) => {
  return (
    <div className='Skeleton-video' key={key}>
      <div className='Skeleton-thumbnail'></div>

      <div className='Skeleton-infoBox'>
        <div className='Skeleton-title'></div>
        <div className='Skeleton-channel'></div>
      </div>
    </div>
  );
};

export default Skeleton;
