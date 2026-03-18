"use client";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ConfiguratorLoading() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (!ref.current) return;
    console.log("Loading complete", progress);
    if (progress === 100) {
      const tl = gsap.timeline();
      tl.to(ref.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      });
      tl.to(ref.current, {
        display: "none",
        delay: 0.5,
        duration: 0.1,
      });
    }
  }, [progress]);
  return (
    <div
      ref={ref}
      className="fixed z-[999] top-0 left-0 w-full h-full bg-primary"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="grid gap-3 p-4 bg-primary w-[300px] h- rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-700">Loading...</p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-secondary rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-secondary">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
