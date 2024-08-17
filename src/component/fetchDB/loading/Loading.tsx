"use client";

import React from "react";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../../../../context/ThemeContext";
import "styles/loading.scss";

const Loading = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <div className='loading-container'>
      <RotatingLines
        strokeColor={mode === "dark" ? "#fff" : "#000"}
        strokeWidth='3'
        animationDuration='0.75'
        width='50'
        visible={true}
      />
    </div>
  );
};

export default Loading;
