"use client";

import React, { useRef, useState } from "react";
import "styles/addNotice.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "component/fetchDB/firebase";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa6";
import ErrorPopup from "component/ErrorPopup/ErrorPopup";
import { IoCloseCircle } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";

interface sendDataType {
  title: string;
  text: string;
  img_url?: string | undefined;
}

const AddNotice = () => {
  const router = useRouter();

  const [noticeInfo, setNoticeInfo] = useState({
    title: "",
    text: "",
  });

  // createObjectUrl 활용한 이미지 객체 미리보기 url 저장 상태값
  const [urlThumbnail, setUrlThumbnail] = useState<string>();
  // 업로드 이미지 파일 객체 저장 상태값
  const [uploadImage, setUploadImage] = useState<File | undefined>();
  // 드래그 박스 영역에 파일을 드래그 & 드롭 할때 업데이트되는 상태 값
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 공지사항 title, text 유효성 검증 상태값
  const [isTitle, setIsTitle] = useState<boolean>(false);
  const [isText, setIsText] = useState<boolean>(false);

  // 사용자 입력 폼 ref
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  /*file input 업로드 파일 객체 mimetype 식별 type 배열*/
  const validFileType = ["image/jpeg", "image/jpg", "image/png"];
  const [error, setError] = useState<string>("");

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: any = e.target;

    const fileBlob = files[0];

    const limitSize = 1024 ** 2 * 3; // 3mb 사이즈값

    const uploadSize = fileBlob.size;

    if (uploadSize > limitSize) {
      setError("3MB 이하 용량의 이미지 파일을 업로드해주세요.");
      return;
    } else if (!validFileType.find((type) => type === fileBlob.type)) {
      setError("JPEG, JPG, PNG 확장자의 이미지만 업로드 가능합니다.");
      return;
    }

    setError("");
    setUploadImage(fileBlob);

    encodeFile(fileBlob);
  };

  /*blob 파일 객체 미리보기 url 생성하는 createObjectUrl 로직 */
  const encodeFile = (fileBlob: any) => {
    /*url 생성 후 state에 저장되면 메모리 낭비 방지를 위하여 revoke */
    if (urlThumbnail) URL.revokeObjectURL(urlThumbnail);

    const url = URL.createObjectURL(fileBlob);

    setUrlThumbnail(url);
  };

  // 업로드 이미지 삭제 함수
  const deletePreviewFile = () => {
    setUrlThumbnail(""); // 미리보기 삭제
    setUploadImage(undefined); // 업로드 이미지 파일 객체 삭제
  };

  // dnd-Box 요소 영역에 드래그한 파일이 최초로 들어올때 발생하는 이벤트
  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    // 기존의 브라우저에 기본적으로 등록된 이벤트를 비활성화
    // (이미지를 드래그 & 드롭하면 새 페이지로 이미지가 열림)
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  // 드래그한 파일을 dnd-Box 요소 영역에서 머무를때 발생하는 이벤트
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  // 드래그한 파일을 dnd-Box 요소 영역에서 벗어날때 발생하는 이벤트
  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  // dbd-Box 요소 영역에 드래그한 파일을 놓았을때 발생하는 이벤트
  const dropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const dropFile = e.dataTransfer.files[0];

    const limitSize = 1024 ** 2 * 3; // 3mb 사이즈값

    const uploadSize = dropFile.size;

    if (uploadSize > limitSize) {
      setError("3MB 이하 용량의 이미지 파일을 업로드해주세요.");
      setIsDragging(false);
      return;
    } else if (!validFileType.find((type) => type === dropFile.type)) {
      setError("JPEG, JPG, PNG 확장자의 이미지만 업로드 가능합니다.");
      setIsDragging(false);
      return;
    }

    setUploadImage(e.dataTransfer.files[0]);
    encodeFile(e.dataTransfer.files[0]);
    setIsDragging(false);
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

    /* 공지사항 title(제목), text(내용) input 태그에 내용을 입력하지 않거나
    조건에 충족하지 않으면 input 필드에 focus 이벤트 부여 */
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

    /*업로드 이미지 파일을 state에 저장했을 시, firebase storage의
    images/notice 경로 ref값을 uploadBytes 첫번째 인자로 넘기고
    두번째 인자로 이미지 파일을 넣어 파일을 업로드한 후 스냅샷 파라미터 값을 then 체이닝을 통해
    getDownloadURL 메소드로 저장 URL을 추출하여 firestore DB에 저장 */
    if (uploadImage) {
      const storageSaveRef = ref(storage, `images/notice/${uploadImage.name}`);

      /* 이미지를 스토리지에 업로드한 뒤 저장된 경로를 다운로드하여
      경로값 프로퍼티를 포함한 sendData 전송 */
      await uploadBytes(storageSaveRef, uploadImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const sendData: sendDataType = {
            title: noticeInfo.title,
            text: replaceText(),
            img_url: url,
          };

          fetch("/api/createNotice", {
            method: "POST",
            body: JSON.stringify(sendData),
            headers: {
              "Content-Type": "application/json",
            },
          });
        });
      });
    } else {
      // 업로드한 이미지가 없을 시, 텍스트와 제목 프로퍼티 값만 sendData 전송
      const sendData: sendDataType = {
        title: noticeInfo.title,
        text: replaceText(),
      };

      await fetch("/api/createNotice", {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    router.push("/notice");
  };

  return (
    <div className='wrap'>
      {error !== "" && (
        <AnimatePresence>
          <ErrorPopup errorMessage={error} setError={setError} />
        </AnimatePresence>
      )}
      <section className='addNotice-container'>
        <form
          className='addNotice-Form'
          onSubmit={sendData}
          encType='multipart/form-data'
        >
          <div className='form-header'>
            <h2 className='header-title'>공지사항 작성</h2>

            <div className='form-buttons'>
              <button type='button' onClick={() => router.push("/notice")}>
                목록으로
              </button>
              <button type='submit'>등록</button>
            </div>
          </div>

          <div className='form-Field'>
            <div className='essential-Field'>
              <input
                type='text'
                name='title'
                placeholder='제목을 입력해 주세요.'
                className='title-input'
                onChange={inputInfo}
                ref={titleRef}
              />

              <textarea
                className='textInfo-area'
                placeholder='내용을 입력해 주세요.'
                name='text'
                onChange={textChangeInfo}
                ref={textRef}
              />
            </div>

            <div className='uploadImg-wrapper'>
              <div className='preview-Box'>
                {urlThumbnail ? (
                  <div className='preview-imgBox'>
                    <Image
                      src={urlThumbnail}
                      alt='uploadImg'
                      width='300'
                      height='400'
                    />
                    <button
                      type='button'
                      className='delete-preview'
                      onClick={deletePreviewFile}
                    >
                      <IoCloseCircle />
                    </button>
                  </div>
                ) : (
                  <div
                    className={isDragging ? "dnd-Box dragOn" : "dnd-Box"}
                    onDragEnter={(e) => dragEnter(e)}
                    onDragLeave={(e) => dragLeave(e)}
                    onDragOver={(e) => dragOver(e)}
                    onDrop={(e) => dropFile(e)}
                  >
                    <FaImage />
                    <span>
                      {isDragging
                        ? "이미지를 놓아주세요."
                        : "이미지를 드래그하여 업로드 하실 수 있습니다."}
                    </span>
                  </div>
                )}
              </div>

              <label htmlFor='uploadFile' className='upload-button'>
                <span>이미지 업로드</span>
              </label>
              <input type='file' id='uploadFile' onChange={fileUpload} />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddNotice;
