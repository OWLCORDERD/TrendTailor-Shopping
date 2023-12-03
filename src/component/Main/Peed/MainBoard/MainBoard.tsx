import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import axios from "axios";
import Banner from "./Banner";

export async function NoticeFetch() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`
  );

  if (!res.ok) {
    return new Error("not connection Notice DB");
  }

  const { data } = await res.json();

  return data;
}

export async function SlideDBFetch() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/mainSlider`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return new Error("not connection slide DB");
  }

  const { data } = await res.json();

  return data;
}

const MainBoard: any = async () => {
  const noticeDB = await NoticeFetch();
  const slideDB = await SlideDBFetch();

  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      <NoticeBoard noticeDB={noticeDB} />
    </div>
  );
};

export default MainBoard;
