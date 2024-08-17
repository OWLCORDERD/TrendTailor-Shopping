import type { Metadata } from "next";
import AuthSession from "component/AuthSession";
import { ThemeProvider } from "../../context/ThemeContext";
import StyledComponentsRegistry from "./RootStyleRegistry";
import ReduxProvider from "store/provider/Provider";
import Navbar from "component/Main/Navbar";
import Footer from "component/Main/Footer";
import "app/globals.scss";

export const metadata: Metadata = {
  title: "WISH",
  openGraph: {
    title: "WISH",
    description:
      "WISH 쇼핑몰에서는 네이버 의류 API와 연동하여 트렌드 의류와 계절별 의류를 공유하고 유튜브 API와 연동하여 패션 트렌드 영상을 제공하는 포트폴리오 의류 사이트입니다.",
  },
  description:
    "WISH 쇼핑몰에서는 네이버 의류 API와 연동하여 트렌드 의류와 계절별 의류를 공유하고 유튜브 API와 연동하여 패션 트렌드 영상을 제공하는 포트폴리오 의류 사이트입니다.",
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
      <ReduxProvider>
        <html lang='ko'>
          <body>
            <StyledComponentsRegistry>
              <ThemeProvider>
                <Navbar />
                {children}
              </ThemeProvider>
              <Footer />
            </StyledComponentsRegistry>
          </body>
        </html>
      </ReduxProvider>
    </AuthSession>
  );
}
