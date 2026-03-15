"use client";

import { NIGHTSTAND_POSITION } from "@constants/configurator";
import { Clone, useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three/webgpu";

export default function Nightstand() {
  const model = useGLTF("/models/nightstand.glb");

  const scene = useMemo(() => {
    const clonedScene = model.scene.clone(true);
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        if (child.name === "top") child.receiveShadow = false;
        else child.receiveShadow = true;
        // Prevent shadow acne from nearby point light
        if (child.material) {
          (child.material as THREE.Material).shadowSide = THREE.FrontSide;
        }
      }
    });
    return clonedScene;
  }, [model]);

  return (
    <Clone
      object={scene}
      rotation={[0, Math.PI / 24, Math.PI / 160]}
      scale={[3, 3, 3]}
      dispose={null}
      position={[NIGHTSTAND_POSITION.x, 0.05, NIGHTSTAND_POSITION.z]}
    />
  );
}

useGLTF.preload("/models/nightstand.glb");
