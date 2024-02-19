"use client";

import axios from "axios";
import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Pagenation from "component/Notice/Pagenation";
import React, { useEffect, useState, useContext } from "react";
import "styles/notice.scss";
import { RotatingLines } from "react-loader-spinner";
import { ThemeContext } from "../../../context/ThemeContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "component/fetchDB/firebase";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export interface NoticeType {
  id: string;
  title: string;
  writer: string;
  image: string;
  date: string;
  text: string;
  view_cnt: number;
}

export default function Notice() {
  const [noticeDB, setNoticeDB] = useState<NoticeType[]>([]);

  const [loading, setLoading] = useState(true);

  const { mode } = useContext(ThemeContext);

  const router = useRouter();

  const { status } = useSession();

  const noticeDBfetch = async () => {
    const postRef = collection(db, "notice");

    const querySnapShot = await getDocs(
      query(postRef, orderBy("date", "desc"))
    );

    if (querySnapShot.empty) {
      return null;
    }

    const postsData: NoticeType[] = [];

    querySnapShot.forEach((doc) => {
      const docsData = {
        id: doc.id,
        date: doc.data()["date"].toDate().toLocaleDateString("ko-KR"),
        image: doc.data()["image"],
        text: doc.data()["text"],
        title: doc.data()["title"],
        view_cnt: doc.data()["view_cnt"],
        writer: doc.data()["writer"],
      };

      postsData.push(docsData);
    });

    setNoticeDB(postsData);
  };

  useEffect(() => {
    noticeDBfetch();
  }, []);

  useEffect(() => {
    if (noticeDB.length > 0) {
      setLoading(false);
    }
  }, [noticeDB]);

  const viewCount = async (currentCount: number, currentIdx: string) => {
    router.push(`/viewNotice?id=${currentIdx}`);

    const count = currentCount + 1;

    try {
      const res = await axios.post("/api/viewCount", {
        id: currentIdx,
        count: count,
      });

      if (res.status === 200) {
        console.log("success post");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='wrap'>
      <Navbar />

      <section className='NoticePage-container'>
        <div className='Notice-header'>
          <div className='Notice-title'>
            <h1>공지사항</h1>
          </div>

          <div
            className='AddNotice-button'
            hidden={status === "authenticated" ? false : true}
          >
            <a href='/addNotice'>공지사항 작성</a>
          </div>
        </div>
        <div className='Notice-table'>
          {loading ? (
            <div className='loader'>
              <RotatingLines
                strokeColor={mode === "dark" ? "white" : "black"}
                strokeWidth='3'
                animationDuration='0.75'
                width='50'
                visible={true}
              />
            </div>
          ) : (
            <div className='border-table'>
              <table>
                <thead className={mode === "dark" ? "darkMode" : "lightMode"}>
                  <tr>
                    <th>
                      <h1>제목</h1>
                    </th>
                    <th>
                      <h1>글쓴이</h1>
                    </th>
                    <th>
                      <h1>날짜</h1>
                    </th>
                    <th>
                      <h1>조회수</h1>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {noticeDB.map((item) => {
                    return (
                      <>
                        <tr
                          key={item.id}
                          onClick={() => viewCount(item.view_cnt, item.id)}
                          className={mode === "dark" ? "darkMode" : "lightMode"}
                        >
                          <td>
                            <span>{item.title}</span>
                          </td>
                          <td>
                            <span>{item.writer}</span>
                          </td>
                          <td>
                            <span>{String(item.date).replace(".", "")}</span>
                          </td>
                          <td>
                            <span>{item.view_cnt}</span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Pagenation />
      </section>

      <Footer />
    </div>
  );
}
