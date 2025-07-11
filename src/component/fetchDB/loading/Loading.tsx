"use client";

import React from "react";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../../../../context/ThemeContext";
import { Loading as CSS } from "styles";

const Loading = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <CSS.ContentsContainer>
      <RotatingLines
        strokeColor={mode === "dark" ? "#fff" : "#000"}
        strokeWidth='3'
        animationDuration='0.75'
        width='50'
        visible={true}
      />
    </CSS.ContentsContainer>
  );
};

export default Loading;
