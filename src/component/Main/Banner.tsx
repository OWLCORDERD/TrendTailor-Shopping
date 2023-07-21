import React from "react";
import "styles/banner.scss";
import Image from "next/image";

const Banner = () => {
  return (
    <article className='Banner-container'>
      <div className='Introduce-Banner'>
        <div className='Introduce-contentBox'>
          <div className='Static-Welcome'>
            <h1>welcome to wish</h1>
          </div>

          <div className='Introduce-content'>
            <div className='Dynamic-contentBox'>
              <div className='Dynamic-bracket'>
                <span>[</span>
                <span>]</span>
              </div>
              <ul className='Dynamic-content'>
                <li>
                  <h2>search</h2>
                </li>
                <li>
                  <h2>season</h2>
                </li>
                <li>
                  <h2>youtube</h2>
                </li>
                <li>
                  <h2>shared</h2>
                </li>
              </ul>
            </div>

            <div className='Static-content'>
              <p>clothes trand</p>
            </div>
          </div>
        </div>

        <div className='rotate-scroll'>
          <Image
            src='/images/scroll.png'
            alt='scrollImg'
            width={200}
            height={200}
          />

          <div className='scroll-text'>
            <span>Scroll</span>
          </div>
        </div>
      </div>

      <div className='Banner-ImgBox'>
        <video src='./sampleVideo/bannerVideo.mp4' muted loop autoPlay />
      </div>
    </article>
  );
};

export default Banner;
