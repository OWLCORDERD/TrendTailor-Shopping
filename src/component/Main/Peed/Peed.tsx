import React from "react";
import "styles/peed.scss";
import ClothesPeed from "./ClothesPeed";
import YoutubePeed from "component/Main/Peed/Youtube/YoutubePeed";
import MainBoard from "./MainBoard/MainBoard";
import SeasonPeed from "./SeasonPeed";

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

export interface peedFetchDBType {
  seasonDB: seasonType[];
  clothesDB: clothes[];
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

export async function getClothesDB() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/clothes`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return new Error("not connect clothes db");
  }

  const { data } = await res.json();

  return data;
}

export async function getSeasonDB() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/season`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return new Error("not connect season db");
  }

  const { data } = await res.json();

  return data;
}

export async function getYoutubeDB() {
  const youtubeAPI = "https://www.googleapis.com/youtube/v3/search";
  const res = await fetch(
    `${youtubeAPI}?part=snippet&maxResults=20&channelId=UC8a6z7i9qypp9PqJ_0HhBrw&type=video&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.log("not connection to YoutubeDB");
    return null;
  }

  const data = await res.json();

  return data.items;
}

const Peed = async () => {
  const clothesDB: clothes[] = await getClothesDB();
  const seasonDB: seasonType[] = await getSeasonDB();
  const youtubeDB: videoType[] | null = await getYoutubeDB();

  return (
    <section className='MainPeed-container'>
      <div className='MainPeed-wrapper'>
        <MainBoard />
        <div className='Peed-wrapper'>
          <SeasonPeed seasonDB={seasonDB} clothesDB={clothesDB} />
          <YoutubePeed videoData={youtubeDB} />
          <ClothesPeed clothesDB={clothesDB} />
        </div>
      </div>
    </section>
  );
};

export default Peed;
