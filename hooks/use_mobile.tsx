"use client";

import debounce from "@utils/debounce";
import { useDeferredValue, useLayoutEffect, useState } from "react";

export default function useMobile(width: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const isMobileSize = useDeferredValue(isMobile);

  useLayoutEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= width);
    };
    window.addEventListener("resize", debounce(updateIsMobile, 250));
    return (): void => window.removeEventListener("resize", updateIsMobile);
  }, [width]);

  return isMobileSize;
}
