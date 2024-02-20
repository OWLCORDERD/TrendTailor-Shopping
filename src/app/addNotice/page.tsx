"use client";

import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Link from "next/link";
import React, { useRef, useState } from "react";
import "styles/notice.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "component/fetchDB/firebase";

interface sendDataType {
  title: string;
  text: string;
  writer: string;
  img_url: string | undefined;
}

interface sendTxtDataType {
  title: string;
  text: string;
  writer: string;
}

const AddNotice = () => {
  const [noticeInfo, setNoticeInfo] = useState({
    title: "",
    writer: "",
    text: "",
  });

  const { data, status } = useSession();

  /*createObjectUrl 활용한 이미지 객체 가르키는 url 저장*/
  const [urlThumbnail, setUrlThumbnail] = useState<string>();
  /*업로드 이미지 객체 aws s3 버킷 연동 함수에 파라미터로 전송하기 위해 저장 */
  const [uploadImage, setUploadImage] = useState<File | undefined>();
  const [uploadUrl, setUploadUrl] = useState<string | undefined>();

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
    } else {
      setIsText(false);
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
    } else {
      setIsText(false);
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

    /* text input value 값으로 엔터값을 넣을 때, string value에 br태그가 들어가고 줄바꿈 안됨
    -> replace 메소드를 사용하여 br태그를 줄바꿈 개행 문자로 변경 */
    const replaceText = () => {
      return noticeInfo.text.replaceAll("<br>", "\r\n");
    };

    const writer = () => {
      if (status === "authenticated" && data.user) {
        return `${data.user.name}`;
      } else {
        return "익명";
      }
    };

    /*업로드 이미지 파일을 state에 저장했을 시, firebase storage의
    images/notice 경로 ref값을 uploadBytes 첫번째 인자로 넘기고
    두번째 인자로 이미지 파일을 넣어 파일을 업로드한 후 스냅샷 파라미터 값을 then 체이닝을 통해
    getDownloadURL 메소드로 저장 URL을 추출하여 firestore DB에 저장 */
    if (uploadImage) {
      const storageSaveRef = ref(storage, `images/notice/${uploadImage.name}`);

      await uploadBytes(storageSaveRef, uploadImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUploadUrl(url);
        });
      });

      const sendData: sendDataType = {
        title: noticeInfo.title,
        text: replaceText(),
        writer: writer(),
        img_url: uploadUrl,
      };

      const res = await fetch("/api/createNotice", {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log(res);
      }
    } else {
      const sendData: sendTxtDataType = {
        title: noticeInfo.title,
        text: replaceText(),
        writer: writer(),
      };

      await fetch("/api/createNotice", {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
              <span className='writer'>
                {status === "authenticated" && data.user
                  ? `${data.user.name}`
                  : "익명"}
              </span>
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
                    <Image
                      src={urlThumbnail}
                      alt='uploadImg'
                      width='300'
                      height='400'
                    />
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
