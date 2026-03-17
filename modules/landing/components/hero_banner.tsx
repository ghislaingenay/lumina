"use client";
import { REVEAL_BG_HERO_BANNER_ANIMATION_DURATION } from "@/lib/constants/animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export default function HeroBanner() {
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const secondaryHeadingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const areRefDefined =
      backgroundImageRef.current &&
      headingRef.current &&
      secondaryHeadingRef.current;

    if (!areRefDefined) return;
    const section = sectionRef.current;
    const bgImage = backgroundImageRef.current;
    const heading = headingRef.current;
    const secondaryHeading = secondaryHeadingRef.current;
    const timeline = gsap.timeline();
    timeline.to(section, { autoAlpha: 1 }); // added invisible in className of the section

    timeline.from(bgImage, {
      filter: "brightness(1)",
      duration: REVEAL_BG_HERO_BANNER_ANIMATION_DURATION,
    });
    const spanElements = heading!.querySelectorAll("span");
    timeline.from(spanElements, {
      opacity: 0,
      transformOrigin: "0% 100%",
      rotationX: 90,
      stagger: 0.3,
      duration: 0.7,
      ease: "power4.out",
      reversed: true,
    });
    timeline.from(
      secondaryHeading,
      {
        opacity: 0,
        y: 20,
        duration: 2,
        ease: "power4.out",
      },
      "<",
    );
  });

  return (
    <section
      ref={sectionRef}
      className="relative text-center pt-18 min-h-screen flex items-center justify-center flex-col gap-4 invisible"
    >
      {/* Image */}
      <Image
        preload
        ref={backgroundImageRef}
        src="/landing.webp"
        alt="Landing"
        width={200}
        height={200}
        className="mx-auto size-full absolute inset-0 brightness-25 object-cover -z-40"
      />
      <h1
        ref={headingRef}
        className="max-w-3xl mx-auto text-4xl  md:text-4xl  lg:text-5xl font-bold text-primary mb-4 leading-tight"
      >
        <span className="block overflow-hidden">Illuminate</span>
        <span className="block overflow-hidden">● Your ●</span>
        <span className="block overflow-hidden">Space</span>
      </h1>
      <h2
        ref={secondaryHeadingRef}
        className="max-w-3xl mx-auto text-lg lg:text-xl text-primary mb-8 px-8"
      >
        Handcrafted wooden bedside lamps designed for your unique style
      </h2>
    </section>
  );
}
