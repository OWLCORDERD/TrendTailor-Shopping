import "./globals.scss";
import type { Metadata } from "next";
import { ThemeProvider } from "../../context/ThemeContext";
import AuthSession from "component/AuthSession";
import Head from "next/head";

export const metadata: Metadata = {
  title: "WISH | SHOPPING SITE",
  description:
    "Wearing Interface Shopping Homepage, 트렌드 의류 정보를 공유하고 추천하며 다양한 의류를 판매하는 위시 의류 사이트입니다.",
  keywords: "옷, 트렌드, 의류, 쇼핑, 상점, 유튜브, 의류 트렌드, 스타일, 유행",
  verification: {
    google: "Y46ulKgr26amG4IdAHROTHgXqKB2TH_SF7iHftuFkH0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSession>
      <html lang='ko'>
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </AuthSession>
  );
}
