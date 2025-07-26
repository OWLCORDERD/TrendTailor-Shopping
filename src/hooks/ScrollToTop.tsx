"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RxDoubleArrowUp } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

export function ScrollToTop({ type }: { type: string | undefined }) {
  const pathname = usePathname();

  const [scrollY, setScrollY] = useState<number>(0);

  // 페이지 이동간에 최상단으로 스크롤 처리
  useEffect(() => {
    if (type === "routeMove") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // 2025.07.26: 사용자 실시간 스크롤 위치 추출 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setScrollY(0); // 기존 스크롤 위치 값 초기화
    };
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {type === "click" && scrollY > 100 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          type='button'
          onClick={() => scrollTop()}
          className='scroll-btn'
        >
          <RxDoubleArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
