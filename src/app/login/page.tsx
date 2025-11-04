"use client";

import { useEffect, useState } from "react";
import "styles/signIn.scss";
import { RiKakaoTalkFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { chatClose } from "@/store/chatBubbleSlice";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

interface queryType {
  userId: string;
  password: string;
}

const Login = () => {
  const [loginQuery, setLoginQuery] = useState<queryType>({
    userId: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const chatOpen = useAppSelector((state) => state.chatBubble.chatOpen);

  const router = useRouter();
  const { status } = useSession();

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoginQuery({
      userId: e.target.value,
      password: loginQuery.password,
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoginQuery({
      userId: loginQuery.userId,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId: string = loginQuery.userId;

    const password: string = loginQuery.password;

    const result = await signIn("credentials", {
      redirect: false,
      userId: userId,
      password: password,
    });

    if (!result?.error) {
      router.push("/");
    } else {
      alert("없는 정보이거나 비밀번호가 올바르지 않습니다.");
      return;
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }

    // 챗봇 컨테이너가 열려있을 시, 컨테이너 닫기
    if (chatOpen) {
      dispatch(chatClose());
    }
  }, []);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <div className='title-wrap'>
          <h1 className='title'>LOGIN</h1>
          <p className='sub-txt'>
            정회원 로그인 혹은 카카오 간편 로그인을 통해 서비스를 이용하실 수
            있습니다.
          </p>
        </div>

        <div className='login-box'>
          <form className='input-box' onSubmit={(e) => handleSubmit(e)}>
            <div className='input-wrap'>
              <FaUserAlt className='input-icon' />

              <input
                type='text'
                placeholder='아이디를 입력하세요.'
                onChange={(e) => handleChangeUserId(e)}
              ></input>
            </div>

            <div className='input-wrap'>
              <RiLockPasswordFill className='input-icon' />
              <input
                type='password'
                onChange={(e) => handleChangePassword(e)}
                placeholder='비밀번호를 입력하세요.'
              ></input>
            </div>

            <button type='submit' className='login-button'>
              로그인
            </button>

            <div className='signup-form'>
              <h1 className='signup-question'>
                TrendTailor 회원이 아니신가요?
              </h1>
              <Link href='/signup' className='signup-link'>
                회원가입하기
              </Link>
            </div>
          </form>

          <div className='form-line'>
            <span className='line'></span>
            <span className='line-text'>또는</span>
          </div>

          <button
            type='button'
            className='kakao-button'
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
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
