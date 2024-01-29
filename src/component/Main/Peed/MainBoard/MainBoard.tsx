import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { NoticeType } from "app/notice/page";

interface DBPropsType {
  noticeDB: NoticeType[];
}

const MainBoard: any = async ({ noticeDB }: DBPropsType) => {
  return (
    <div className='MainPage-Board'>
      <Banner />
      <NoticeBoard noticeDB={noticeDB} />
    </div>
  );
};

export default MainBoard;
