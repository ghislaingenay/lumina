"use client";
import { useEffect, useState } from "react";

export default function useIsScrolling(init = 0) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      const scrollY = window.scrollY;
      const isScrolling = scrollY > init;
      setIsScrolling(isScrolling);
    });
    return () => {
      document.removeEventListener("scroll", () => {
        setIsScrolling(false);
      });
    };
  }, []);

  return isScrolling;
}
