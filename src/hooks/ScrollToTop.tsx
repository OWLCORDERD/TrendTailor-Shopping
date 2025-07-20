"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RxDoubleArrowUp } from "react-icons/rx";

export function ScrollToTop({ type }: { type: string | undefined }) {
  const pathname = usePathname();
  useEffect(() => {
    if (type === "routeMove") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return type === "click" ? (
    <RxDoubleArrowUp onClick={() => scrollTop()} />
  ) : null;
}
