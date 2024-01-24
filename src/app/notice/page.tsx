"use client";

import axios from "axios";
import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Pagenation from "component/Notice/Pagenation";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import "styles/notice.scss";
import { RotatingLines } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import { ThemeContext } from "../../../context/ThemeContext";
import { commonService } from "component/fetchDB";

export interface NoticeType {
  idx: number;
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

  const fetchNotice = () => {
    commonService.getNotice().then((res) => setNoticeDB(res));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  const { data: session, status } = useSession();

  const viewCount = async (currentCount: number, currentIdx: number) => {
    const count = currentCount + 1;

    try {
      const res = await fetch(`/api/viewNotice/${count}`, {
        method: "POST",
        body: JSON.stringify({
          currentIdx: currentIdx,
        }),
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

          {status === "authenticated" && (
            <div className='AddNotice-button'>
              <a href='/addNotice'>공지사항 작성</a>
            </div>
          )}
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
            <table>
              <thead>
                <tr>
                  <th>
                    <h1>번호</h1>
                  </th>
                  <th>
                    <h1>제목</h1>
                  </th>
                  <th>
                    <h1>글쓴이</h1>
                  </th>
                  <th>
                    <h1>조회수</h1>
                  </th>
                  <th>
                    <h1>날짜</h1>
                  </th>
                </tr>
              </thead>

              <tbody>
                {noticeDB.map((item) => {
                  return (
                    <tr key={item.idx}>
                      <td>
                        <span>{item.idx}</span>
                      </td>
                      <td>
                        <Link
                          href={`/notice/${item.idx}`}
                          onClick={() => viewCount(item.view_cnt, item.idx)}
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td>
                        <span>{item.writer}</span>
                      </td>
                      <td>
                        <span>{item.view_cnt}</span>
                      </td>
                      <td>
                        <span>{item.date.slice(0, 10)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <Pagenation />
      </section>

      <Footer />
    </div>
  );
}
