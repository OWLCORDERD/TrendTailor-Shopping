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
  // 에러 메시지 토스트 메시지
  const errorToast = (str: string) => {
    return toast.error(str, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      closeButton: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const successToast = (str: string) => {
    return toast(str, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: false,
      type: "success",
      theme: "light",
    });
  };
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
  const [isUserIdDuplicate, setIsUserIdDuplicate] = useState<boolean>(false); // 아이디 중복 여부
  const [checkButtonClick, setCheckButtonClick] = useState<boolean>(false);

  // ** 이미지 업로드 관련 상태 값 ** //
  const [uploadImage, setUploadImage] = useState<File | undefined>(); // 업로드 이미지 파일 객체
  const [imageThumbnail, setImageThumbnail] = useState<string>(); // 업로드 이미지 미리보기 URL
  const [uploadImageUrl, setUploadImageUrl] = useState<string | undefined>(); // 이미지 DB 업로드 경로
  const validFileType = ["image/png", "image/jpg", "image/jpeg"]; // 허용 이미지 파일 확장자 타입

  /* 회원 정보 입력 창 Input Element useRef */
  const emailRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const CheckPassword = useRef<HTMLInputElement>(null);

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

  const checkUserIdDuplication = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isUserId) {
      axios
        .get("api/duplicationIdCheck", {
          params: {
            userName: registerInfo.id,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setIsUserIdDuplicate(data.duplicate);
          setCheckButtonClick(!checkButtonClick);
        })
        .catch((err) => {
          errorToast(err);
        });
    } else {
      errorToast("아이디를 정규식에 맞게 입력해주세요.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (isUserId) {
        if (isUserIdDuplicate) {
          errorToast("중복된 아이디입니다");
        } else {
          successToast("사용 가능한 아이디입니다");
        }
      }
    }, 1000);
  }, [checkButtonClick]);

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

  useEffect(() => {
    if (agreeState.all) {
      setAgreeState({
        ...agreeState,
        service: true,
        guide: true,
      });
    }
  }, [agreeState]);

  const createUser = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const currentEmail = `${registerInfo.email.id}@${registerInfo.email.domain}`;

    /*가입정보에 아무것도 입력하지 않았을 시 해당 입력창으로 focus 시킨 후 실행 종료 */
    if (registerInfo.username.length === 0 && idRef.current) {
      errorToast("아이디를 입력해주세요.");
      return idRef.current.focus();
    } else if (registerInfo.password.length === 0 && passwordRef.current) {
      errorToast("비밀번호를 입력해주세요.");
      return passwordRef.current.focus();
    } else if (
      registerInfo.email.id === "" ||
      registerInfo.email.domain === "" ||
      currentEmail === "@"
    ) {
      errorToast("이메일을 입력해주세요.");
      return emailRef.current?.focus();
    } else if (CheckPassword.current && !isCheckPassword) {
      errorToast("입력하신 비밀번호를 확인해주세요.");
      return CheckPassword.current.focus();
    } else if (phoneNumber.length === 0) {
      errorToast("휴대전화를 입력해주세요.");
      return;
    } else if (registerInfo.username.length === 0) {
      errorToast("성명을 입력해주세요.");
      return;
    }

    /* 가입정보에 정규식 혹은 조건에 맞지 않은 값을 입력했을 시 해당 입력창에 focus 시킨 후 실행 종료*/
    if (isUserIdDuplicate && idRef.current) {
      errorToast("아이디 중복확인을 진행해주세요.");
      return idRef.current.focus();
    } else if (isEmail === false && emailRef.current) {
      errorToast("이메일을 올바르게 입력해주세요.");
      return emailRef.current.focus();
    } else if (isPassword === false && passwordRef.current) {
      errorToast("비밀번호를 올바르게 입력해주세요.");
      return passwordRef.current.focus();
    } else if (isCheckPassword === false && CheckPassword.current) {
      errorToast("비밀번호를 다시 확인해주세요.");
      return CheckPassword.current.focus();
    }

    if (!agreeState.service || !agreeState.guide) {
      errorToast("약관에 동의해 주세요.");
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
          console.log(res.status + "error status");
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
          router.replace("/signin");
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
                <input type='text' onChange={(e) => usernameChange(e)} />
                {isName === false ? (
                  <div className='Valid-errorTxt'>
                    <h1>2~8글자 이내로 입력해주세요.</h1>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className='form-input'>
            <span className='field-title required'>이메일</span>
            <div className='field-item email'>
              <div className='field-input'>
                <div className='input-wrap'>
                  <input
                    type='text'
                    className='id'
                    placeholder='email@example.com'
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
                {isEmail === false ? (
                  <div className='Valid-errorTxt'>
                    <h1>이메일 형식에 맞게 입력해주세요.</h1>
                  </div>
                ) : null}
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
          </div>

          <div className='form-input'>
            <span className='field-title required'>휴대전화</span>
            <div className='field-item'>
              <div className='field-input'>
                <input
                  type='text'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
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
              <button type='button' className='upload-btn'>
                파일 첨부
              </button>
              <input type='file' id='upload-img' onChange={uploadFile} />
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
                          아이디는 영문자로 시작하는 6~20자 영문자 또는
                          숫자이어야 합니다
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
                      ref={CheckPassword}
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
                  onChange={(e) =>
                    setAgreeState({
                      ...agreeState,
                      all: e.target.checked,
                    })
                  }
                />
                <label htmlFor='all-check'>전체 동의합니다.</label>
              </div>
            </div>

            <ul className='agree-list'>
              <li className='agree-menu'>
                <input
                  type='checkbox'
                  id='service-check'
                  onChange={(e) =>
                    setAgreeState({
                      ...agreeState,
                      service: e.target.checked,
                    })
                  }
                  checked={agreeState.service}
                />
                <label htmlFor='service-check'>
                  회원가입약관의 내용에 동의합니다.
                </label>
              </li>

              <li className='agree-menu'>
                <input
                  type='checkbox'
                  id='guide-check'
                  onChange={(e) =>
                    setAgreeState({
                      ...agreeState,
                      guide: e.target.checked,
                    })
                  }
                  checked={agreeState.guide}
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
