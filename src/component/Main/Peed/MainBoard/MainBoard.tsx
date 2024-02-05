import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";

const MainBoard = async () => {
  return (
    <div className='MainPage-Board'>
      <Banner />
      <NoticeBoard />
    </div>
  );
};

export default MainBoard;
