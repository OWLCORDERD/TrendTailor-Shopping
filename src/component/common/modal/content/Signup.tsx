"use client";

import React, { useContext } from "react";
import { ModalContext } from "../../../../../context/ModalContext";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Login = () => {
  const { title, modalClose } = useContext(ModalContext);

  return (
    <div className='cont-wrapper'>
      <div className='title-box success'>
        <FaCircleCheck className='title-icon' />
        <h2 className='title'>{title}</h2>
      </div>

      <div className='content-box'>
        <p className='desc'>
          Trendtailer 회원이 되신걸 환영합니다!
          <br />
          로그인 페이지로 이동하시겠습니까?
        </p>
      </div>
    </div>
  );
};

export default Login;
