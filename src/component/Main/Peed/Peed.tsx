import React from "react";
import "styles/peed.scss";
import ClothesPeed from "./ClothesPeed";
import YoutubePeed from "component/Main/Peed/Youtube/YoutubePeed";
import MainBoard from "./MainBoard/MainBoard";
import SeasonPeed from "./SeasonPeed";
import { NoticeType } from "app/notice/page";
import mysql2 from "mysql2/promise";

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
  let connection = null;

  if (connection === null) {
    connection = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      user: "Owlcoderd",
      password: process.env.MYSQL_PASSWORD,
      database: "wish",
      port: 3306,
    });
  }

  try {
    const query = "select * from notice ORDER BY date DESC LIMIT 5";

    const [data] = await connection.execute(query);

    return data;
  } catch (err) {
    console.log(err);
  }
};

const Peed = async () => {
  const noticeDB: NoticeType[] | any = await noticeFetch();

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
