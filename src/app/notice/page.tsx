"use client";

import axios from "axios";
import Pagenation from "component/Pagenation/Pagenation";
import React, { useContext, useEffect, useState } from "react";
import "styles/notice.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "component/fetchDB/firebase";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loading from "component/fetchDB/loading/Loading";

export interface NoticeType {
  id: string;
  title: string;
  image: string;
  date: any;
  text: string;
  view_cnt: number;
}

export default function Notice() {
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
        date: doc.data()["date"].toDate(),
        image: doc.data()["image"],
        text: doc.data()["text"],
        title: doc.data()["title"],
        view_cnt: doc.data()["view_cnt"],
      };

      // 파이어베이스에 저장된 공지사항 date 필드 값
      const date = docsData.date;
      // date 필드 값 월(month) 데이터 추출
      const month = date.getMonth();
      // date 필드 값 일(date) 데이터 추출
      const day = date.getDate();

      // 월, 일 데이터가 10보다 작으면 0 붙인 숫자값으로 return
      const filterMonth = month < 10 ? "0" + month : month;
      const filterDay = day < 10 ? "0" + day : day;

      // 0000-00-00 형식으로 포맷 후 기존 date 문자열 데이터 값 업데이트
      docsData.date = date.getFullYear() + "-" + filterMonth + "-" + filterDay;

      postsData.push(docsData);
    });

    return postsData;
  };

  const { data, isLoading } = useSWR("api/notice", noticeDBfetch);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageDB, setCurrentPageDB] = useState<NoticeType[] | undefined>(
    []
  );
  const postMaxLength = 6;
  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const updatePageData = () => {
    const pageData = data?.slice(indexOfFirst, indexOfLast);

    setCurrentPageDB(pageData);

    setLoading(false);
  };

  useEffect(() => {
    updatePageData();
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      updatePageData();
    }
  }, [data]);

  const viewNotice = async (viewCount: number, currentIdx: string) => {
    const count = viewCount + 1;

    try {
      const res = await axios.post("/api/viewCount", {
        id: currentIdx,
        count: count,
      });

      if (res.status === 200) {
        router.push(`/notice/${currentIdx}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='wrap'>
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
          {isLoading || loading ? (
            <Loading />
          ) : (
            <div className='border-table'>
              <table>
                <thead className={mode === "dark" ? "darkMode" : "lightMode"}>
                  <tr>
                    <th>
                      <h1>제목</h1>
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
                  {currentPageDB &&
                    currentPageDB.map((item) => {
                      return (
                        <>
                          <tr
                            key={item.id}
                            className={
                              mode === "dark" ? "darkMode" : "lightMode"
                            }
                          >
                            <td
                              onClick={() => viewNotice(item.view_cnt, item.id)}
                            >
                              <span>{item.title}</span>
                            </td>
                            <td>
                              <span>{item.date}</span>
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

        {data ? (
          <Pagenation
            setCurrentPage={setCurrentPage}
            postMaxLength={postMaxLength}
            totalDBlength={data.length}
            currentPage={currentPage}
            setLoading={setLoading}
          />
        ) : null}
      </section>
    </div>
  );
}
