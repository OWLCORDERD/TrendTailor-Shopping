import React from "react";
import Megazine from "./Megazine";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";

const MainBoard = () => {
  return (
    <div className='MainPage-Board'>
      <NoticeBoard />
      <Megazine />
    </div>
  );
};

export default MainBoard;
