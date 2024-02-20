"use client";

import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "styles/notice.scss";
import { NoticeType } from "app/notice/page";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "component/fetchDB/firebase";
import { useSearchParams } from "next/navigation";
import Loading from "component/fetchDB/loading/Loading";

const CurrentNotice = () => {
  const searchParams = useSearchParams();

  const noticeId: string | null = searchParams ? searchParams.get("id") : null;

  const [currentNotice, setCurrentNotice] = useState<NoticeType | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const currentNoticeDate = currentNotice ? String(currentNotice.date) : "";

  const fetchNotice = async () => {
    if (noticeId) {
      const ref = doc(db, "notice", noticeId);

      const DocSnapShot = await getDoc(ref);

      if (DocSnapShot.exists()) {
        const noticeDoc: NoticeType = {
          id: DocSnapShot.id,
          title: DocSnapShot.data()["title"],
          writer: DocSnapShot.data()["writer"],
          image: DocSnapShot.data()["image"],
          date: DocSnapShot.data()["date"].toDate(),
          text: DocSnapShot.data()["text"],
          view_cnt: DocSnapShot.data()["view_cnt"],
        };

        setCurrentNotice(noticeDoc);
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    if (noticeId !== null) {
      fetchNotice();

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [noticeId]);

  return (
    <div className='wrap'>
      <Navbar />
      <section className='currentNotice-container'>
        <div className='current-header'>
          <h1 className='currentHeader-title'>공지사항</h1>
        </div>
        <div className='current-NoticeBoard'>
          {!loading && currentNotice ? (
            <>
              <h1 className='currentBoard-title'>{currentNotice.title}</h1>

              <div className='currentBoard-info'>
                <h2 className='currentBoard-writer'>{currentNotice.writer}</h2>
                <span className='currentBoard-date'>
                  {currentNoticeDate.slice(0, 10)}
                </span>
              </div>

              <div className='currentBoard-text'>
                {currentNotice.text.split("\n").map((keyword) => {
                  return (
                    <p key={currentNotice.id}>
                      {keyword}
                      <br />
                    </p>
                  );
                })}
              </div>

              <div className='upload-imageBox'>
                <div className='upload-image'>
                  {currentNotice.image ? (
                    <Image
                      src={currentNotice.image}
                      alt='공지사항 이미지'
                      width='400'
                      height='500'
                    />
                  ) : null}
                </div>
              </div>

              <div className='currentNotice-button'>
                {/*
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
              */}

                <div className='NoticeList-button'>
                  <Link href='/notice'>목록으로</Link>
                </div>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CurrentNotice;
