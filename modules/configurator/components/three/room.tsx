"use client";

import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export default function Room() {
  // Load laminate floor textures
  const laminateFloorTextures = useTexture({
    map: "/textures/laminate_floor/laminate_floor_diff_1k.jpg",
    normalMap: "/textures/laminate_floor/laminate_floor_nor_gl_1k.jpg",
    aoMap: "/textures/laminate_floor/laminate_floor_arm_1k.jpg",
    roughnessMap: "/textures/laminate_floor/laminate_floor_arm_1k.jpg",
  });

  // Load white plaster textures
  const whitePlasterTextures = useTexture({
    map: "/textures/white_plaster/white_plaster_diff_1k.jpg",
    normalMap: "/textures/white_plaster/white_plaster_nor_gl_1k.jpg",
    aoMap: "/textures/white_plaster/white_plaster_arm_1k.jpg",
    roughnessMap: "/textures/white_plaster/white_plaster_arm_1k.jpg",
  });

  // Configure textures
  useMemo(() => {
    // Configure texture repeat and wrapping for floor
    Object.values(laminateFloorTextures).forEach((texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
    });

    // Configure texture repeat and wrapping for wall
    Object.values(whitePlasterTextures).forEach((texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 2);
    });
  }, [laminateFloorTextures, whitePlasterTextures]);

  return (
    <>
      {/* Floor Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[1.5, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          map={laminateFloorTextures.map}
          normalMap={laminateFloorTextures.normalMap}
          aoMap={laminateFloorTextures.aoMap}
          roughnessMap={laminateFloorTextures.roughnessMap}
        />
      </mesh>

      {/* Wall Plane */}
      <mesh position={[1.5, 2.5, -5]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial
          map={whitePlasterTextures.map}
          normalMap={whitePlasterTextures.normalMap}
          aoMap={whitePlasterTextures.aoMap}
          roughnessMap={whitePlasterTextures.roughnessMap}
        />
      </mesh>

      {/* Left Wall */}
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-5.5, 2.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial
          map={whitePlasterTextures.map}
          normalMap={whitePlasterTextures.normalMap}
          aoMap={whitePlasterTextures.aoMap}
          roughnessMap={whitePlasterTextures.roughnessMap}
        />
      </mesh>
    </>
  );
}
