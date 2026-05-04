import React, { useContext, useEffect, useRef } from "react";
import Hero from "../../Hero";
import TrendTailorAI from "../../TrendTailorAI";
import { TimelineContext } from "../../../../../../context/TimelineContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Inner = () => {
  const gsapContext = useRef(null);

  const { updateActiveIndex } = useContext(TimelineContext);

  gsap.registerPlugin(ScrollTrigger);

  const updateFnRef = useRef(updateActiveIndex);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".timeline-section") as HTMLElement[];

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "center bottom",
          onToggle: (self) => {
            if (typeof updateFnRef.current === "function") {
              updateFnRef.current(Math.floor(self.progress));
            }
          },
        });
      });
    }, gsapContext);

    return () => {
      ctx.revert();
    };
  }, [updateActiveIndex]);
  return (
    <>
      {/* 타임라인 컨테이너 wrapper */}
      <div ref={gsapContext}>
        <Hero />
        <TrendTailorAI />
      </div>
    </>
  );
};

export default Inner;
