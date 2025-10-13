"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const SessionWatcher = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  return null;
};

export default SessionWatcher;
