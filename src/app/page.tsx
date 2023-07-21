"use client";

import { useEffect, useRef } from "react";
import Peed from "component/Main/Peed/Peed";
import About from "component/Main/About";
import "./page.module.css";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { SessionProvider } from "next-auth/react";
import Navbar from "component/Main/Navbar";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  const AboutRef = useRef<HTMLDivElement>(null);

  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(".content-title", {
      opacity: 0,
      scrollTrigger: {
        trigger: AboutRef.current,
        start: "-100% top",
        end: "top center",
        scrub: true,
      },
    });

    gsap.to(slideRef.current, {
      xPercent: -100,
      x: () => window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: AboutRef.current,
        start: "top top",
        end: () => `+=${window.innerWidth}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <SessionProvider>
      <main className='main'>
        <Navbar />
        <About aboutRef={AboutRef} slideRef={slideRef} />
        <Peed />
      </main>
    </SessionProvider>
  );
}
