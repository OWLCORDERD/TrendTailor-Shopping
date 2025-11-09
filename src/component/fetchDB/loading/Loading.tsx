"use client";

import React, { useMemo } from "react";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../../../../context/ThemeContext";
import { Loading as CSS } from "styles";

interface LoadingProps {
  colorTheme?: string;
}

const Loading: React.FC<LoadingProps> = ({ colorTheme }) => {
  const { mode } = useContext(ThemeContext);

  const colorRGB = useMemo(() => {
    if (!colorTheme) {
      if (mode === "dark") {
        return "#000";
      } else {
        return "#fff";
      }
    } else {
      return colorTheme;
    }
  }, [colorTheme, mode]);

  return (
    <CSS.ContentsContainer>
      <RotatingLines
        strokeColor={colorRGB}
        strokeWidth='3'
        animationDuration='0.75'
        width='50'
        visible={true}
      />
    </CSS.ContentsContainer>
  );
};

export default Loading;
