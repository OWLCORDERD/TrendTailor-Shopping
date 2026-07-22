"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MainBanner as CSS } from "styles";
import "@/styles/hero.scss";
// import {
//   currentKeywordDetailUpdate,
//   drawForceGraph,
//   keywordSampleClothes,
// } from "@/store/simulationInstance";
import KeywordPreview from "@/component/Main/Peed/KeywordPreview";
import { motion } from "framer-motion";

export interface drawForceGraphPayload {
  keywordGraphRoot: {
    children: any[];
    depth: number;
    id: number;
    name: string;
    type: string;
  }[];
  updateCurrentDetail?: (nodeDetail: any) => void;
}
const Hero = () => {
  // const keywordGraphRoot = useAppSelector(
  //   (state) => state.simulation?.keywordGraphRoot
  // );
  // const previewOpen = useAppSelector((state) => state.simulation.previewOpen);

  // const currentDetail = useAppSelector(
  //   (state) => state.simulation.currentDetail
  // );

  // const dispatch = useAppDispatch();
  // const [isMounted, setIsMounted] = useState<boolean>(false);

  // const ref = useRef<any>(null);

  // const graphRenderMotion = {
  //   initial: {
  //     opacity: 0,
  //     transform: "scale(0.8)",
  //   },
  //   animate: {
  //     opacity: 1,
  //     transform: "scale(1)",
  //     transition: {
  //       duration: 1,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // const updateCurrentDetail = useCallback(
  //   (nodeDetail: any) => {
  //     dispatch(currentKeywordDetailUpdate(nodeDetail));
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // useEffect(() => {
  //   dispatch(keywordSampleClothes());
  // }, [dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (ref.current === null && !previewOpen) {
  //       if (keywordGraphRoot !== null) {
  //         dispatch(
  //           drawForceGraph({
  //             keywordGraphRoot,
  //             updateCurrentDetail,
  //           } as drawForceGraphPayload)
  //         );
  //       }
  //     }
  //   }, 500);
  // }, [previewOpen, keywordGraphRoot, updateCurrentDetail, dispatch]);

  // useEffect(() => {
  //   if (!keywordGraphRoot) return;
  //   if (keywordGraphRoot === null) return;

  //   dispatch(
  //     drawForceGraph({
  //       keywordGraphRoot,
  //       updateCurrentDetail,
  //     } as drawForceGraphPayload)
  //   );
  // }, [keywordGraphRoot, updateCurrentDetail, dispatch]);
  return (
    <>
      <CSS.Container className='timeline-section'>
        <CSS.Index>
          <CSS.Title>TrendTailor</CSS.Title>
          <CSS.Subtitle>
            ONLY YOUR STYLE, <br />
            tailored by trend
          </CSS.Subtitle>
        </CSS.Index>

        {/* 스타일 키 포인트 시뮬레이션 백터 그래픽 아키텍처 */}
        {/* <motion.div
          variants={graphRenderMotion}
          initial='initial'
          animate='animate'
          className='keypoint-simulation'
        /> */}

        {/* {previewOpen &&
        currentDetail?.keyword &&
        currentDetail?.typeOfClothes ? (
          <div ref={ref}>
            <KeywordPreview />
          </div>
        ) : (
          <motion.div
            variants={graphRenderMotion}
            initial='initial'
            animate='animate'
            className='keypoint-simulation'
          />
        )} */}
      </CSS.Container>
    </>
  );
};

export default Hero;
