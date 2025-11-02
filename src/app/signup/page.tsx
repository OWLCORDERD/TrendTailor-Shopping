"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "app/globals.scss";
import "styles/register.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosImages } from "react-icons/io";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "component/fetchDB/firebase";
import { AlertToast } from "@/hooks/useToastify";

interface infoType {
  id: string;
  email: {
    id: string;
    domain: string;
  };
  password: string;
  username: string;
}

interface sendDataType {
  id: string;
  email: string;
  password: string;
  username: string;
  image: string | undefined;
}

const Register = () => {
  /* 가입정보의 모든 value 값 저장 & 관리 하는 프로퍼티 객체 값 */
  const [registerInfo, setRegisterInfo] = useState<infoType>({
    id: "",
    email: {
      id: "",
      domain: "",
    },
    password: "",
    username: "",
  });

  // ** 개인정보, 프로필 정보 유효성 검증 상태 값 ** //

  // 개인정보
  const [isName, setIsName] = useState<boolean>(false); // 성명
  const [isEmail, setIsEmail] = useState<boolean>(false); // 이메일
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // 휴대전화

  // 프로필 정보
  const [isUserId, setIsUserId] = useState<boolean>(false); // 아이디
  const [isPassword, setIsPassword] = useState<boolean>(false); // 비밀번호
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false); // 비밀번호 확인
  const [isCheckPhoneNumber, setIsCheckPhoneNumber] = useState<boolean>(false); // 휴대전화 확인
  const [isUserIdDuplicate, setIsUserIdDuplicate] = useState<boolean>(false); // 아이디 중복 여부

  // ** 이미지 업로드 관련 상태 값 ** //
  const uploadFileRef = useRef<HTMLInputElement>(null); // 파일 업로드 Input 요소
  const [uploadImage, setUploadImage] = useState<File | undefined>(); // 업로드 이미지 파일 객체
  const [imageThumbnail, setImageThumbnail] = useState<string>(); // 업로드 이미지 미리보기 URL
  const [uploadImageUrl, setUploadImageUrl] = useState<string | undefined>(); // 이미지 DB 업로드 경로
  const validFileType = ["image/png", "image/jpg", "image/jpeg"]; // 허용 이미지 파일 확장자 타입

  /* 회원 정보 입력 창 Input Element useRef */
  const emailRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const checkPassword = useRef<HTMLInputElement>(null);

  const [selectDomain, setSelectDomain] = useState<string>("");

  const [agreeState, setAgreeState] = useState({
    all: false,
    service: false,
    guide: false,
  });

  const router = useRouter();

  // 실시간 입력 이메일 (아이디 & 도메인) 문자열 정규식 체크
  const emailValidation = () => {
    const currentEmail = `${registerInfo.email.id}@${registerInfo.email.domain}`;
    /*이메일 정규식*/
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    /* 이메일 정규식에 사용자가 입력한 value 값으로 테스트*/
    if (!regEmail.test(currentEmail)) {
      /* 틀리면 isEmail 유효성 검증 결과 false 조건 반환 후 error div 태그 반환*/
      setIsEmail(false);
    } else {
      /* 일치하면 isEmail 유효성 검증 결과 true 반환 후 registerInfo 상태 객체 email 속성 값 업데이트*/
      setIsEmail(true);
    }
  };

  /* 이메일 아이디 입력 값 업데이트 */
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setRegisterInfo({
      id: registerInfo.id,
      email: {
        id: e.target.value,
        domain: registerInfo.email.domain,
      },
      password: registerInfo.password,
      username: registerInfo.username,
    });
  };

  // 이메일 도메인 직접 입력 시, 입력 값 업데이트 & 정규식 체크
  useEffect(() => {
    if (selectDomain !== "") {
      setRegisterInfo({
        id: registerInfo.id,
        email: {
          id: registerInfo.email.id,
          domain: selectDomain,
        },
        password: registerInfo.password,
        username: registerInfo.username,
      });

      emailValidation(); // 이메일 정규식 체크
    }
  }, [selectDomain]);

  // 이메일 직접 입력 혹은 도메인 선택 시마다, 실시간 정규식 체크
  useEffect(() => {
    if (registerInfo.email.id !== "" || registerInfo.email.domain !== "") {
      emailValidation();
    }
  }, [registerInfo.email]);

  // 파일 첨부 버튼 클릭 -> 파일 input 요소 클릭 트리거 함수
  const handleUploadFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    uploadFileRef.current?.click();
  };

  // 비밀번호 입력 값 정규식 체크 후 업데이트
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const current_password = e.target.value;

    /*비밀번호 정규식*/
    const regPassword =
      /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    /* 비밀번호 정규식에 사용자가 입력한 value 값으로 테스트*/
    if (!regPassword.test(current_password)) {
      /* 틀리면 isPassword 유효성 검증 결과 false 조건 반환 후 error div 태그 반환*/
      setIsPassword(false);
    } else {
      /* 일치하면 isPassword 유효성 검증 결과 true 반환 후 registerInfo 상태 객체 password 속성 값 업데이트*/
      setIsPassword(true);

      setRegisterInfo({
        id: registerInfo.id,
        email: {
          id: registerInfo.email.id,
          domain: registerInfo.email.domain,
        },
        password: current_password,
        username: registerInfo.username,
      });
    }
  };

  // 비밀번호 확인 체크
  const passwordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    /* 사용자가 비밀번호 Input 칸에서 올바르게 입력한 값과 비교 */
    if (registerInfo.password !== e.target.value) {
      /* 비밀번호와 값이 틀릴 경우 isCheck false 반환 후 error div 태그 반환*/
      setIsCheckPassword(false);
    } else {
      /* 비밀번호와 확인 값이 같을 경우 true 반환 후 checkPassword값 업데이트 */
      setIsCheckPassword(true);
    }
  };

  // 성명 입력 값 정규식 체크 후 업데이트
  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const current_name = e.target.value;

    /* 아이디 입력 값이 2글자 이하 8글자 이상일 시, false 반환 후 error div 태그 반환 */
    if (current_name.length < 2 || current_name.length > 8) {
      setIsName(false);
    } else {
      setIsName(true);

      setRegisterInfo({
        ...registerInfo,
        username: current_name,
      });
    }
  };

  const phoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    let value = e.target.value.replace(/\D/g, "");

    // 하이픈 자동 삽입
    if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,4})/, "$1-$2");
    }

    // 하이픈 포함 13자리 이상 입력 방지
    if (value.length > 13) {
      value = value.slice(0, 13);
      setPhoneNumber(value);
    }

    setPhoneNumber(value);
  };

  useEffect(() => {
    const checkRegex = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

    if (checkRegex.test(phoneNumber)) {
      console.log(phoneNumber);
      setIsCheckPhoneNumber(true);
    } else {
      setIsCheckPhoneNumber(false);
    }
  }, [phoneNumber]);

  // 아이디 입력 값 정규식 체크 후 업데이트
  const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const current_id = e.target.value;

    /*아이디 정규식*/
    const reg = /^[a-z]+[a-z0-9]{5,19}$/g;

    if (reg.test(current_id)) {
      setIsUserId(true);

      setRegisterInfo({
        ...registerInfo,
        id: current_id,
      });
    } else {
      setIsUserId(false);
    }
  };

  const checkUserIdDuplication = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (isUserId) {
      const res = await axios.get("api/duplicationIdCheck", {
        params: {
          userName: registerInfo.id,
        },
      });

      if (res.status === 200) {
        const duplicate = await res.data;

        if (duplicate) {
          AlertToast({
            str: "사용 가능한 아이디입니다.",
            type: "success",
            theme: "colored",
          });
          setIsUserIdDuplicate(false);
        } else {
          AlertToast({
            str: "이미 사용중인 아이디입니다.",
            type: "error",
            theme: "dark",
          });
          setIsUserIdDuplicate(true);
        }
      } else {
        AlertToast({
          str: "아이디 중복확인에 실패하였습니다. 다시 시도하세요.",
          type: "error",
          theme: "dark",
        });
      }
    } else {
      AlertToast({
        str: "아이디를 정규식에 맞게 입력하세요.",
        type: "error",
        theme: "dark",
      });
    }
  };

  // 서비스 약관동의 전체/개별 선택 처리
  const selectAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = e.target.value;

    switch (checkedValue) {
      case "all":
        setAgreeState({
          ...agreeState,
          all: !agreeState.all,
        });
        break;

      case "service":
        setAgreeState({
          ...agreeState,
          service: !agreeState.service,
        });
        break;

      case "guide":
        setAgreeState({
          ...agreeState,
          guide: !agreeState.guide,
        });
        break;
    }
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: any = e.target;

    if (!files[0]) return;

    const fileBlob: File = files[0];

    if (!validFileType.find((type) => type === fileBlob.type)) {
      alert("이미지 확장자가 아닌 파일을 업로드하였습니다.");
      return;
    }

    setUploadImage(fileBlob);
    encodeFile(fileBlob);
  };

  const encodeFile = (fileBlob: any) => {
    if (imageThumbnail) URL.revokeObjectURL(imageThumbnail);

    const url = URL.createObjectURL(fileBlob);

    setImageThumbnail(url);
  };

  const createUser = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentEmail = `${registerInfo.email.id}@${registerInfo.email.domain}`;

    /*가입정보에 아무것도 입력하지 않았을 시 해당 입력창으로 focus 시킨 후 실행 종료 */
    if (registerInfo.username.length === 0 && usernameRef.current) {
      AlertToast({
        str: "성명을 입력하세요.",
        type: "error",
        theme: "dark",
      });
      return usernameRef.current.focus();
    } else if (
      registerInfo.email.id === "" ||
      registerInfo.email.domain === "" ||
      currentEmail === "@"
    ) {
      AlertToast({
        str: "이메일을 입력하세요.",
        type: "error",
        theme: "dark",
      });
      return emailRef.current?.focus();
    } else if (phoneNumber.length === 0) {
      AlertToast({
        str: "휴대전화 번호를 입력하세요.",
        type: "error",
        theme: "dark",
      });
      return phoneNumberRef.current?.focus();
    } else if (registerInfo.id.length === 0 && idRef.current) {
      AlertToast({
        str: "아이디를 입력하세요.",
        type: "error",
        theme: "dark",
      });
      return idRef.current.focus();
    } else if (registerInfo.password.length === 0 && passwordRef.current) {
      AlertToast({
        str: "비밀번호를 입력하세요.",
        type: "error",
        theme: "dark",
      });
      return passwordRef.current.focus();
    }

    /* 가입정보에 정규식 혹은 조건에 맞지 않은 값을 입력했을 시 해당 입력창에 focus 시킨 후 실행 종료*/
    if (isUserIdDuplicate && idRef.current) {
      AlertToast({
        str: "아이디 중복확인을 진행하세요.",
        type: "error",
        theme: "dark",
      });
      return idRef.current.focus();
    } else if (isEmail === false && emailRef.current) {
      AlertToast({
        str: "이메일 형식에 맞게 입력하세요.",
        type: "error",
        theme: "dark",
      });
      return emailRef.current.focus();
    } else if (isPassword === false && passwordRef.current) {
      AlertToast({
        str: "비밀번호를 올바르게 입력하세요.",
        type: "error",
        theme: "dark",
      });
      return passwordRef.current.focus();
    } else if (isCheckPassword === false && checkPassword.current) {
      AlertToast({
        str: "비밀번호를 다시 확인하세요.",
        type: "error",
        theme: "dark",
      });
      return checkPassword.current.focus();
    }

    if (!agreeState.service || !agreeState.guide) {
      AlertToast({
        str: "약관 전체 동의가 필요합니다.",
        type: "error",
        theme: "dark",
      });
      return;
    }

    if (uploadImage) {
      const uploadImageRef = ref(storage, `images/user/${uploadImage.name}`);

      await uploadBytes(uploadImageRef, uploadImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUploadImageUrl(url);
        });
      });

      if (uploadImageUrl) {
        const data: sendDataType = {
          id: registerInfo.id,
          email: currentEmail,
          password: registerInfo.password,
          username: registerInfo.username,
          image: uploadImageUrl,
        };

        const res = await fetch("/api/hashPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          router.replace("/login");
        } else {
          AlertToast({
            str: "로그인 처리중에 오류가 발생했습니다. 다시 시도해주세요.",
            type: "error",
            theme: "dark",
          });
        }
      }
    } else {
      /* 위의 유효성 검증을 모두 통과할 시 생성할 회원 정보 데이터를 하나의 객체로 묶어서 전송 */
      const data = {
        id: registerInfo.id,
        email: currentEmail,
        password: registerInfo.password,
        username: registerInfo.username,
      };

      try {
        /* 사용자가 입력한 패스워드 값(plain text)을 그대로 DB에 저장할 시 취약점으로 인해 해킹 위협
    -> api/hashPassword 라우터로 plain text 값 전송 -> bcrypt 라이브러리를 통해 hash text로 변경 후 DB에 회원 생성 */
        const res = await fetch("/api/hashPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        /* user 라우터에서 DB 연동과 로직 정상적으로 작동 되었을 시 로그인 페이지로 이동 */
        if (res.ok) {
          router.replace("/login");
        } else {
          console.log(res.status + "error status");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='register-container'>
      <ToastContainer />
      <div className='register-wrap'>
        <div className='register-title'>
          <h1 className='txt'>회원가입</h1>
        </div>

        {/* 개인정보 입력 폼 영역 */}
        <div className='info-form'>
          <div className='form-title'>
            <h1>개인정보입력</h1>
          </div>

          <div className='form-input'>
            <span className='field-title required'>성명</span>
            <div className='field-item'>
              <div className='field-input'>
                <input
                  type='text'
                  onChange={(e) => usernameChange(e)}
                  placeholder='성명을 입력하세요.'
                  ref={usernameRef}
                />
              </div>
              {isName === false ? (
                <div className='Valid-errorTxt'>
                  <h1>2~8글자 이내로 입력해주세요.</h1>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-input'>
            <span className='field-title required'>이메일</span>
            <div className='field-item'>
              <div className='field-input email'>
                <div className='input-wrap'>
                  <input
                    type='text'
                    className='id'
                    placeholder='이메일을 입력하세요'
                    onChange={(e) => emailChange(e)}
                    ref={emailRef}
                  />
                  @
                  <input
                    type='text'
                    className='domain'
                    value={selectDomain}
                    onChange={(e) => setSelectDomain(e.target.value)}
                  />
                </div>
                <div className='domain-select'>
                  <select
                    onChange={(e: ChangeEvent | any) =>
                      setSelectDomain(e.target.value)
                    }
                  >
                    <option value=''>직접입력</option>
                    <option value='naver.com'>naver.com</option>
                    <option value='gmail.com'>gmail.com</option>
                    <option value='daum.net'>daum.net</option>
                    <option value='nate.com'>nate.com</option>
                  </select>
                </div>
              </div>

              {isEmail === false ? (
                <div className='Valid-errorTxt'>
                  <h1>이메일 형식에 맞게 입력해주세요.</h1>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-input'>
            <span className='field-title required'>휴대전화</span>
            <div className='field-item'>
              <div className='field-input phone'>
                <input
                  type='text'
                  onChange={(e) => phoneNumberChange(e)}
                  ref={phoneNumberRef}
                  value={phoneNumber}
                  placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)"
                />
              </div>
              {isCheckPhoneNumber === false ? (
                <div className='Valid-errorTxt'>
                  <h1>휴대전화를 올바르게 입력하세요.</h1>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* 프로필 정보 입력 폼 영역 */}
        <div className='profile-form'>
          <div className='form-title'>
            <h1>회원 프로필 입력</h1>
          </div>

          <div className='inner-wrap'>
            <div className='upload-image'>
              <label htmlFor='upload-img' className='upload-input'>
                {imageThumbnail ? (
                  <Image
                    src={imageThumbnail}
                    width='300'
                    height='300'
                    alt='업로드 이미지 미리보기'
                  />
                ) : (
                  <>
                    <div className='image-icon'>
                      <IoIosImages />
                    </div>
                    <div className='upload-text'>
                      <p>사진</p>
                      <span>
                        드래그하여 이미지를 첨부하거나 첨부 버튼으로 직접 첨부
                        가능합니다.
                      </span>
                    </div>
                  </>
                )}
              </label>
              <button
                type='button'
                className='upload-btn'
                onClick={(e) => handleUploadFile(e)}
              >
                파일 첨부
              </button>
              <input
                type='file'
                id='upload-img'
                onChange={uploadFile}
                ref={uploadFileRef}
              />
            </div>

            <div className='input-box'>
              <div className='form-input'>
                <span className='field-title'>아이디</span>
                <div className='field-item'>
                  <div className='field-input'>
                    <input
                      type='text'
                      onChange={(e) => idChange(e)}
                      ref={idRef}
                    />
                    {isUserId === false ? (
                      <div className='Valid-errorTxt'>
                        <h1>
                          영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다
                        </h1>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <button
                    type='button'
                    className='duplicate-check'
                    onClick={checkUserIdDuplication}
                  >
                    중복확인
                  </button>
                </div>
              </div>

              <div className='form-input'>
                <span className='field-title'>비밀번호</span>
                <div className='field-item'>
                  <div className='field-input'>
                    <input
                      type='password'
                      onChange={(e) => passwordChange(e)}
                      ref={passwordRef}
                    />
                    {isPassword === false ? (
                      <div className='Valid-errorTxt'>
                        <h1>
                          특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내로
                          입력해주세요.{" "}
                        </h1>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>

              <div className='form-input'>
                <span className='field-title'>비밀번호 확인</span>
                <div className='field-item'>
                  <div className='field-input'>
                    <input
                      type='password'
                      onChange={(e) => passwordCheck(e)}
                      ref={checkPassword}
                    />

                    {isCheckPassword === false ? (
                      <div className='Valid-errorTxt'>
                        <h1>입력하신 패스워드와 일치하지 않습니다.</h1>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='form-footer'>
          <div className='agree-form'>
            <div className='agree-guide'>
              <span className='desc'>
                회원가입약관 및 개인정보처리방침안내 내용에 동의 후 가입 진행이
                가능합니다.
              </span>
              <div className='select-all'>
                <input
                  type='checkbox'
                  id='all-check'
                  value='all'
                  onChange={(e) => selectAgreeChange(e)}
                />
                <label htmlFor='all-check'>전체 동의합니다.</label>
              </div>
            </div>

            <ul className='agree-list'>
              <li className='agree-menu'>
                <input
                  type='checkbox'
                  id='service-check'
                  value='service'
                  onChange={(e) => selectAgreeChange(e)}
                  checked={agreeState.service || agreeState.all}
                />
                <label htmlFor='service-check'>
                  회원가입약관의 내용에 동의합니다.
                </label>
              </li>

              <li className='agree-menu'>
                <input
                  type='checkbox'
                  id='guide-check'
                  value='guide'
                  onChange={(e) => selectAgreeChange(e)}
                  checked={agreeState.guide || agreeState.all}
                />
                <label htmlFor='guide-check'>
                  회원가입약관의 내용에 동의합니다.
                </label>
              </li>
            </ul>
          </div>

          <div className='btn-wrap'>
            <button
              type='button'
              onClick={(e) => createUser(e)}
              className='sign-button'
            >
              회원가입
            </button>

            <button
              type='button'
              onClick={() => router.replace("/login")}
              className='list-button'
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
