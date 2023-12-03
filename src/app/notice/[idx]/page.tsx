"use client";

import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import "styles/notice.scss";
import { useRouter } from "next/navigation";
import { NoticeType } from "app/notice/page";
import axios from "axios";
import Image from "next/image";

const CurrentNotice = ({ params }: any) => {
  const id = params.idx;
  const router = useRouter();

  const [noticeDB, setNoticeDB] = useState<NoticeType[]>([]);
  const [currentDB, setCurrentDB] = useState<NoticeType[]>([]);

  const fetchNotice = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`,
      {
        params: {
          selectAll: "all",
        },
      }
    );

    if (res.status === 200) {
      const { data } = res.data;

      setNoticeDB(data);
    }
  };

  const currentNotice = useCallback(() => {
    const result: NoticeType[] = noticeDB.filter(
      (item) => item.idx === Number(id)
    );

    setCurrentDB(result);
  }, [noticeDB]);

  useEffect(() => {
    fetchNotice();
  }, []);

  useEffect(() => {
    currentNotice();
  }, [noticeDB]);

  const beforeDB = noticeDB.filter((item) => item.idx === Number(id) - 1);

  const beforeNotice = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (beforeDB) {
      setCurrentDB(beforeDB);

      const beforeIndex: number = Number(id) - 1;

      router.push(`/notice/${beforeIndex}`);
    }
  };

  const nextNotice = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (nextDB) {
      setCurrentDB(nextDB);

      const nextIndex: number = Number(id) + 1;

      router.push(`/notice/${nextIndex}`);
    }
  };

  const nextDB = noticeDB.filter((item) => item.idx === Number(id) + 1);

  return (
    <div className='wrap'>
      <Navbar />
      <section className='currentNotice-container'>
        <div className='current-header'>
          <h1 className='currentHeader-title'>공지사항</h1>
        </div>
        <div className='current-NoticeBoard'>
          <h1 className='currentBoard-title'>{currentDB[0]?.title}</h1>

          <div className='currentBoard-info'>
            <h2 className='currentBoard-writer'>{currentDB[0]?.writer}</h2>
            <span className='currentBoard-date'>
              {currentDB[0]?.date.slice(0, 10)}
            </span>
          </div>

          <div className='currentBoard-text'>
            {currentDB[0]?.text.split("\n").map((keyword) => {
              return (
                <p key={currentDB[0].idx}>
                  {keyword}
                  <br />
                </p>
              );
            })}
          </div>

          <div className='upload-imageBox'>
            <div className='upload-image'>
              <Image
                src={currentDB[0]?.image}
                alt='공지사항 이미지'
                width='400'
                height='500'
              />
            </div>
          </div>

          <div className='currentNotice-button'>
            <div className='Notice-shortCut'>
              <div className='next-Notice'>
                {nextDB[0] ? (
                  <>
                    <span>다음 글</span>

                    <a
                      className='nextNotice-title'
                      onClick={(e) => nextNotice(e)}
                    >
                      {nextDB[0]?.title}
                    </a>
                  </>
                ) : null}
              </div>

              <div className='before-Notice'>
                {beforeDB[0] ? (
                  <>
                    <span>이전 글</span>

                    <a
                      className='beforeNotice-title'
                      onClick={(e) => beforeNotice(e)}
                    >
                      {beforeDB[0]?.title}
                    </a>
                  </>
                ) : null}
              </div>
            </div>

            <div className='NoticeList-button'>
              <Link href='/notice'>목록으로</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CurrentNotice;
