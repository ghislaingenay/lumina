"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import LampExample from "./lamp_example";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // The lamp will be hidden position on the right side of the screen and appear as a circle
  // Can use raycaster on material ball to check the format
  // handle local storage as well

  useGSAP(() => {
    const section = sectionRef?.current;
    if (!section) return;

    const storyEl = section.querySelector("#story-telling");
    const configEl = section.querySelector("#configurator-feature");

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      onUpdate: (instance) => {
        const progress = instance.progress;

        // Story fades out between 40%–50%
        const storyOpacity =
          progress < 0.4 ? 1 : progress > 0.5 ? 0 : 1 - (progress - 0.4) / 0.1;

        // Config fades in between 50%–70%
        const configOpacity =
          progress < 0.5 ? 0 : progress > 0.7 ? 1 : (progress - 0.5) / 0.2;

        gsap.set(storyEl, { opacity: storyOpacity });
        gsap.set(configEl, { opacity: configOpacity });
      },
    });

    ScrollTrigger.create({
      trigger: section.querySelector("#configurator-feature"),
      start: "top top",
      end: "bottom bottom",
    });
  });

  return (
    // Section is tall to create scroll room; acts as the scroll trigger container
    <section ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky container keeps both panels in view while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Both panels are absolute, stacked on top of each other */}
        <div
          id="story-telling"
          className="absolute inset-0 max-w-3xl mx-auto w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 px-4"
        >
          <div className="md:flex-1">
            <h3>When the world slows down, the light should soften.</h3>
            <p>
              Not too bright. Not too cold.{" "}
              <strong>Just enough to feel at home.</strong>
            </p>
          </div>
          <div className="md:flex-1">
            <Image
              width={400}
              height={400}
              src="/wood_lamp.webp"
              loading="eager"
              alt="Wood Lamp"
              className="size-full object-cover rounded-2xl"
            />
          </div>
        </div>

        <div
          id="configurator-feature"
          className="absolute inset-0 max-w-3xl mx-auto w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 px-4 opacity-0"
        >
          <div className="md:flex-1">
            <h3 className="mb-3 font-bold">
              No two pieces of wood are identical.
            </h3>
            <p>Select the wood that matches your space.</p>
          </div>
          <div className="md:flex-1" id="config-image">
            <LampExample />
          </div>
        </div>
      </div>
    </section>
  );
}
