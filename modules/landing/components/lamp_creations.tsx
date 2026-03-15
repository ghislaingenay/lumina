"use client";
import lamps from "@constants/lamp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { LampCard } from "./lamp_card";

gsap.registerPlugin(ScrollTrigger);
export default function LampCreations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lampFocus, setLampFocus] = useState(0);

  const handleLampLeave = (idx: number) => {
    // Default back to first lamp when mouse leaves
    setLampFocus(idx);
  };

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setLampFocus(0),
      onEnterBack: () => setLampFocus(0),
    });
  });

  return (
    <section
      ref={sectionRef}
      className="max-w-3xl relative pt-4 mx-auto w-full pb-20"
    >
      <h3 className="text-3xl font-bold mb-4 text-center">Our creations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto ">
        {lamps.map((lamp, index) => (
          <LampCard
            key={lamp.id}
            imageSrc={lamp.image}
            imageClassName={lamp.id === "tobuc" ? "scale-10" : ""}
            className="col-span-1"
            lampName={lamp.name}
            blurCard={lampFocus !== index}
            onEnter={() => setLampFocus(index)}
            onLeave={() => handleLampLeave(index)}
          />
        ))}
      </div>
    </section>
  );
}
