"use client";
import { useEffect, useState } from "react";

export default function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "object") setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  return mounted;
}
