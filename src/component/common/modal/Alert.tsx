import React from "react";
import "@/styles/modal.scss";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import { exit } from "process";
import { useRouter } from "next/navigation";

interface modalProps {
  type: string;
  title: string;
  content: string;
}

const AlertModal = ({ type, title, content }: modalProps) => {
  // 모달 활성화 헨들러
  const dispatch = useAppDispatch();

  const animateVariants = {
    initial: {
      opacity: 0,
      left: "50%",
      translateX: "-50%",
      translateY: "-50%",
      y: -50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      left: "50%",
      translateX: "-50%",
      translateY: "-50%",
      y: -50,
    },
  };

  const router = useRouter();

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(closeModal());
    // 로그인 페이지로 이동
    router.push("/login");
  };

  return (
    <div className='alert-modal'>
      <motion.div
        className='modal-inner'
        variants={animateVariants}
        animate='animate'
        initial='initial'
        exit='exit'
      >
        <div className='modal-header'>
          <button
            className='close-btn'
            type='button'
            onClick={() => dispatch(closeModal())}
          >
            <IoIosClose fontSize={30} color='#fff' />
          </button>
        </div>
        <div className='modal-cont'>
          <p className='title'>{title}</p>
          <span className='cont'>{content}</span>
        </div>

        <div className='btn-wrap'>
          {type === "login" && (
            <button type='button' className='login-btn' onClick={() => login()}>
              로그인 하러가기
            </button>
          )}

          <button
            type='button'
            className='close-btn'
            onClick={() => dispatch(closeModal())}
          >
            닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AlertModal;
