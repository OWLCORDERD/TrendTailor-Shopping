"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";

interface ReactType {
  children: React.ReactNode;
}

interface modalType {
  showModal?: boolean;
  title?: string;
  type?: string;
  contComponent?: string;
  modalOpen?: React.EventHandler<React.MouseEvent>;
  modalClose?: React.EventHandler<React.MouseEvent>;
}

export const ModalContext = React.createContext<modalType>({});

export const ModalProvider = ({ children }: ReactType) => {
  // 모달 활성화 여부
  const [showModal, setShowModal] = useState<boolean>(false);

  // 모달 제목
  const [title, setTitle] = useState<string>("");

  // 컨텐츠 영역 동적 렌더링 컴포넌트 경로
  const [contComponent, setContComponent] = useState<string>("");

  // 모달 유형 (ex: warning, confirm 등)
  const [type, setType] = useState<string>("");

  // 모달 활성화 업데이트 메소드
  const modalOpen = ({ title, dynamicComponent, type }: any) => {
    setShowModal(true);

    setTitle(title);

    setContComponent(dynamicComponent);

    setType(type);
  };

  const dynamicContent = useMemo(() => {
    if (!contComponent) return null;

    const DynamicComponent = dynamic(
      () => import(`@/component/common/modal/content/${contComponent}`),
      {
        ssr: false,
      }
    );

    return <DynamicComponent />;
  }, [contComponent]);

  // 모달 비활성화 업데이트 메소드
  const modalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowModal(false);
    setTitle(title);
    setContComponent("");
    setType("");
  };

  const router = useRouter();

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push("/login");
  };

  // 모달 영역 렌더링 애니메이션
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

  return (
    <ModalContext.Provider
      value={{ showModal, title, type, contComponent, modalOpen, modalClose }}
    >
      {children}
      {showModal && (
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
                onClick={(e) => modalClose(e)}
              >
                <IoIosClose fontSize={30} color='#000' />
              </button>
            </div>
            <div className='modal-cont'>{dynamicContent}</div>

            <div className='btn-wrap'>
              {type === "login" && (
                <button
                  type='button'
                  className='login-btn'
                  onClick={(e) => login(e)}
                >
                  로그인 하러가기
                </button>
              )}

              <button
                type='button'
                className='close-btn'
                onClick={(e) => modalClose(e)}
              >
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
