"use client";

import axios from "axios";
import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import "styles/notice.scss";

const page = () => {
  const [urlThumbnail, setUrlThumbnail] = useState<string>();

  const [noticeInfo, setNoticeInfo] = useState({
    title: "",
    writer: "",
    text: "",
    data: "",
  });

  const [uploadImage, setUploadImage] = useState<any>();

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: any = e.target;

    if (!files && !files[0]) return;

    const fileBlob = files[0];

    setUploadImage(fileBlob);

    encodeFile(fileBlob);
  };

  const encodeFile = (fileBlob: any) => {
    if (urlThumbnail) URL.revokeObjectURL(urlThumbnail);

    const url = URL.createObjectURL(fileBlob);

    setUrlThumbnail(url);
  };

  const inputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setNoticeInfo({
      ...noticeInfo,
      [name]: value,
    });
  };

  const textChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setNoticeInfo({
      ...noticeInfo,
      [name]: value,
    });
  };

  const sendData = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const replaceText = () => {
      return noticeInfo.text.replaceAll("<br>", "\r\n");
    };

    const body = {
      title: noticeInfo.title,
      writer: noticeInfo.writer,
      text: replaceText(),
    };

    formData.append("file", uploadImage);
    formData.append("title", body.title);
    formData.append("text", body.text);
    formData.append("writer", body.writer);

    try {
      const res = await fetch("http://localhost:3000/api/createNotice", {
        method: "POST",
        body: formData,
      });

      console.log(res.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='wrap'>
      <Navbar />
      <section className='addNotice-container'>
        <div className='addNotice-titleBox'>
          <h1 className='addNotice-title'>공지사항</h1>

          <div className='NoticeList-button'>
            <Link href='/notice'>목록으로</Link>
          </div>
        </div>

        <form
          className='addNotice-Form'
          onSubmit={sendData}
          encType='multipart/form-data'
        >
          <div className='form-header'>
            <h2 className='header-title'>공지사항 작성</h2>

            <div className='submit-button'>
              <button type='submit'>등록</button>
            </div>
          </div>

          <div className='form-info'>
            <div className='Notice-mainInfo'>
              <input
                type='text'
                name='title'
                placeholder='제목을 입력해 주세요.'
                className='title-input'
                onChange={inputInfo}
              />
              <input
                type='text'
                name='writer'
                placeholder='작성자'
                className='writer-input'
                onChange={inputInfo}
              />
            </div>

            <div className='Notice-textInfo'>
              <textarea
                className='textInfo-area'
                placeholder='내용을 입력해 주세요.'
                name='text'
                onChange={textChangeInfo}
              />

              <div className='image-wrapper'>
                <div className='preview-image'>
                  {urlThumbnail ? (
                    <img src={urlThumbnail} alt='uploadImg' />
                  ) : (
                    "이미지 미리보기"
                  )}
                </div>

                <label htmlFor='uploadImg' className='upload-button'>
                  <h1>이미지 업로드</h1>
                </label>
                <input
                  type='file'
                  accept='image/*'
                  id='uploadImg'
                  onChange={fileUpload}
                />
              </div>
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default page;
