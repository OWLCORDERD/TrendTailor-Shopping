"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
