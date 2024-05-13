"use client";
import type { Metadata } from "next";
import AuthSession from "component/AuthSession";
import { ThemeProvider } from "../../context/ThemeContext";
import StyledComponentsRegistry from "./RootStyleRegistry";
import { store } from "store/store";
import { Provider } from "react-redux";

export const metadata: Metadata = {
  title: "WISH | SHOPPING SITE",
  description:
    "Wearing Interface Shopping Homepage, 트렌드 의류 정보를 공유하고 추천하는 포트폴리오 의류 사이트입니다.",
  keywords:
    "포트폴리오, 옷, 의류, 트렌드, 쇼핑, 유튜브, 의류 트렌드, 스타일, 유행",
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
    <Provider store={store}>
      <AuthSession>
        <html lang='ko'>
          <body>
            <ThemeProvider>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </ThemeProvider>
          </body>
        </html>
      </AuthSession>
    </Provider>
  );
}
