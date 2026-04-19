"use client";

import React, { useMemo } from "react";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../../../context/ThemeContext";
import { Loading as CSS } from "styles";

interface LoadingProps {
  colorTheme?: string;
  height?: number;
}

const Loading: React.FC<LoadingProps> = ({ colorTheme, height }) => {
  return (
    <CSS.ContentsContainer height={height}>
      <RotatingLines
        strokeColor={colorTheme ?? "#2D3A8C"}
        strokeWidth='3'
        animationDuration='0.75'
        width='50'
        visible={true}
      />
    </CSS.ContentsContainer>
  );
};

export default Loading;
