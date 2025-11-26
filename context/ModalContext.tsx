"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import "@/styles/modal.scss";
import Loading from "@/component/fetchDB/loading/Loading";

interface ReactType {
  children: React.ReactNode;
}

interface modalType {
  showModal?: boolean;
  title?: string;
  type?: string;
  contComponent?: string;
  modalOpen?: (args: {
    title: string;
    dynamicComponent: string;
    type: string;
  }) => void;
  modalClose?: () => void;
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

  const DynamicComponent = {
    LoginContent: dynamic(
      () => import(`@/component/common/modal/content/Login`),
      {
        ssr: false,
        loading: () => <Loading colorTheme='#2D3A8C' height={300} />,
      }
    ),
    ServiceContent: dynamic(
      () => import(`@/component/common/modal/content/Service`),
      {
        ssr: false,
        loading: () => <Loading colorTheme='#2D3A8C' height={300} />,
      }
    ),
    SignupComplete: dynamic(
      () => import(`@/component/common/modal/content/Signup`),
      {
        ssr: false,
        loading: () => <Loading colorTheme='#2D3A8C' height={300} />,
      }
    ),
  };

  const dynamicContent = useMemo(() => {
    if (!contComponent) return null;

    const Component =
      DynamicComponent[contComponent as keyof typeof DynamicComponent];

    return Component ? <Component /> : null;
  }, [contComponent]);

  // 모달 닫기(비활성화) 초기화 함수
  const modalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(false); // 모달 비활성화
    setTitle(""); // 제목 
    setContComponent(""); // 동적 컨텐츠 컴포넌트
    setType(""); // 유형
  };

  const router = useRouter();

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    modalClose();

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
                <IoIosClose color='#000' />
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
