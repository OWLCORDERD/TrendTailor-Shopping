"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Dashboard as CSS } from "@/styles";
import SystemLabel from "../ui/SystemLabel";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
// import {
//   currentKeywordDetailUpdate,
//   drawForceGraph,
//   keywordSampleClothes,
// } from "@/store/simulationInstance";
import { drawForceGraphPayload } from "../ui/Hero";
import "@/styles/hero.scss";
import KeywordPreview from "@/component/Main/Peed/KeywordPreview";
import * as generateTrendKeywordPipeline from "@/feature/trend/jobs/generate-keyword.jobs";
import { save, trendKeywordsType } from "@/feature/trend/repositories/trend.repository";

const KeywordMapGraph = () => {
  // const dummyData = [
  //   {
  //     id: 1,
  //     label: "블록코어",
  //     value: "120",
  //   },
  //   {
  //     id: 2,
  //     label: "블록코어",
  //     value: "120",
  //   },
  //   {
  //     id: 3,
  //     label: "블록코어",
  //     value: "120",
  //   },
  // ];

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

//   let SINGLE_FLIGHT = false;
//   useEffect(() => {
//     if (SINGLE_FLIGHT) return;

//     save(trendKeywords);
    
//     SINGLE_FLIGHT = true;

//     setTimeout(() => {
//       SINGLE_FLIGHT = false;
//     }, 500)
//   }, []);
  return (
    <>
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
          className='keyword-graph'
        />
      )} */}
    </>
  );
};

export default KeywordMapGraph;
