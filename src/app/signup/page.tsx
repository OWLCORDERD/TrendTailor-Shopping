"use client";

import React, { useRef, useState } from "react";
import "app/globals.scss";
import "styles/register.scss";
import { useRouter } from "next/navigation";
import axios from "axios";

interface infoType {
  email: string;
  password: string;
  username: string;
}

const Register = () => {
  /* 가입정보의 모든 value 값 저장 & 관리 하는 프로퍼티 객체 값 */
  const [registerInfo, setRegisterInfo] = useState<infoType>({
    email: "",
    password: "",
    username: "",
  });

  /* 아이디, 비밀번호, 비밀번호 확인, 이메일 유효성 검증 결과 상태 값
  결과 true면 error X | false 일시 error div 태그 반환 */
  const [isName, setIsName] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(true);

  /* 회원 정보 입력 창 Input Element useRef */
  const emailRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const CheckPassword = useRef<HTMLInputElement>(null);

  const router = useRouter();

  /* 이메일 Input Element Onchange 이벤트 리스너 */
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const currentEmail = e.target.value;

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
      setRegisterInfo({
        email: currentEmail,
        password: registerInfo.password,
        username: registerInfo.username,
      });
    }
  };

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
        email: registerInfo.email,
        password: current_password,
        username: registerInfo.username,
      });
    }
  };

  const passwordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    /* 사용자가 비밀번호 Input 칸에서 올바르게 입력한 값과 비교 */
    if (registerInfo.password !== e.target.value) {
      /* 비밀번호와 값이 틀릴 경우 isCheck false 반환 후 error div 태그 반환*/
      setIsCheckPassword(false);
    } else {
      /* 비밀번호와 확인 값이 같을 경우 true 반환 후 checkPassword값 업데이트 */
      setIsCheckPassword(true);
      setRegisterInfo({
        email: registerInfo.email,
        password: e.target.value,
        username: registerInfo.username,
      });
    }
  };

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const current_id = e.target.value;

    /* 아이디 입력 값이 2글자 이하 8글자 이상일 시, false 반환 후 error div 태그 반환 */
    if (current_id.length < 2 || current_id.length > 8) {
      setIsName(false);
    } else {
      setIsName(true);
      setRegisterInfo({
        email: registerInfo.email,
        password: registerInfo.password,
        username: current_id,
      });
    }
  };

  const checkId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isName) {
      axios
        .get("api/duplicationIdCheck", {
          params: {
            currentId: registerInfo.username,
          },
        })
        .then((res) => res.data);
    }
  };

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /*가입정보에 아무것도 입력하지 않았을 시 해당 입력창으로 focus 시킨 후 실행 종료 */
    if (registerInfo.username.length === 0 && idRef.current) {
      alert("아이디를 입력해주세요.");
      return idRef.current.focus();
    } else if (registerInfo.password.length === 0 && passwordRef.current) {
      alert("비밀번호를 입력해주세요.");
      return passwordRef.current.focus();
    } else if (registerInfo.email.length === 0 && emailRef.current) {
      alert("이메일을 입력해주세요.");
      return emailRef.current.focus();
    } else if (CheckPassword.current && !isCheckPassword) {
      alert("입력하신 비밀번호를 확인해주세요.");
      return CheckPassword.current.focus();
    }

    /* 가입정보에 정규식 혹은 조건에 맞지 않은 값을 입력했을 시 해당 입력창에 focus 시킨 후 실행 종료*/
    if (isName === false && idRef.current) {
      alert("아이디를 올바르게 입력해주세요.");
      return idRef.current.focus();
    } else if (isEmail === false && emailRef.current) {
      alert("이메일을 올바르게 입력해주세요.");
      return emailRef.current.focus();
    } else if (isPassword === false && passwordRef.current) {
      alert("비밀번호를 올바르게 입력해주세요.");
      return passwordRef.current.focus();
    } else if (isCheckPassword === false && CheckPassword.current) {
      alert("비밀번호를 다시 확인해주세요.");
      return CheckPassword.current.focus();
    }

    /* 위의 유효성 검증을 모두 통과할 시 생성할 회원 정보 데이터를 하나의 객체로 묶어서 전송 */
    const data = {
      email: registerInfo.email,
      password: registerInfo.password,
      username: registerInfo.username,
    };

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
  };

  return (
    <div className='register-container'>
      <div className='register-wrap'>
        <div className='register-titleBox'>
          <h1 className='register-title'>Join us wish</h1>
          <p className='register-subTitle'>
            wish 정회원에 가입하여 더욱 더 많은 정보와 컨텐츠들을 이용해보세요.
          </p>
        </div>
        <form
          action='post'
          className='register-form'
          onSubmit={(e) => createUser(e)}
        >
          <div className='registerForm-title'>
            <h1>가입정보</h1>
          </div>
          <div className='input-id' id={isName === true ? "active" : ""}>
            <label>아이디</label>
            <div className='username-inputBox'>
              <input
                type='text'
                onChange={(e) => usernameChange(e)}
                ref={idRef}
              />
              {isName === false ? (
                <div className='Valid-errorTxt'>
                  <h1>아이디는 2글자에서 8글자 사이로 입력해주세요.</h1>
                </div>
              ) : null}
            </div>
            <button
              className='idCheck-button'
              type='button'
              onClick={(e) => checkId(e)}
            >
              중복 확인
            </button>
          </div>

          <div
            className='input-password'
            id={isPassword === true ? "active" : ""}
          >
            <label>비밀번호</label>
            <div className='password-InputBox'>
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
              ) : null}
            </div>
          </div>

          <div
            className='input-password'
            id={isCheckPassword === true ? "active" : ""}
          >
            <label>비밀번호 확인</label>
            <div className='password-InputBox'>
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

          <div className='input-email'>
            <label>이메일</label>
            <div className='email-inputBox'>
              <input
                type='text'
                placeholder='email@example.com'
                onChange={(e) => emailChange(e)}
                ref={emailRef}
              />
              {isEmail === false ? (
                <div className='Valid-errorTxt'>
                  <h1>이메일 형식에 맞게 입력해주세요.</h1>
                </div>
              ) : null}
            </div>
          </div>

          <button type='submit' className='signup-button'>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
