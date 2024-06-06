import { useEffect, useState } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
