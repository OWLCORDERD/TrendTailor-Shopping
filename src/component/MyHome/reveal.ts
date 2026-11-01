import { useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

// 2026.10.25. 마이홈 섹션 진입 모션 (제목 → 본문 → 이미지 순차 노출, 1회만 재생)
// - transform / opacity만 사용, 모션 최소화 설정 시 이동 없이 즉시 노출
export const revealGroup = (reduce: boolean | null): Variants => ({
  hidden: {},
  show: {
    transition: reduce ? {} : { staggerChildren: 0.08 },
  },
});

export const revealItem = (reduce: boolean | null): Variants => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
});

export const revealViewport = { once: true, amount: 0.2 };

export const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}.${month}.${day}`;
};

export const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, revealViewport);
  return { ref, initial: 'hidden', animate: inView ? 'show' : 'hidden' } as const;
}
