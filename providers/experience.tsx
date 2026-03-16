"use client";
import { Canvas, CanvasProps, extend } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";
import { WebGPURendererParameters } from "three/src/renderers/webgpu/WebGPURenderer.Nodes.js";
import * as THREE from "three/webgpu";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";

export type ExperienceProviderProps = {
  children: React.ReactNode[] | React.ReactNode;
  options?: Partial<CanvasProps>;
  showGUI?: boolean;
};

extend(THREE as never);

export default function Experience({
  children,
  options = {},
  showGUI = false,
}: ExperienceProviderProps) {
  const canvasProps: CanvasProps = {
    shadows: true,
    onCreated: ({ gl }) => {
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath("./basis/"); // need basis transcoder files
      ktx2Loader.detectSupport(gl);
      if (gl instanceof THREE.WebGPURenderer) {
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }
    },
    dpr: [1, 2],
    camera: {
      fov: 40,
      // position: [3, 1, -2],
    },
    ...options,
  };

  return (
    <div className=" w-full h-screen fixed top-0 left-0 z-0">
      <Suspense fallback={null}>
        {showGUI && <Leva />}
        <Canvas
          {...canvasProps}
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer(
              props as WebGPURendererParameters,
            );
            await renderer.init(); // Async initialization is required
            return renderer;
          }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
