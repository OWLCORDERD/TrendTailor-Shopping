import React from "react";
import Megazine from "./Megazine";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import axios from "axios";

export async function NoticeFetch() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`,
    {
      params: { selectLimit: "limit" },
    }
  );

  return res.data;
}

const MainBoard: any = async () => {
  const noticeDB = await NoticeFetch();

  return (
    <div className='MainPage-Board'>
      <NoticeBoard noticeDB={noticeDB.data} />
      <Megazine />
    </div>
  );
};

export default MainBoard;
