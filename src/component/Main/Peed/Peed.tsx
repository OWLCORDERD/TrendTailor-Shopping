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

export interface slideType {
  id: number;
  image: string;
  title: string;
  info: string;
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

const fetchSlideDB = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/wishMainSlider`, {
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();

    return data;
  }

  return new Error("not connect to slide DB");
};

const fetchNoticeDB = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/limitNotice`, {
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();

    return data;
  }

  return new Error("not connect to limit Notice DB");
};

const youtubeFetch = async () => {
  const youtubeAPI = "https://www.googleapis.com/youtube/v3/search";

  const res = await fetch(
    `${youtubeAPI}?part=snippet&maxResults=20&channelId=UC8a6z7i9qypp9PqJ_0HhBrw&type=video&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    {
      cache: "no-store",
    }
  );

  if (res.ok) {
    const data = await res.json();

    return data.items;
  }
};

const Peed = async () => {
  const youtubeDB: videoType[] = await youtubeFetch();
  const slideDB: slideType[] = await fetchSlideDB();
  const noticeDB: NoticeType[] = await fetchNoticeDB();

  return (
    <section className='MainPeed-container'>
      <div className='MainPeed-wrapper'>
        <MainBoard noticeDB={noticeDB} slideDB={slideDB} />
        <div className='Peed-wrapper'>
          <SeasonPeed />
          <YoutubePeed youtubeDB={youtubeDB} />
          <ClothesPeed />
        </div>
      </div>
    </section>
  );
};

export default Peed;
