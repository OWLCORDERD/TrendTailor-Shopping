"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const SessionWatcher = () => {
  const { data: session, update: sessionUpdate } = useSession();
  const pathname = usePathname();

  // 2026.07.06 로그아웃 중복 호출 방지
  const logoutInFlight = useRef<boolean>(false);
  // 2026.07.06 세션 갱신 중복 호출 방지
  const updatingFlight = useRef<boolean>(false);

  const logout = () => {
    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    signOut({ callbackUrl: `/login?redirect=${pathname}` });
  };

  const refreshSession = async () => {
    if (updatingFlight.current) return;

    updatingFlight.current = true;

    try {
      await sessionUpdate();
    } finally {
      updatingFlight.current = false;
    }
  };

  // 2026.07.06 세션 검증 강화
  useEffect(() => {
    // 2026.07.06
    // 세션 refresh 토큰 갱신 실패 시, 로그아웃 처리
    // single-flight 방식으로 중복 로그아웃 방지
    if (session?.error === "RefreshAccessTokenError") {
      if (logoutInFlight.current) return;

      logout();

      // 로그아웃 이후 페이지 이동 시, 세션이 갱신되기 전에
      // 로그아웃이 중복 호출되는 것을 방지하기 위해 5초간 플래그를 유지
      setTimeout(() => {
        logoutInFlight.current = true;
      }, 5000);
      return;
    }
  }, [session]);

  useEffect(() => {
    // 윈도우 포커스 시, 세션 갱신
    window.addEventListener("focus", () => {
      refreshSession();
    });

    // 페이지 visibility 상태 변경 시, 세션 갱신
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        refreshSession();
      }
    });
  }, []);

  return null;
};

export default SessionWatcher;
