import { Clone, CloneProps, useGLTF } from "@react-three/drei";

type BedProps = Omit<CloneProps, "dispose" | "object">;

export default function Bed(props: BedProps = {}) {
  const model = useGLTF("/models/bed.glb");
  return <Clone object={model.scene} {...props} dispose={null} />;
}

useGLTF.preload("/models/bed.glb");
