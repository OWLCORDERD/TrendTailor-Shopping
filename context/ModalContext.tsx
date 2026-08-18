"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import "@/styles/modal.scss";
import ModalContentRenderer from "@/component/common/modal/DynamicComponent";

interface ReactType {
  children: React.ReactNode;
}

type ModalCallback = () => void | Promise<void>;

interface modalType {
  showModal?: boolean; // 모달 활성화 여부
  contents?: { title: string, description?: string }; // 모달 제목 및 보조 설명 텍스트
  type?: string; // 모달 유형 (ex: warning, confirm 등)
  // 동적 렌더링 관련 설정
  dynamic?: {
    componentPath: string;
  };
  modalOpen?: (args: {
    title: string;
    content?: string;
    type?: string;
    dynamicComponent?: string;
    fn?: ModalCallback;
  }) => void;
  modalClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ModalContext = React.createContext<modalType>({});

export const ModalProvider = ({ children }: ReactType) => {
  // 모달 활성화 여부
  const [showModal, setShowModal] = useState<boolean>(false);

  // 모달 제목 및 컨텐츠
  const [contents, setContents] = useState
  <{ title: string, description?: string }>({ title: "", description: "" });

  // 동적 렌더링 요소 관련 설정
  const [dynamic, setDynamic] = useState<{ componentPath: string }>({
    componentPath: "", // 컨텐츠 영역 동적 렌더링 컴포넌트 경로
  });

  // useState에 함수를 넣으면 updater로 즉시 실행되므로 Ref 보관 처리
  const emitFnRef = useRef<ModalCallback | null>(null);
  // 코드 실행 중 여부 상태
  const [isConfirming, setIsConfirming] = useState(false);

  // 모달 유형 (ex: warning, confirm 등)
  const [type, setType] = useState<string>("");

  // 모달 활성화 업데이트 메소드
  const modalOpen = ({ title, dynamicComponent, type, content, fn }: {
    title: string;
    dynamicComponent?: string;
    type?: string;
    content?: string;
    fn?: ModalCallback;
  }) => {
    // 모달 활성화
    setShowModal(true);
    setIsConfirming(false);

    // 보조 설명 텍스트가 존재하는 경우 설정
    if (content && content.trim() !== "") {
      setContents({ title, description: content });
      setDynamic({
        componentPath: "Slot",
      });
    } else {
      setContents({ title: title || "" });
      // 동적 컨텐츠 컴포넌트 경로 설정
      setDynamic({
        componentPath: dynamicComponent ?? "",
      });
    }

    setType(type ?? "");
    emitFnRef.current = typeof fn === "function" ? fn : null;
  };

  // 모달 닫기(비활성화) 초기화 함수
  const modalClose = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setShowModal(false); // 모달 비활성화
    setContents({ title: "", description: "" }); // 제목 및 보조 설명 텍스트 초기화
    setDynamic({
      componentPath: "",
    }); // 동적 컨텐츠 컴포넌트
    setType(""); // 유형
    setIsConfirming(false);
    emitFnRef.current = null;
  };

  const handleConfirm = async () => {
    if (!emitFnRef.current || isConfirming) return;

    setIsConfirming(true);
    try {
      await emitFnRef.current();
      modalClose();
    } catch (error) {
      console.error(error);
      setIsConfirming(false);
    }
  };

  const router = useRouter();

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    modalClose(e);

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
      value={{ showModal, contents, type, dynamic, modalOpen, modalClose }}
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
            <div className='modal-cont'>
              <ModalContentRenderer {...dynamic} />
            </div>

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

              {type === "code" && (
                <button
                  type='button'
                  className='login-btn'
                  onClick={handleConfirm}
                  disabled={isConfirming}
                >
                  {isConfirming ? "실행 중..." : "코드 실행"}
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
