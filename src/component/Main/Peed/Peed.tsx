import React from "react";
import NewsSlider from "./NewsSlider";
import "styles/peed.scss";
import SeasonPeed from "./SeasonPeed";
import YoutubePeed from "component/Main/Peed/Youtube/YoutubePeed";
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

const Peed = () => {
  return (
    <section className='MainPeed-container'>
      <div className='MainPeed-wrapper'>
        <MainBoard />
        <div className='Peed-wrapper'>
          {/* @ts-expect-error Async Server Component */}
          <SeasonPeed />
          <YoutubePeed />
        </div>
      </div>
    </section>
  );
};

export default Peed;
