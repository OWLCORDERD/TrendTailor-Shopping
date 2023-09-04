"use client";

import { useEffect, useRef } from "react";
import "styles/about.scss";
import gsap from "gsap";
import AboutSection from "component/About/AboutSection";
import Banner from "component/Main/Banner";

export default function page() {
  return (
    <main className='main'>
      <AboutSection />
    </main>
  );
}
