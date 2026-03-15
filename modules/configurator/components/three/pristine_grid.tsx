"use client";

import { useMemo, useRef } from "react";
import {
  abs,
  clamp,
  dFdx,
  dFdy,
  float,
  Fn,
  fract,
  length,
  max,
  mix,
  positionWorld,
  smoothstep,
  uniform,
  vec2,
  vec3,
} from "three/tsl";
import * as THREE from "three/webgpu";

interface PristineGridProps {
  gridScale?: number;
  gridColor?: THREE.Color | string;
  backgroundColor?: THREE.Color | string;
  lineWidth?: number;
  opacity?: number;
  size?: number;
}

export default function PristineGrid({
  gridScale = 1.0,
  gridColor = "#cccccc",
  backgroundColor = "#1a1a1a",
  lineWidth = 1.0,
  opacity = 1.0,
  size = 50,
}: PristineGridProps) {
  const materialRef = useRef<THREE.MeshBasicNodeMaterial>(null);

  const gridColorObj =
    typeof gridColor === "string" ? new THREE.Color(gridColor) : gridColor;
  const bgColorObj =
    typeof backgroundColor === "string"
      ? new THREE.Color(backgroundColor)
      : backgroundColor;

  const material = useMemo(() => {
    const uGridScale = uniform(gridScale);
    const uGridColor = uniform(gridColorObj);
    const uBackgroundColor = uniform(bgColorObj);
    const uLineWidth = uniform(lineWidth);

    // Pristine grid function using TSL
    const pristineGrid = Fn(
      ([uv, lineWidthVal]: [
        ReturnType<typeof vec2>,
        ReturnType<typeof vec2>,
      ]) => {
        const uvDDXY = vec2(
          length(vec2(dFdx(uv.x), dFdy(uv.x))),
          length(vec2(dFdx(uv.y), dFdy(uv.y))),
        );
        const drawWidth = clamp(lineWidthVal, uvDDXY, vec2(0.5));
        const gridUV = abs(fract(uv).mul(2.0).sub(1.0));
        let grid2 = smoothstep(
          drawWidth.add(uvDDXY),
          drawWidth.sub(uvDDXY),
          gridUV,
        );
        grid2.mulAssign(clamp(lineWidthVal.div(drawWidth), 0.0, 1.0));
        grid2 = mix(
          grid2,
          lineWidthVal,
          clamp(uvDDXY.mul(2.0).sub(1.0), 0.0, 1.0),
        );
        return mix(grid2.x, float(1.0), grid2.y);
      },
    );

    // Get world position and create UV
    const worldPos = positionWorld;
    const uv = vec2(worldPos.x, worldPos.z).mul(uGridScale);

    // Create main grid
    const grid = pristineGrid(uv, vec2(uLineWidth.mul(0.01)));

    // Create thicker lines every 10 units
    const gridMajor = pristineGrid(uv.mul(0.1), vec2(uLineWidth.mul(0.015)));

    // Combine grids
    const finalGrid = max(grid, gridMajor);

    // Mix background and grid color
    const color = mix(uBackgroundColor, uGridColor, finalGrid);

    const mat = new THREE.MeshBasicNodeMaterial();
    mat.colorNode = vec3(color);
    mat.transparent = opacity < 1.0;
    mat.opacity = opacity;
    mat.side = THREE.DoubleSide;

    return mat;
  }, [gridScale, gridColorObj, bgColorObj, lineWidth, opacity]);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
      <planeGeometry args={[size, size, 1, 1]} />
      <primitive object={material} ref={materialRef} />
    </mesh>
  );
}
