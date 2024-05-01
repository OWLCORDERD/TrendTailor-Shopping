import React from "react";
import ClothesPeed from "./ClothesPeed";
import MainBoard from "./MainBoard/MainBoard";
import SeasonPeed from "./SeasonPeed";

export interface clothes {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
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

export interface videoType {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    title: string;
  };
}

const Peed = async () => {
  return (
    <section className='MainPeed-container'>
      <MainBoard />
      <div className='Peed-wrapper'>
        <SeasonPeed />
        <ClothesPeed />
      </div>
    </section>
  );
};

export default Peed;
