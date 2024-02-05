import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { slideType } from "../Peed";
import { NoticeType } from "app/notice/page";

interface PeedFetchPropsType {
  slideDB: slideType[];
  noticeDB: NoticeType[];
}

const MainBoard = async ({ slideDB, noticeDB }: PeedFetchPropsType) => {
  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      <NoticeBoard noticeDB={noticeDB} />
    </div>
  );
};

export default MainBoard;
