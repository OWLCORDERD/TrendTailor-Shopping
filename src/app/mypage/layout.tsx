import type { Metadata } from "next";

// 2026.10.25: 마이홈은 로그인 사용자 전용 페이지라 검색 엔진 색인 제외
export const metadata: Metadata = {
  title: "마이홈",
  description:
    "내 정보와 Trendly AI 컨설팅 결과, 최근 활동과 스타일 프로필을 한 곳에서 확인하세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
