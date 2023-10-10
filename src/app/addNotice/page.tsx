"use client";

import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import aws from "component/s3/s3";
import Link from "next/link";
import React, { useRef, useState } from "react";
import "styles/notice.scss";
import { useSession } from "next-auth/react";

const AddNotice = () => {
  const [noticeInfo, setNoticeInfo] = useState({
    title: "",
    writer: "",
    text: "",
  });

  const { data: session, status } = useSession();

  /*createObjectUrl 활용한 이미지 객체 가르키는 url 저장*/
  const [urlThumbnail, setUrlThumbnail] = useState<string>();
  /*업로드 이미지 객체 aws s3 버킷 연동 함수에 파라미터로 전송하기 위해 저장 */
  const [uploadImage, setUploadImage] = useState<any>();

  /*공지사항 title, text field 유효성 검증 state */
  const [isTitle, setIsTitle] = useState<boolean>(false);
  const [isText, setIsText] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  /*file input 업로드 파일 객체 mimetype 식별 type value 배열*/
  const validFileType = ["image/jpeg", "image/jpg", "image/png"];
  const [error, setError] = useState<string>("");

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: any = e.target;

    if (!files[0]) return;

    const fileBlob = files[0];

    if (!validFileType.find((type) => type === fileBlob.type)) {
      setError("File must be in JPG/ PNG Format");
      return;
    }

    setError("");
    setUploadImage(fileBlob);

    encodeFile(fileBlob);
  };

  /*blob 파일 객체를 가르키는 url로 변환하는 createObjectUrl 로직 */
  const encodeFile = (fileBlob: any) => {
    /*url 생성 후 state에 저장되면 메모리 낭비 방지를 위하여 revoke */
    if (urlThumbnail) URL.revokeObjectURL(urlThumbnail);

    const url = URL.createObjectURL(fileBlob);

    setUrlThumbnail(url);
  };

  const inputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.length > 0) {
      setIsTitle(true);
    }

    setNoticeInfo({
      ...noticeInfo,
      [name]: value,
    });
  };

  const textChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.length > 0) {
      setIsText(true);
    }

    setNoticeInfo({
      ...noticeInfo,
      [name]: value,
    });
  };

  const sendData = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isTitle && titleRef.current) {
      alert("제목을 입력해주세요.");
      return titleRef.current.focus();
    } else if (!isText && textRef.current) {
      alert("내용을 입력해주세요.");
      return textRef.current.focus();
    }

    const replaceText = () => {
      return noticeInfo.text.replaceAll("<br>", "\r\n");
    };

    try {
      const res = await aws(uploadImage);

      const resRoute = res;

      const final: any = {
        title: noticeInfo.title,
        writer: noticeInfo.writer,
        text: replaceText(),
        imgRoute: resRoute,
      };

      const data = await fetch("http://localhost:3000/api/createNotice", {
        method: "POST",
        body: JSON.stringify(final),
      });

      console.log(data.json());
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
                ref={titleRef}
              />
              {status === "authenticated" && (
                <input
                  type='text'
                  name='writer'
                  placeholder='작성자'
                  className='writer-input'
                  value={`${session.user?.name}`}
                />
              )}
            </div>

            <div className='Notice-textInfo'>
              <textarea
                className='textInfo-area'
                placeholder='내용을 입력해 주세요.'
                name='text'
                onChange={textChangeInfo}
                ref={textRef}
              />

              <div className='image-wrapper'>
                <div className='preview-image'>
                  {urlThumbnail ? (
                    <img src={urlThumbnail} alt='uploadImg' />
                  ) : (
                    "이미지 미리보기"
                  )}
                </div>

                {error && <div className='error-Message'>{error}</div>}

                <label htmlFor='uploadImg' className='upload-button'>
                  <h1>이미지 업로드</h1>
                </label>
                <input type='file' id='uploadImg' onChange={fileUpload} />
              </div>
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default AddNotice;
