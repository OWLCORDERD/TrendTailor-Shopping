"use client";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const SessionWatcher = () => {
  const { data: session }: Session | any = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      signOut({ callbackUrl: "/login" });
      return;
    }
  }, [session]);

  return null;
};

export default SessionWatcher;
