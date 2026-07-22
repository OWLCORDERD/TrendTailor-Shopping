"use client";

import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../../context/ThemeContext";
import { Loading as CSS } from "styles";

const Loading = () => {
  return (
    <CSS.PageContainer>
      <RotatingLines
        strokeColor={"#fff"}
        strokeWidth='3'
        animationDuration='0.75'
        width='60'
        visible={true}
      />
    </CSS.PageContainer>
  );
};

export default Loading;
