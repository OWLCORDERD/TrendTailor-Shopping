import "./globals.scss";
import type { Metadata } from "next";
import { ThemeProvider } from "../../context/ThemeContext";
import AuthSession from "component/AuthSession";

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
    <html lang='en'>
      <body>
        <AuthSession>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthSession>
      </body>
    </html>
  );
}
