"use client";

import { Clone, CloneProps, useGLTF } from "@react-three/drei";

type ThreePiedProps = Omit<CloneProps, "dispose" | "object">;

export default function ThreePied(props: ThreePiedProps = {}) {
  const model = useGLTF("/models/three_pied.glb");

  return <Clone object={model.scene} dispose={null} {...props} />;
}

useGLTF.preload("/models/three_pied.glb");
