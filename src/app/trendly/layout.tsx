import type { Metadata } from "next";

// 2026.10.18: trendly 페이지는 "use client" 컴포넌트라 레이아웃에서 metadata 지정
export const metadata: Metadata = {
  title: "Trendly AI 패션 컨설팅",
  description:
    "AI 스타일 추천 챗봇 Trendly에게 선호 키워드를 알려주고 트렌드 의류 추천과 패션 컨설팅 리포트를 받아보세요.",
};

export default function TrendlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
