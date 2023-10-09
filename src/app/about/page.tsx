"use client";

import "styles/about.scss";
import AboutSection from "component/About/AboutSection";
import Navbar from "component/Main/Navbar";
import Footer from "component/Main/Footer";

export default function page() {
  return (
    <main className='main'>
      <Navbar />
      <AboutSection />
      <Footer />
    </main>
  );
}
