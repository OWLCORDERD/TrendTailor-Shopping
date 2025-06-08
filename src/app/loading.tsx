"use client";

import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../../context/ThemeContext";
import { Loading as CSS } from "styles";

const Loading = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <CSS.PageContainer>
      <RotatingLines
        strokeColor={mode === "dark" ? "#fff" : "#000"}
        strokeWidth='3'
        animationDuration='0.75'
        width='50'
        visible={true}
      />
    </CSS.PageContainer>
  );
};

export default Loading;
