"use client";

import { NIGHTSTAND_POSITION } from "@constants/configurator";
import useLampStore from "@hooks/use_lamp";
import { Clone, useGLTF, useKTX2 } from "@react-three/drei";
import { useMemo } from "react";
import { color, float, Fn, mix, texture } from "three/tsl";
import * as THREE from "three/webgpu";

export default function Lightstand() {
  const lamp = useLampStore((store) => store.lamp);
  const wood = useLampStore((store) => store.wood);
  const paint = useLampStore((store) => store.color);

  const model = useGLTF(lamp.model);

  const woodTexture = useKTX2({
    map: wood?.texture.color,
    normalMap: wood?.texture.normal,
    aoMap: wood?.texture.ao,
  });

  const lightPositionMap = {
    treed: new THREE.Vector3(
      NIGHTSTAND_POSITION.x,
      NIGHTSTAND_POSITION.y + 0.75,
      NIGHTSTAND_POSITION.z,
    ),
    tuboc: new THREE.Vector3(
      NIGHTSTAND_POSITION.x,
      NIGHTSTAND_POSITION.y + 0.9,
      NIGHTSTAND_POSITION.z,
    ),
    japo: new THREE.Vector3(
      NIGHTSTAND_POSITION.x,
      NIGHTSTAND_POSITION.y + 0.95,
      NIGHTSTAND_POSITION.z,
    ),
  };

  const lightPosition =
    lightPositionMap[lamp.id as keyof typeof lightPositionMap] ||
    NIGHTSTAND_POSITION;

  const shadeTexture = useKTX2({
    map: "/textures/shade/shade_diff_1k.ktx2",
    normalMap: "/textures/shade/shade_nor_gl_1k.ktx2",
    aoMap: "/textures/shade/shade_arm_1k.ktx2",
  });

  const sceneMemo = useMemo(() => {
    const clonedScene = model.scene.clone(true);
    if (!woodTexture.map || !woodTexture.normalMap || !woodTexture.aoMap) {
      console.warn("Wood texture maps are not fully loaded.");
      return clonedScene;
    }
    if (!shadeTexture.map || !shadeTexture.normalMap || !shadeTexture.aoMap) {
      console.warn("Shade texture maps are not fully loaded.");
      return clonedScene;
    }

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.layers.set(1); // Use layer 1 for configurator objects

        if (child.name === "shade") {
          if (lamp.id === "japo") {
            child.position.y += 0.1;
          }
          child.castShadow = false;
          child.receiveShadow = false;
          const shadeColorTexture = shadeTexture.map.clone();
          // Use ClampToEdge to respect the model's UV layout without tiling
          shadeColorTexture.wrapS = THREE.ClampToEdgeWrapping;
          shadeColorTexture.wrapT = THREE.ClampToEdgeWrapping;
          shadeColorTexture.colorSpace = THREE.SRGBColorSpace;
          shadeColorTexture.repeat.set(1, 1);
          shadeColorTexture.needsUpdate = true;
          const shadeNormalTexture = shadeTexture.normalMap.clone();
          shadeNormalTexture.wrapS = THREE.ClampToEdgeWrapping;
          shadeNormalTexture.wrapT = THREE.ClampToEdgeWrapping;
          shadeNormalTexture.repeat.set(1, 1);
          shadeNormalTexture.needsUpdate = true;
          const material = new THREE.MeshPhysicalNodeMaterial({
            transparent: true,
            side: THREE.DoubleSide,
          });
          material.side = THREE.DoubleSide;
          // material.opacity = 0.8;
          material.colorNode = Fn(() => {
            const shadeColor = texture(shadeColorTexture);
            return mix(color("#d4935a"), shadeColor, 0.5);
          })();
          // material.normalNode = Fn(() => texture(shadeNormalTexture))();
          material.aoNode = Fn(() => texture(shadeTexture.aoMap).r)();
          // Physical light transmission - allows point light to shine through
          material.transmissionNode = float(0.85);
          material.thicknessNode = float(0.02);
          material.roughnessNode = float(0.6);
          material.emissiveNode = color("#ff8833"); // warm glow bleeding through
          material.emissiveIntensity = 0.3;
          child.renderOrder = 1; // Render after wood to ensure correct layering
          child.material = material;
        } else {
          child.castShadow = true;
          child.receiveShadow = false;
          const woodColorTexture = woodTexture.map.clone();
          woodColorTexture.wrapS = THREE.RepeatWrapping;
          woodColorTexture.wrapT = THREE.RepeatWrapping;
          woodColorTexture.colorSpace = THREE.SRGBColorSpace;
          woodColorTexture.repeat.set(2, 2);
          woodColorTexture.needsUpdate = true;

          // Clone normal map to avoid sharing wrap settings with other meshes
          const woodNormalTexture = woodTexture.normalMap.clone();
          woodNormalTexture.wrapS = THREE.RepeatWrapping;
          woodNormalTexture.wrapT = THREE.RepeatWrapping;
          woodNormalTexture.repeat.set(1, 1);
          woodNormalTexture.needsUpdate = true;

          // Clone ao/roughness/metalness map
          const woodAoTexture = woodTexture.aoMap.clone();
          woodAoTexture.wrapS = THREE.RepeatWrapping;
          woodAoTexture.wrapT = THREE.RepeatWrapping;
          woodAoTexture.repeat.set(1, 1);
          woodAoTexture.needsUpdate = true;

          const material = new THREE.MeshStandardNodeMaterial();
          // Higher roughness = softer, more diffused shadows on the surface
          material.roughnessNode = float(0.8);
          // Slight metalness gives wood a natural sheen without being reflective
          material.metalnessNode = float(0.1);
          material.colorNode = paint
            ? Fn(() => {
                const woodColor = texture(woodColorTexture);
                return mix(color(paint.color), woodColor, 0.8);
              })()
            : Fn(() => texture(woodColorTexture))();
          material.normalNode = Fn(() => texture(woodTexture.normalMap))();
          material.aoNode = Fn(() => texture(woodTexture.aoMap))();

          // ARM texture: R = AO, G = Roughness, B = Metalness
          material.aoNode = Fn(() => texture(woodAoTexture).r)();
          material.roughnessNode = Fn(() => texture(woodAoTexture).g)();
          material.metalnessNode = Fn(() => texture(woodAoTexture).b)();
          material.side = THREE.DoubleSide;
          // child.renderOrder = 0; // Render before shade to ensure correct layering
          // child.layers.set(1); // Use layer 1 for configurator objects
          child.material = material;
        }
      }
    });
    return clonedScene;
  }, [paint, model, woodTexture, shadeTexture, lamp]);

  return (
    <group>
      <mesh position={lightPosition}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial transparent color="#ffffff" depthWrite={false} />
      </mesh>
      <pointLight
        position={lightPosition}
        intensity={1.5}
        distance={10}
        decay={2.5}
        castShadow
        color="#ffaa55"
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.002}
        shadow-normalBias={0.005}
        shadow-radius={4}
      />

      <pointLight
        position={[
          lightPosition.x + 0.02,
          lightPosition.y - 0.1,
          lightPosition.z + 0.25,
        ]}
        intensity={0.5}
        distance={1}
        decay={2}
        color="#ffaa55"
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.145}
        shadow-normalBias={0.0002}
        shadow-radius={4}
      />

      <Clone
        object={sceneMemo}
        position={[
          NIGHTSTAND_POSITION.x,
          NIGHTSTAND_POSITION.y + 0.045,
          NIGHTSTAND_POSITION.z,
        ]}
        dispose={null}
      />
    </group>
  );
}

useGLTF.preload("/models/treed.glb");
useGLTF.preload("/models/tuboc.glb");
useGLTF.preload("/models/japo.glb");
useKTX2.preload("/textures/woods/plywood/plywood_diff_1k.ktx2");
useKTX2.preload("/textures/woods/plywood/plywood_nor_gl_1k.ktx2");
useKTX2.preload("/textures/woods/plywood/plywood_arm_1k.ktx2");
useKTX2.preload("/textures/woods/linoleum/linoleum_diff_1k.ktx2");
useKTX2.preload("/textures/woods/linoleum/linoleum_nor_gl_1k.ktx2");
useKTX2.preload("/textures/woods/linoleum/linoleum_arm_1k.ktx2");
useKTX2.preload("/textures/shade/shade_diff_1k.ktx2");
useKTX2.preload("/textures/shade/shade_nor_gl_1k.ktx2");
useKTX2.preload("/textures/shade/shade_arm_1k.ktx2");
