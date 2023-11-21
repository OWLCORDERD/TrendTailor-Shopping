import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import axios from "axios";
import Banner from "./Banner";

/*
export async function NoticeFetch() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`,
    {
      params: { selectLimit: "limit" },
    }
  );

  return res.data;
}
*/

export async function SlideDBFetch() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/mainSlider`,
    {
      cache: "no-store",
    }
  );

  if (res.ok) {
    const dummyData = await res.json();

    return dummyData;
  }

  return new Error("Fetch Failed");
}

const MainBoard: any = async () => {
  /*
  const noticeDB = await NoticeFetch();
  */
  const slideDB = await SlideDBFetch();

  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB.data} />
      {/*
      <NoticeBoard noticeDB={noticeDB.data} />
      */}
    </div>
  );
};

export default MainBoard;
