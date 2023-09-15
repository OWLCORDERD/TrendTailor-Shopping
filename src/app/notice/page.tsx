"use client";

import axios from "axios";
import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Pagenation from "component/Notice/Pagenation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "styles/notice.scss";
import { RotatingLines } from "react-loader-spinner";

export interface NoticeType {
  idx: number;
  title: string;
  writer: string;
  image: string;
  date: string;
  text: string;
}

const page = () => {
  const [noticeDB, setNoticeDB] = useState<NoticeType[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchNotice = async () => {
    const res = await axios.get("http://localhost:3000/api/viewNotice", {
      params: { selectAll: "all" },
    });

    if (res.status === 200) {
      const { data } = res.data;

      setNoticeDB(data);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  return (
    <div className='wrap'>
      <Navbar />

      <section className='NoticePage-container'>
        <div className='Notice-header'>
          <div className='Notice-title'>
            <h1>공지사항</h1>
          </div>

          <div className='AddNotice-button'>
            <a href='/addNotice'>공지사항 작성</a>
          </div>
        </div>
        <div className='Notice-table'>
          {loading ? (
            <div className='loader'>
              <RotatingLines
                strokeColor='black'
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
                      <td>{item.idx}</td>
                      <td>
                        <Link
                          href={{
                            pathname: "/currentNotice",
                            query: { id: item.idx },
                          }}
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td>{item.writer}</td>
                      <td>0</td>
                      <td>{item.date.slice(0, 10)}</td>
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
};

export default page;
