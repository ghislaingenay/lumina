"use client";

import { useEffect } from "react";

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return <>{children}</>;
}
