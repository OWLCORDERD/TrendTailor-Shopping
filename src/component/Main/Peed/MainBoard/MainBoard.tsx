import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { slideType } from "../Peed";

interface peedPropsType {
  slideDB: slideType[];
}

const MainBoard = ({ slideDB }: peedPropsType) => {
  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      <NoticeBoard />
    </div>
  );
};

export default MainBoard;
