import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { commonService } from "component/fetchDB";

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
  try {
    const res = await commonService.getMainSlider();

    return res;
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
