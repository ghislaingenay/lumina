"use client";

import WoodBackground from "@components/three/wood_background";
import Experience from "@providers/experience";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export default function LandingExperience() {
  return (
    <Suspense fallback={null}>
      <Experience>
        <OrbitControls enableDamping={false} makeDefault />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={4} />
        <WoodBackground />
      </Experience>
    </Suspense>
  );
}
