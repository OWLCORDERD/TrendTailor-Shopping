import React, { useRef, useEffect } from "react";
import NewsSlider from "./NewsSlider";
import "styles/peed.scss";
import SeasonPeed from "./SeasonPeed";
import YoutubePeed from "component/Main/Peed/YoutubePeed";
import MainBoard from "./MainBoard/MainBoard";

export interface clothes {
  type: string;
  title: string;
  link: string;
  image: string;
  price: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

const Peed = (): JSX.Element => {
  return (
    <section className='MainPeed-container'>
      <div className='MainPeed-wrapper'>
        <div className='Notice-wrapper'>
          <NewsSlider />
          <MainBoard />
        </div>
        <div className='Peed-wrapper'>
          <SeasonPeed />
          <YoutubePeed />
        </div>
      </div>
    </section>
  );
};

export default Peed;
