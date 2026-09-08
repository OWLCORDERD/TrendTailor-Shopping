'use client';

import React, { useContext } from 'react';
import { ModalContext } from '../../../../../context/ModalContext';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { contents, modalClose } = useContext(ModalContext);

  const router = useRouter();

  const goSignupPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (modalClose) {
      modalClose(e);
    }

    router.push('/signup');
  };
  return (
    <div className="cont-wrapper">
      <div className="title-box danger">
        <RiErrorWarningFill className="title-icon" />
        <h2 className="title">{contents?.title}</h2>
      </div>

      <div className="content-box">
        <p className="desc">
          로그인하여 TrendlyAI 챗봇 서비스를 이용할 수 있습니다.
        </p>

        <button
          type="button"
          className="signup-link"
          onClick={e => goSignupPage(e)}
        >
          <span>혹시 TrendTailor 회원이 아니신가요?</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
