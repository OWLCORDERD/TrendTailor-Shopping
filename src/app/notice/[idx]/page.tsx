"use client";

import { db } from "component/fetchDB/firebase";
import Loading from "component/fetchDB/loading/Loading";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "styles/currentNotice.scss";
import { NoticeType } from "../page";

const CurrentNotice = ({ params }: any) => {
  const notice_id = params.idx;
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPost, setCurrentPost] = useState<NoticeType | undefined>();

  const findPost = async () => {
    const ref = doc(db, "notice", notice_id);

    const docSnapshot = await getDoc(ref);

    if (docSnapshot.exists()) {
      const docData = {
        id: docSnapshot.id,
        title: docSnapshot.data()["title"],
        writer: docSnapshot.data()["writer"],
        image: docSnapshot.data()["image"],
        date: docSnapshot.data()["date"].toDate(),
        text: docSnapshot.data()["text"],
        view_cnt: docSnapshot.data()["view_cnt"],
      };

      const date = docData.date;

      let month = date.getMonth() + 1;
      let day = date.getDate();
      const filterMonth = month < 10 ? "0" + month : month;
      const filterDay = day < 10 ? "0" + day : day;
      docData.date = date.getFullYear() + "-" + filterMonth + "-" + filterDay;

      setCurrentPost(docData);

      setLoading(false);
    }
  };

  useEffect(() => {
    findPost();
  }, [notice_id]);

  return (
    <div className='wrap'>
      <section className='current-NoticeBoard'>
        {!loading && currentPost ? (
          <>
            <div className='currentBoard-header'>
              <span className='static'>공지사항</span>
              <h1 className='title'>{currentPost.title}</h1>
            </div>

            <div className='currentBoard-info'>
              <div className='view-count'>
                <p>조회수</p>
                <span>{currentPost.view_cnt}</span>
              </div>
              <div className='upload-date'>
                <span>{currentPost.date}</span>
              </div>
            </div>

            <div className='currentBoard-text'>
              {currentPost.text.split("\n").map((keyword) => {
                return (
                  <p key={currentPost.id}>
                    {keyword}
                    <br />
                  </p>
                );
              })}
            </div>

            {currentPost.image ? (
              <div className='upload-imageBox'>
                <div className='upload-image'>
                  <Image
                    src={currentPost.image}
                    alt='공지사항 이미지'
                    width='400'
                    height='500'
                  />
                </div>
              </div>
            ) : null}

            <div className='currentNotice-button'>
              <div className='NoticeList-button'>
                <Link href='/notice'>목록으로</Link>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </section>
    </div>
  );
};

export default CurrentNotice;
