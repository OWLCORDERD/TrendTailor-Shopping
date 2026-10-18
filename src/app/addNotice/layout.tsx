import type { Metadata } from "next";

// 2026.10.18: 관리용 작성 페이지는 검색 결과에서 제외
export const metadata: Metadata = {
  title: "공지사항 작성",
  robots: { index: false, follow: false },
};

export default function AddNoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
