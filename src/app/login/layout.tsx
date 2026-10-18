import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "TrendTailor 정회원 로그인 또는 카카오 간편 로그인 페이지입니다.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
