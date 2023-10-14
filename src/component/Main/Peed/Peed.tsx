import React from "react";
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

export interface seasonType {
  month: number;
  season: string;
}

async function getClothesDB() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/clothes`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("not connect clothes db");
  }

  return res.json();
}

async function getSeasonDB() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/season`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("not connect season db");
  }

  return res.json();
}

const Peed: any = async () => {
  const clothesDB = await getClothesDB();

  const seasonDB = await getSeasonDB();

  return (
    <section className='MainPeed-container'>
      <div className='MainPeed-wrapper'>
        <MainBoard />
        <div className='Peed-wrapper'>
          <SeasonPeed clothesDB={clothesDB} seasonDB={seasonDB} />
          <YoutubePeed />
        </div>
      </div>
    </section>
  );
};

export default Peed;
