import "./globals.scss";
import type { Metadata } from "next";
import AuthSession from "./AuthSession";
import { ThemeProvider } from "../../context/ThemeContext";

export const metadata: Metadata = {
  title: "WISH",
  description: "Wearing Interface Shopping Homepage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSession>
      <html lang='en'>
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </AuthSession>
  );
}
