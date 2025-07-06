import type { Metadata } from "next";
import AuthSession from "@/component/common/AuthSession";
import { ThemeProvider } from "../../context/ThemeContext";
import StyledComponentsRegistry from "./RootStyleRegistry";
import ReduxProvider from "store/provider/Provider";
import Navbar from "component/Main/Navbar";
import Footer from "component/Main/Footer";
import QuickMenu from "component/Main/QuickMenu";
import { ScrollToTop } from "utils/hooks/ScrollToTop";
import "./globals.scss";

export const metadata: Metadata = {
  title: "TrendTailor",
  openGraph: {
    title: "TrendTailor, 트렌드를 재단해보세요.",
    description:
      "WISH 쇼핑몰에서는 네이버 의류 API와 연동하여 트렌드 의류와 계절별 의류를 공유하고 유튜브 API와 연동하여 패션 트렌드 영상을 제공하는 포트폴리오 의류 사이트입니다.",
  },
  description:
    "WISH 쇼핑몰에서는 네이버 의류 API와 연동하여 트렌드 의류와 계절별 의류를 공유하고 유튜브 API와 연동하여 패션 트렌드 영상을 제공하는 포트폴리오 의류 사이트입니다.",
  verification: {
    google: "Y46ulKgr26amG4IdAHROTHgXqKB2TH_SF7iHftuFkH0",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 로그인 인증 전역 nextAuth Provider */}
      <AuthSession>
        {/* 전역 상태관리 redux Provider */}
        <ReduxProvider>
          {/* 스타일 컴포넌트 SSR Preload 레지스트리 */}
          <StyledComponentsRegistry>
            {/* 스크롤 상단 이동 */}
            <ScrollToTop />
            <html lang='ko'>
              <body>
                <QuickMenu />
                <ThemeProvider>
                  <Navbar />
                  <main style={{ minHeight: "100vh" }}>{children}</main>
                </ThemeProvider>
                <Footer />
              </body>
            </html>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </AuthSession>
    </>
  );
}
