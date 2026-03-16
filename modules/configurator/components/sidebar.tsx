"use client";

import useLampStore from "@/hooks/use_lamp";
import lamps from "@/lib/constants/lamp";
import paints from "@/lib/constants/paints";
import woods from "@/lib/constants/woods";
import { useOutsideClick } from "@hooks/use_outside_click";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ConfiguratorSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { lamp, color, wood, setLampColor, setLampWood, setLamp } =
    useLampStore();

  useOutsideClick(sidebarRef as React.RefObject<HTMLDivElement>, () => {
    if (isOpen) setIsOpen(false);
  });

  // Filter available options based on lamp configuration
  const availablePaints = paints.filter((p) =>
    lamp.availableColor.includes(p.id),
  );
  const availableWoods = woods.filter((w) => lamp.availableWood.includes(w.id));

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-80 cursor-pointer bg-secondary text-primary px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Sidebar Panel */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-100 py-4 h-screen w-80 overflow-y-auto bg-secondary text-primary shadow-2xl transform transition-transform duration-300 ease-in-out overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Create your lamp</h2>

            {/* Lamp Model Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 border-b border-primary border-opacity-20 pb-2">
                Lamp Model
              </h3>
              <label className="block text-sm font-medium mb-2">
                Select Lamp
              </label>
              <div className="grid grid-cols-2 gap-3">
                {lamps.map((lampOption) => (
                  <button
                    key={lampOption.id}
                    onClick={() => setLamp(lampOption.id)}
                    className={`relative h-24 w-full rounded-lg border-2 overflow-hidden transition-all ${
                      lamp.id === lampOption.id
                        ? "border-primary ring-2 ring-primary ring-opacity-50 font-bold"
                        : "border-transparent hover:border-primary bg-secondary bg-opacity-50"
                    }`}
                  >
                    <Image
                      src={lampOption.image}
                      alt={lampOption.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                    <span
                      className={`absolute bottom-0 left-0 right-0 bg-opacity-70 text-xs py-1 text-center ${
                        lamp.id === lampOption.id
                          ? "bg-primary text-secondary"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {lampOption.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Varnish Color Section */}
            {!!availablePaints.length && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 border-b border-primary border-opacity-20 pb-2">
                  Varnish Color
                </h3>
                <label className="block text-sm font-medium mb-2">
                  Select Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    key={"no-paint"}
                    onClick={() => setLampColor(undefined)}
                    className={`relative h-16 w-full rounded-lg border-2 overflow-hidden transition-all ${
                      color === undefined
                        ? "border-primary ring-2 ring-primary ring-opacity-50"
                        : "border-transparent hover:border-primary"
                    }`}
                  >
                    <div
                      className={`w-full h-full ${color === undefined ? "bg-primary" : "bg-secondary"}`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 right-0 bg-opacity-70 text-xs py-1 text-center ${
                        color === undefined
                          ? "bg-primary text-secondary"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      No paint
                    </span>
                  </button>
                  {availablePaints.map((paint) => (
                    <button
                      key={paint.id}
                      onClick={() => setLampColor(paint.id)}
                      className={`relative h-16 w-full rounded-lg border-2 overflow-hidden transition-all ${
                        color?.id === paint.id
                          ? "border-primary ring-2 ring-primary ring-opacity-50"
                          : "border-transparent hover:border-primary"
                      }`}
                    >
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: paint.color }}
                      />
                      <span
                        className={`absolute bottom-0 left-0 right-0 bg-opacity-70 text-xs py-1 text-center ${
                          color?.id === paint.id
                            ? "bg-primary text-secondary"
                            : "bg-secondary text-primary"
                        }`}
                      >
                        {paint.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wood Material Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 border-b border-primary border-opacity-20 pb-2">
                Wood Material
              </h3>
              <label className="block text-sm font-medium mb-2">
                Select Wood
              </label>
              <div className="grid grid-cols-2 gap-3">
                {availableWoods.map((woodOption) => (
                  <button
                    key={woodOption.id}
                    onClick={() => setLampWood(woodOption.id)}
                    className={`relative h-16 w-full rounded-lg border-2 overflow-hidden transition-all ${
                      wood?.id === woodOption.id
                        ? "border-primary ring-2 ring-primary ring-opacity-50"
                        : "border-transparent hover:border-primary"
                    }`}
                  >
                    <Image
                      preload
                      src={`/${woodOption.texture.color}`}
                      alt={woodOption.name}
                      height={48}
                      width={48}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 left-0 right-0 bg-opacity-70 text-xs py-1 text-center ${
                        wood?.id === woodOption.id
                          ? "bg-primary text-secondary"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {woodOption.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Selection Summary */}
            <div className="mb-4 p-4 bg-primary text-secondary bg-opacity-5 rounded-lg">
              <h3 className="text-sm font-semibold mb-2">Current Selection</h3>
              <p className="text-xs">
                Color: {color ? color.name : "Not selected"}
              </p>
              <p className="text-xs">
                Wood: {wood ? wood.name : "Not selected"}
              </p>
            </div>
            {/* Add to Cart Button */}
            <button className="w-full mb-4 bg-primary  text-secondary hover:bg-opacity-80 transition-all px-4 py-3 rounded-lg font-semibold shadow-lg">
              Add to cart
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
