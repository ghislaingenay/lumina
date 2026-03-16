"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ceilingLamps = section.querySelector("img") as HTMLImageElement;
    const h4Element = section.querySelector("h4") as HTMLElement;

    const splitText = new SplitText(h4Element, { type: "lines" });

    gsap.set(splitText.lines, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${section.offsetHeight}`,
        scrub: 2,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(ceilingLamps, { xPercent: 100 }, 0);
    tl.to(splitText.lines, { opacity: 1, y: 0, stagger: 0.1 }, 0);
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <Image
        src="/ceiling_lamps.webp"
        alt="Ceiling Lamps"
        width={800}
        height={600}
        priority
        className="object-cover w-full h-screen absolute inset-0 z-20"
      />
      <div
        id="presentation"
        className="w-full relative origin-center flex justify-center items-center"
      >
        <div className="max-w-xl space-y-4 px-4 h-screen flex flex-col justify-center">
          <h3 className="text-center text-2xl md:text-3xl lg:text-4xl">
            Lumina
          </h3>
          <h4 className="text-center text-lg md:text-xl lg:text-2xl">
            Where the timeless elegance of natural wood meets modern
            illumination. Each lamp is a unique piece of functional art,
            handcrafted to bring warmth, character, and a touch of the natural
            world into your home. Discover the perfect light fixture to
            complement your space and elevate your daily living.
          </h4>
        </div>
      </div>
    </section>
  );
}
