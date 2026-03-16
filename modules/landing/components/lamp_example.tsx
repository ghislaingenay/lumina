"use client";
import Image from "next/image";
import { useState } from "react";

export default function LampExample() {
  const woods = ["plywood", "dotted_wood", "draft_wood"] as const;

  const [selectedWood, setSelectedWood] =
    useState<(typeof woods)[number]>("plywood");

  const imageDetails = {
    plywood: {
      lampSrc: "/landing_features/lamp/plywood_lamp.webp",
      materialSrc: "/landing_features/material/plywood.webp",
      altText: "Plywood lamp and material sample",
    },
    dotted_wood: {
      lampSrc: "/landing_features/lamp/dotted_wood_lamp.webp",
      materialSrc: "/landing_features/material/dotted_wood.webp",
      altText: "Dotted wood lamp and material sample",
    },
    draft_wood: {
      lampSrc: "/landing_features/lamp/draft_wood_lamp.webp",
      materialSrc: "/landing_features/material/draft_wood.webp",
      altText: "Draft wood lamp and material sample",
    },
  };

  return (
    <div className="relative flex items-center gap-6 p-8">
      {/* Small wood material image on the left */}
      <div
        className="absolute left-6 bottom-0 transform -translate-y-1/2 z-100"
        id="material-image"
      >
        <div className="flex flex-col items-center gap-2 justify-between">
          {woods.map((wood) => (
            <button
              key={wood}
              className={`size-6 md:size-12 rounded-lg shadow-md border-none bg-transparent cursor-pointer transition-all ${
                selectedWood === wood
                  ? "ring-2 ring-offset-2 ring-secondary"
                  : ""
              }`}
              onClick={() => setSelectedWood(wood)}
              type="button"
            >
              <Image
                src={`/landing_features/material/${wood}.jpg`}
                alt={`${wood} material`}
                width={48}
                height={48}
                className="rounded-lg size-6 md:size-12 object-fit pointer-events-none"
              />
            </button>
          ))}
        </div>
      </div>

      <Image
        src={imageDetails[selectedWood]?.lampSrc ?? ""}
        alt={imageDetails[selectedWood]?.altText ?? "Lamp image"}
        width={200}
        height={200}
        loading="lazy"
        preload
        className="object-contain ml-auto w-25 md:w-50"
      />
    </div>
  );
}
