"use client";

import React, { useRef, useState } from "react";
import "app/globals.scss";
import "styles/register.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "component/Main/Navbar";

interface infoType {
  email: string;
  password: string;
  username: string;
  checkPassword: string;
}

const Register = () => {
  /* 가입정보의 모든 value 값 저장 & 관리 하는 프로퍼티 객체 값 */
  const [registerInfo, setRegisterInfo] = useState<infoType>({
    email: "",
    password: "",
    username: "",
    checkPassword: "",
  });

  /* 아이디, 비밀번호, 비밀번호 확인, 이메일 유효성 검증 결과 상태 값
  결과 true면 error X | false 일시 error div 태그 반환 */
  const [isName, setIsName] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isCheck, setIsCheck] = useState<boolean>(true);

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
        email: e.target.value,
        password: registerInfo.password,
        username: registerInfo.username,
        checkPassword: registerInfo.checkPassword,
      });
    }
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const currentPassword = e.target.value;

    /*비밀번호 정규식*/
    const regPassword =
      /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    /* 비밀번호 정규식에 사용자가 입력한 value 값으로 테스트*/
    if (!regPassword.test(currentPassword)) {
      /* 틀리면 isPassword 유효성 검증 결과 false 조건 반환 후 error div 태그 반환*/
      setIsPassword(false);
    } else {
      /* 일치하면 isPassword 유효성 검증 결과 true 반환 후 registerInfo 상태 객체 password 속성 값 업데이트*/
      setIsPassword(true);

      setRegisterInfo({
        email: registerInfo.email,
        password: e.target.value,
        username: registerInfo.username,
        checkPassword: registerInfo.checkPassword,
      });
    }
  };

  const passwordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    /* 사용자가 비밀번호 Input 칸에서 올바르게 입력한 값과 비교 */
    if (registerInfo.password !== e.target.value) {
      /* 비밀번호와 값이 틀릴 경우 isCheck false 반환 후 error div 태그 반환*/
      setIsCheck(false);
    } else {
      /* 비밀번호와 확인 값이 같을 경우 true 반환 후 checkPassword값 업데이트 */
      setIsCheck(true);
      setRegisterInfo({
        email: registerInfo.email,
        password: registerInfo.password,
        username: registerInfo.username,
        checkPassword: e.target.value,
      });
    }
  };

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const currentName = e.target.value;

    /* 아이디 입력 값이 2글자 이하 8글자 이상일 시, false 반환 후 error div 태그 반환 */
    if (e.target.value.length < 2 || currentName.length > 8) {
      setIsName(false);
    } else {
      setIsName(true);
      setRegisterInfo({
        email: registerInfo.email,
        password: registerInfo.password,
        username: e.target.value,
        checkPassword: registerInfo.checkPassword,
      });
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
    } else if (
      CheckPassword.current &&
      registerInfo.checkPassword.length === 0
    ) {
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
    } else if (isCheck === false && CheckPassword.current) {
      alert("비밀번호를 다시 확인해주세요.");
      return CheckPassword.current.focus();
    }

    /* 위의 유효성 검증에서 모두 통과할 시 새로운 data 객체에 필요 정보만 담아서 유저 정보 생성 */
    const data = {
      email: registerInfo.email,
      password: registerInfo.password,
      username: registerInfo.username,
    };

    /* 유저 정보를 DB에 저장하기 위하여 post 메소드로 data 값 전달 */
    const res = await axios.post("/api/user", data);

    /* user 라우터에서 DB 연동과 로직 정상적으로 작동 되었을 시 로그인 페이지로 이동 */
    if (res.status === 200) {
      router.replace("/signin");
    } else {
      console.log(res.status + "error status");
    }
  };

  return (
    <div className='register-container'>
      <Navbar />
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
          <div className='input-username' id={isName === true ? "active" : ""}>
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

            <button type='button' className='duplicate-button'>
              중복 검사
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

          <div className='input-password' id={isCheck === true ? "active" : ""}>
            <label>비밀번호 확인</label>
            <div className='password-InputBox'>
              <input
                type='password'
                onChange={(e) => passwordCheck(e)}
                ref={CheckPassword}
              />

              {isCheck === false ? (
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
