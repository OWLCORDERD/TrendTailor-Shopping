"use client";

import React, { useEffect, useState } from "react";
import Megazine from "./Megazine";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import { NoticeType } from "app/notice/page";
import axios from "axios";

const MainBoard = () => {
  const [noticeDB, setNoticeDB] = useState<NoticeType[]>([]);
  const [loader, setLoader] = useState(true);

  const limitNotice = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_API}/api/viewNotice`,
      {
        params: { selectLimit: "limit" },
      }
    );

    if (res.status === 200) {
      const { data } = res.data;

      setNoticeDB(data);

      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  };
  useEffect(() => {
    limitNotice();
  }, []);

  return (
    <div className='MainPage-Board'>
      <NoticeBoard noticeDB={noticeDB} loader={loader} />
      <Megazine />
    </div>
  );
};

export default MainBoard;
