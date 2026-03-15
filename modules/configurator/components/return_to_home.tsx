"use client";

import gsap from "gsap";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef } from "react";

export default function ReturnToHome() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const onLinkHover = useCallback(() => {
    if (!linkRef.current) return;
    const tl = gsap.timeline();
    tl.to(linkRef.current, {
      scale: 1.1,
      boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
      duration: 0.3,
      ease: "power2.out",
    });
    tl.to(linkRef.current, {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
      duration: 0.3,
      opacity: 1,
      ease: "power2.in",
    });
    tl.to(
      linkRef.current.parentElement!.querySelector("p"),
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.3",
    );
  }, [linkRef]);

  const onLinkHoverOut = useCallback(() => {
    if (!linkRef.current) return;
    const tl = gsap.timeline();
    tl.to(linkRef.current, {
      scale: 1.1,
      boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
      duration: 0.3,
      ease: "power2.out",
    });
    tl.to(linkRef.current, {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
      duration: 0.3,
      opacity: 0.5,
      ease: "power2.in",
    });
    tl.to(
      linkRef.current.parentElement!.querySelector("p"),
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3",
    );
  }, [linkRef]);
  return (
    <div className="relative pointer-events-auto">
      <p className="bg-primary z-10 opacity-0 absolute text-secondary py-2 px-4 rounded-2xl top-4 left-12">
        Return to Home
      </p>

      <Link
        ref={linkRef}
        onMouseEnter={onLinkHover}
        onMouseLeave={onLinkHoverOut}
        href="/"
        className="bg-secondary shadow-2xl opacity-50 relative size-12 flex items-center justify-center rounded-full"
      >
        <CircleArrowLeft className="text-primary" />
        <p className="sr-only">Return to Home</p>
      </Link>
    </div>
  );
}
