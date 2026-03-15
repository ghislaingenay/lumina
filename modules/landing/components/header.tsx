"use client";

import gsap from "gsap";
import { useRef } from "react";

import { REVEAL_BG_HERO_BANNER_ANIMATION_DURATION } from "@/lib/constants/animation";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function Header() {
  const headerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        {
          y: -50,
          opacity: 0,
          delay: REVEAL_BG_HERO_BANNER_ANIMATION_DURATION + 0.5,
        },
        {
          y: 0,
          opacity: 1,

          duration: 2,
          ease: "power1.inOut",
          delay: 0.5, // related to hero banner bg image from light to dark transition
        },
      );
    },
    {
      scope: headerRef,
    },
  );
  return (
    <header
      ref={headerRef}
      className="absolute z-20 top-10 left-0 right-0 px-4 h-fit max-w-3xl mx-auto my-auto opacity-0"
    >
      <nav className="relative flex items-center justify-between">
        <span className="branding text-primary text-sm lg:text-md ">
          Lumina
        </span>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-primary text-sm lg:text-md">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/configurator"
              className="text-primary text-sm lg:text-md  "
            >
              Configurator
            </Link>
          </li>
          {/* <li>
            <a href="#" className="text-primary">
              Shop
            </a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
