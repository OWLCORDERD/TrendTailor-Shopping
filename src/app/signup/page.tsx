"use client";

import React, { useRef, useState } from "react";
import "app/globals.scss";
import "styles/register.scss";
import axios from "axios";
import { useRouter } from "next/navigation";

interface infoType {
  email: string;
  password: string;
  username: string;
}

const page = () => {
  const [registerInfo, setRegisterInfo] = useState<infoType>({
    email: "",
    password: "",
    username: "",
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setRegisterInfo({
      email: e.target.value,
      password: registerInfo.password,
      username: registerInfo.username,
    });
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setRegisterInfo({
      email: registerInfo.email,
      password: e.target.value,
      username: registerInfo.username,
    });
  };

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setRegisterInfo({
      email: registerInfo.email,
      password: registerInfo.password,
      username: e.target.value,
    });
  };

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerInfo.username === "" && idRef.current) {
      alert("아이디를 입력해주세요.");
      return idRef.current.focus();
    } else if (registerInfo.password === "" && passwordRef.current) {
      alert("비밀번호를 입력해주세요.");
      return passwordRef.current.focus();
    } else if (registerInfo.email === "" && emailRef.current) {
      alert("이메일을 입력해주세요.");
      return emailRef.current.focus();
    }

    const data = {
      email: registerInfo.email,
      password: registerInfo.password,
      username: registerInfo.username,
    };

    const res = await axios.post("/api/user", data);

    if (res.status === 200) {
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
          <div className='input-username'>
            <label>아이디</label>
            <div className='username-inputBox'>
              <input
                type='text'
                onChange={(e) => usernameChange(e)}
                ref={idRef}
              />
              <button type='button' className='duplicate-button'>
                중복 검사
              </button>
            </div>
          </div>

          <div className='input-password'>
            <label>비밀번호</label>
            <input
              type='password'
              onChange={(e) => passwordChange(e)}
              ref={passwordRef}
            />
          </div>

          <div className='input-email'>
            <label>이메일</label>
            <input
              type='text'
              placeholder='email@example.com'
              onChange={(e) => emailChange(e)}
              ref={emailRef}
            />
          </div>

          <button type='submit' className='signup-button'>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
