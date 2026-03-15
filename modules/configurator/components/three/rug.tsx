import { Clone, CloneProps, useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three/webgpu";

type RugProps = Omit<CloneProps, "dispose" | "object">;

export default function Rug(props: RugProps = {}) {
  const model = useGLTF("/models/rug.glb");

  const sceneMemo = useMemo(() => {
    const clonedScene = model.scene.clone(true);
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clonedScene;
  }, [model]);
  return <Clone object={sceneMemo} {...props} dispose={null} />;
}

useGLTF.preload("/models/rug.glb");
