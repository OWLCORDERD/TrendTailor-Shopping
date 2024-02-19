"use client";

import { useRef, useEffect, useState } from "react";
import "styles/signIn.scss";
import { RiKakaoTalkFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "component/Main/Navbar";

interface queryType {
  userEmail: string;
  password: string;
}

const Login = () => {
  const [loginQuery, setLoginQuery] = useState<queryType>({
    userEmail: "",
    password: "",
  });

  const TypeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoginQuery({
      userEmail: e.target.value,
      password: loginQuery.password,
    });
  };

  const TypePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoginQuery({
      userEmail: loginQuery.userEmail,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email: string = loginQuery.userEmail;

    const password: string = loginQuery.password;

    const result = await signIn("credentials", {
      redirect: false,
      userEmail: email,
      password: password,
    });

    if (!result?.error) {
      router.replace("/");
    } else {
      console.log(result);
      alert("없는 정보이거나 비밀번호가 올바르지 않습니다.");
    }
  };

  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className='loginPage-container'>
      <Navbar />
      <div className='login-wrapper'>
        <div className='loginPage-titleBox'>
          <h1 className='login-title'>LOGIN</h1>
          <p className='login-subTitle'>
            정회원 로그인 혹은 카카오 간편 로그인을 통해 서비스를 이용하실 수
            있습니다.
          </p>
        </div>

        <div className='login-Box'>
          <form
            className='loginPage-InputBox'
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type='text'
              placeholder='example@naver.com'
              onChange={(e) => TypeEmail(e)}
            ></input>
            <input type='password' onChange={(e) => TypePassword(e)}></input>

            <button type='submit' className='login-button'>
              로그인
            </button>

            <div className='signup-form'>
              <h1 className='signup-question'>New to Wish?</h1>
              <Link href='/signup' className='signup-link'>
                Create an acount
              </Link>
            </div>
          </form>

          <div className='login-Boxline'>
            <span className='line'></span>
            <span className='line-text'>또는</span>
          </div>

          <button
            type='button'
            className='kakaoLogin-button'
            onClick={() => signIn("kakao")}
          >
            <RiKakaoTalkFill className='kakao' />
            <span>카카오 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
