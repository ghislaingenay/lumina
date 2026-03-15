"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LampProps {
  lampName?: string;
  woodName?: string;
  imageSrc?: string;
}

type LampCardProps = LampProps & {
  blurCard?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  className?: string;
  imageClassName?: string;
};

export function LampCard({
  lampName = "Mori No. 3",
  woodName = "White Oak",
  imageSrc = "/wood_lamp.jpg",
  blurCard = false,
  onEnter,
  onLeave,
  className = "",
  imageClassName = "",
}: LampCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);

  const containerHeight = "350px";
  const containerWidth = "100%";
  const imageHeight = 200;
  const imageWidth = 200;

  const [isBlurred, setIsBlurred] = useState(blurCard);

  // Sync isBlurred state with blurCard prop changes
  useEffect(() => {
    setIsBlurred(blurCard);
  }, [blurCard]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current || !lampRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Normalize to -1 to 1 range (0 at center)
    const normalizedX = (offsetX / rect.width) * 2 - 1;
    const normalizedY = (offsetY / rect.height) * 2 - 1;

    // Inverse movement: cursor top left = lamp bottom right
    const moveX = -normalizedX * 50; // Move opposite direction
    const moveY = -normalizedY * 50;

    gsap.to(lampRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function handleMouseEnter() {
    onEnter?.();
  }

  function handleMouseLeave() {
    if (lampRef.current) {
      gsap.to(lampRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    onLeave?.();
  }

  useEffect(() => {
    const timeline = gsap.timeline({});
    timeline.to(containerRef.current, {
      "--blur": isBlurred ? "10px" : "0px",
      duration: 0.2,
      ease: "back",
    });
    timeline.to(containerRef.current, {
      scale: isBlurred ? 0.8 : 1,
      duration: 0.8,
      ease: "bounce",
    });
  }, [isBlurred]);

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`blurable relative rounded-3xl overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Absolute wrapper */}
      <div
        ref={lampRef}
        className="absolute inset-0 -translate-x-1/2 -translate-y-1/2  top-1/2 left-1/2"
      >
        {/* Relative wrapper */}
        <div className="relative ">
          {/* Image - absolute */}
          <Image
            width={imageWidth}
            height={imageHeight}
            src={imageSrc}
            alt={lampName}
            className={`object-cover transition-transform duration-700 group-hover:scale-[101%] ${imageClassName}`}
          />

          {/* Text - absolute */}
          <h3 className="text-xl text-secondary mt-1">{lampName}</h3>
        </div>
      </div>

      {/* Wood name — top right */}
      {/* <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs tracking-widest uppercase bg-secondary text-primary backdrop-blur-sm z-10">
        {woodName}
      </span> */}
    </div>
  );
}
