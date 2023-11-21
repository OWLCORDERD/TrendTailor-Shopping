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

export async function getClothesDB() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/clothes`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("not connect clothes db");
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
    throw new Error("not connect season db");
  }

  const { data } = await res.json();

  return data;
}

const Peed = async () => {
  const clothesDB: clothes[] = await getClothesDB();
  const seasonDB: seasonType[] = await getSeasonDB();

  return (
    <section className='MainPeed-container'>
      <div className='MainPeed-wrapper'>
        <MainBoard />
        <div className='Peed-wrapper'>
          <SeasonPeed seasonDB={seasonDB} clothesDB={clothesDB} />
          <YoutubePeed />
          <ClothesPeed clothesDB={clothesDB} />
        </div>
      </div>
    </section>
  );
};

export default Peed;
