import React, { useRef, useEffect } from "react";
import NewsSlider from "./NewsSlider";
import "styles/peed.scss";
import SeasonPeed from "./SeasonPeed";
import YoutubePeed from "component/Main/Peed/YoutubePeed";
import Navbar from "../Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export interface NewsItemType {
  id: string;
  img_url: string;
  title: string;
  info: string;
}

const Peed = (): JSX.Element => {
  const peedRef = useRef<HTMLElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(".Navbar-container", {
      backgroundColor: "#000",
      transition: "all 0.5s ease-in",

      scrollTrigger: {
        trigger: peedRef.current,
        start: "110% top",
        end: "center bottom",
        scrub: true,
      },
    });
  }, [peedRef]);
  return (
    <section className='MainPeed-container' ref={peedRef}>
      <Navbar />
      <div className='MainPeed-wrapper'>
        <NewsSlider />
        <div className='Peed-wrapper'>
          <SeasonPeed />

          <YoutubePeed />
        </div>
      </div>
    </section>
  );
};

export default Peed;
