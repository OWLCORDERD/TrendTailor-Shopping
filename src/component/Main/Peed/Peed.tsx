import React from "react";
import "styles/peed.scss";
import ClothesPeed from "./ClothesPeed";
import YoutubePeed from "component/Main/Peed/Youtube/YoutubePeed";
import MainBoard from "./MainBoard/MainBoard";
import SeasonPeed from "./SeasonPeed";
import { NoticeType } from "app/notice/page";

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

export interface seasonType {
  month: number;
  season: string;
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

const noticeFetch = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`,
    {
      cache: "no-store",
    }
  );

  if (res.ok) {
    const data = await res.json();

    return data.data;
  }
};

const Peed = async () => {
  const noticeDB: NoticeType[] = await noticeFetch();

  return (
    <section className='MainPeed-container'>
      <div className='MainPeed-wrapper'>
        <MainBoard noticeDB={noticeDB} />
        <div className='Peed-wrapper'>
          <SeasonPeed />
          <YoutubePeed />
          <ClothesPeed />
        </div>
      </div>
    </section>
  );
};

export default Peed;
