import React from "react";
import NoticeBoard from "./NoticeBoard";
import Banner from "./Banner";
import { NoticeType } from "app/notice/page";
import { collection, getDocs } from "firebase/firestore";
import { db } from "component/fetchDB/firebase";

export interface slideType {
  id: number;
  image: string;
  title: string;
  info: string;
}

const slideDBfetch = async () => {
  const querySnapShot = await getDocs(collection(db, "slide"));

  if (querySnapShot.empty) {
    return [];
  }

  const slideData: slideType[] = [];

  querySnapShot.forEach((doc) => {
    const docData = {
      id: doc.data()["id"],
      image: doc.data()["image"],
      title: doc.data()["title"],
      info: doc.data()["info"],
    };

    slideData.push(docData);
  });

  return slideData;
};

const noticeDBfetch = async () => {
  const querySnapShot = await getDocs(collection(db, "notice"));

  if (querySnapShot.empty) {
    return [];
  }

  const noticeData: NoticeType[] = [];

  querySnapShot.forEach((doc) => {
    const docData = {
      id: doc.id,
      title: doc.data()["title"],
      text: doc.data()["text"],
      writer: doc.data()["writer"],
      image: doc.data()["image"],
      date: doc.data()["date"].toDate(),
      view_cnt: doc.data()["view_cnt"],
    };

    noticeData.push(docData);
  });

  return noticeData;
};

const MainBoard = async () => {
  const slideDB: slideType[] = await slideDBfetch();
  const noticeDB: NoticeType[] = await noticeDBfetch();

  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      <NoticeBoard noticeDB={noticeDB} />
    </div>
  );
};

export default MainBoard;
