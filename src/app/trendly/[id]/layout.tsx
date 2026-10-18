import type { Metadata } from "next";

// 2026.10.18: 회원별 컨설팅 결과 페이지는 검색 결과에서 제외
export const metadata: Metadata = {
  title: "Trendly AI 컨설팅 결과",
  robots: { index: false, follow: true },
};

export default function TrendlyResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
