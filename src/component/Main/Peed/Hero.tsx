"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { MainBanner as CSS } from "styles";
import "@/styles/hero.scss";
import {
  drawForceGraph,
  keywordSampleClothes,
} from "@/store/simulationInstance";

const Hero = () => {
  const selector = useAppSelector((state) => state.simulation.keywordGraphRoot);
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    dispatch(keywordSampleClothes());
  }, [dispatch]);

  useEffect(() => {
    if (!selector) return;
    dispatch(drawForceGraph(selector));
  }, [selector, dispatch]);
  return (
    <>
      <CSS.Container>
        <CSS.Index>
          <CSS.Title>TrendTailor</CSS.Title>
          <CSS.Subtitle>
            ONLY YOUR STYLE, <br />
            tailored by trend
          </CSS.Subtitle>
        </CSS.Index>

        {/* 스타일 키 포인트 시뮬레이션 백터 그래픽 아키텍처 */}
        <div className='keypoint-simulation' />
      </CSS.Container>
    </>
  );
};

export default Hero;
