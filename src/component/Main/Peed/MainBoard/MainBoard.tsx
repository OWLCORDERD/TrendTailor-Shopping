import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { slideType } from "app/page";
import mysql2 from "mysql2/promise";
import { NoticeType } from "app/notice/page";

const noticeFetch = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/limitNotice`);

  if (!res.ok) {
    console.log(res);
  }

  const data = await res.json();

  return data;
};

export interface slidePropsType {
  slideDB: slideType[];
}

const MainBoard: any = async ({ slideDB }: slidePropsType) => {
  const noticeDB = await noticeFetch();

  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      <NoticeBoard noticeDB={noticeDB} />
    </div>
  );
};

export default MainBoard;
