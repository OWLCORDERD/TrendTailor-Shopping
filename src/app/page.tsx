"use client";

import Navbar from "component/Main/Navbar";
import Peed from "component/Main/Peed/Peed";
import "./page.module.css";
import { useEffect, useRef } from "react";
import Footer from "component/Main/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='main'>
        <Peed />
      </main>
      <Footer />
    </>
  );
}
