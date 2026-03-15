"use client";

import { NIGHTSTAND_POSITION } from "@constants/configurator";
import Experience from "@providers/experience";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Bed from "./components/three/bed";
import Lightstand from "./components/three/lightstand";
import Nightstand from "./components/three/nightstand";
import Room from "./components/three/room";
import Rug from "./components/three/rug";

export default function ConfiguratorExperience() {
  return (
    <Suspense fallback={null}>
      <Experience
        options={{
          shadows: true,
          dpr: [1, 2],
          camera: {
            fov: 50,
            position: [-4.8, 3.1, -1.6],
          },
        }}
      >
        {/* <CameraController /> */}
        {/* Put nightstand as target to the camera */}
        {/* https://claude.ai/chat/444ace0b-e973-4a54-9295-f2690360bdc0 */}
        <OrbitControls
          enableDamping={false}
          makeDefault
          target={NIGHTSTAND_POSITION}
          minPolarAngle={Math.PI / 4} // Restrict looking up (45 degrees)
          maxPolarAngle={Math.PI / 2.2} // Restrict looking down (just slightly above ground level)
          minAzimuthAngle={-Math.PI / 8} // Restrict rotating too far right (-22.5 degrees)
          maxAzimuthAngle={Math.PI / 4} // Restrict rotating too far left (45 degrees)
          maxDistance={4}
          minDistance={3}
        />
        <ambientLight color="#546bab" intensity={0.7} />
        {/* <PristineGrid gridScale={0.5} size={100} /> */}
        {/* <axesHelper args={[5]} /> */}
        <Bed rotation={[0, -Math.PI / 2, 0]} position={[0, 0.04, -5]} />
        <Room />
        {/* <StableShadows /> */}
        <Rug
          rotation={[0, 0, 0]}
          position={[0.25, 0.02, 0.25]}
          scale={[2, 2, 1.5]}
        />
        <Nightstand />
        <Suspense fallback={null}>
          <Lightstand />
        </Suspense>
      </Experience>
    </Suspense>
  );
}
