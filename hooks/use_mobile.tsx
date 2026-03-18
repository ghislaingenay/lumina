"use client";

import debounce from "@/utils/debounce";
import { useEffect, useState } from "react";

export default function useIsMobile(MOBILE_BREAKPOINT = 768) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    const debouncedCheck = debounce(check, 150);

    check();
    window.addEventListener("resize", debouncedCheck);
    return () => window.removeEventListener("resize", debouncedCheck);
  }, [MOBILE_BREAKPOINT]);

  return isMobile;
}
