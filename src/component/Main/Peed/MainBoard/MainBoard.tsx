import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import axios from "axios";
import Banner from "./Banner";
import mysql2 from "mysql2/promise";

/*
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
*/

export async function SlideDBFetch() {
  const res = await fetch(`${process.env.MYSQL_HOST}/wishMainSlider`, {
    cache: "no-store",
  });

  try {
    if (res.ok) {
      const data = res.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

const MainBoard: any = async () => {
  const slideDB = await SlideDBFetch();

  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      {/*
      <NoticeBoard />
      */}
    </div>
  );
};

export default MainBoard;
