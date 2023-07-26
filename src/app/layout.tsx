import "./globals.scss";
import type { Metadata } from "next";
import Navbar from "component/Main/Navbar";
import AuthSession from "./AuthSession";

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
          <Navbar />
          {children}
        </body>
      </html>
    </AuthSession>
  );
}
