"use client";

import "styles/about.scss";
import AboutSection from "component/About/AboutSection";
import Navbar from "component/Main/Navbar";
import Footer from "component/Main/Footer";
import { useEffect, useState } from "react";
import Banner from "component/About/Banner";
import { Oval } from "react-loader-spinner";

export default function About() {
  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      setLoading(true);
    };
  }, []);
  return (
    <main className='main'>
      <Navbar />
      {loading === true ? (
        <div className='loading-container'>
          <Oval
            height={50}
            width={50}
            color='#000'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor='#fff'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <>
          <Banner current={current} setCurrent={setCurrent} loading={loading} />
          <AboutSection />
        </>
      )}
      <Footer />
    </main>
  );
}
