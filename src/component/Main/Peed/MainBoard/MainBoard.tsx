import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { slideType } from "app/page";
import { NoticeType } from "app/notice/page";

interface DBPropsType {
  slideDB: slideType[];
  noticeDB: NoticeType[];
}

const MainBoard: any = async ({ slideDB, noticeDB }: DBPropsType) => {
  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      <NoticeBoard noticeDB={noticeDB} />
    </div>
  );
};

export default MainBoard;
