"use client";

import React, { useContext, useEffect, useRef } from "react";
import { TimelineProvider as TlNavigatorProvider } from "../../../../../context/TimelineContext";
import Inner from "./section/Inner";

const Timeline = () => {
  return (
    <>
      {/* 타임라인 네비게이터 컨텍스트 */}
      <TlNavigatorProvider>
        <Inner />
      </TlNavigatorProvider>
    </>
  );
};

export default Timeline;
