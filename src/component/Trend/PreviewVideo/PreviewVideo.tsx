import React, { useState } from "react";
import { PreviewVideo as CSS } from "styles";
import { motion } from "framer-motion";

interface activeVideoProps {
  currentVideo: string;
  currentIndex: number;
}

const containerAnimation = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,

    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

const PreviewVideo = ({ currentVideo, currentIndex }: activeVideoProps) => {
  const videoSrc = `https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1&controls=0`;
  return (
    <>
      <CSS.Container
        key={currentIndex}
        as={motion.div}
        variants={containerAnimation}
        animate='animate'
        initial='initial'
      >
        <iframe
          src={videoSrc}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      </CSS.Container>
    </>
  );
};

export default PreviewVideo;
