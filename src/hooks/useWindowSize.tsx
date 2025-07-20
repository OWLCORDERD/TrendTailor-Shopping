"use client";

import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState<windowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 리사이징 이벤트 실행 시마다 호출되어 사이즈 값 업데이트
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    // 리사이징 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 리사이징 컴포넌트 언마운트 시, 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
