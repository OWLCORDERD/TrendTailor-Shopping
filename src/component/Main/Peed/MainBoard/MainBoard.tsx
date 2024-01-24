import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { slideType } from "app/page";

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

export interface slidePropsType {
  slideDB: slideType[];
}

const MainBoard: any = async ({ slideDB }: slidePropsType) => {
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
