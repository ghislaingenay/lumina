import { useMemo } from "react";
import {
  add,
  color,
  cos,
  deltaTime,
  exp,
  float,
  Fn,
  Loop,
  mix,
  mul,
  mx_noise_float,
  positionGeometry,
  radians,
  reciprocal,
  sin,
  sub,
  time,
  uniform,
  vec3,
} from "three/tsl";
import * as THREE from "three/webgpu";

type WoodRawParams = {
  position: ReturnType<typeof vec3>;
  scale: ReturnType<typeof float>;
  rings: ReturnType<typeof float>;
  lengths: ReturnType<typeof float>;
  angle: ReturnType<typeof float>;
  fibers: ReturnType<typeof float>;
  fibersDensity: ReturnType<typeof float>;
  color: ReturnType<typeof color>;
  background: ReturnType<typeof color>;
  seed: ReturnType<typeof float>;
};

export default function WoodBackground() {
  const { material, uniforms } = useMemo(() => {
    const desaturate = Fn(
      ([colorToDesaturate, factor]: [
        ReturnType<typeof color>,
        ReturnType<typeof float>,
      ]) => {
        const l = add(
          mul(0.2126, colorToDesaturate.r),
          mul(0.7152, colorToDesaturate.g),
          mul(0.0722, colorToDesaturate.b),
        );

        return vec3(
          add(l, mul(sub(colorToDesaturate.r, l), factor)),
          add(l, mul(sub(colorToDesaturate.g, l), factor)),
          add(l, mul(sub(colorToDesaturate.b, l), factor)),
        );
      },
    );
    const woodRaw = Fn(
      ({
        position,
        scale,
        rings,
        lengths,
        angle,
        fibers,
        fibersDensity,
        color,
        background,
        seed,
      }: WoodRawParams) => {
        // Convert angle from degrees to radians
        const angleRad = radians(angle).toVar();

        // Rotate position around Z-axis by angle
        const posLocal = vec3(
          sub(position.x.mul(cos(angleRad)), position.y.mul(sin(angleRad))),
          add(position.x.mul(sin(angleRad)), position.y.mul(cos(angleRad))),
          position.z,
        ).toVar();

        // Main pattern: scale and offset position for ring noise sampling
        const pos = posLocal
          .mul(
            exp(scale.sub(3)).mul(
              vec3(reciprocal(lengths), 4, reciprocal(lengths)),
            ),
          )
          .add(seed)
          .add(time.mul(0.01))
          .toVar();

        // Ring pattern: noise → cosine ripple → remap to [0, 1]
        let k = mx_noise_float(pos).add(1).mul(10).mul(rings);
        k = k.add(k.cos()).cos().add(1).div(2);

        // Fiber pattern: fractal sum of noise octaves
        const kk = float(0).toVar();
        const sum = float(0).toVar();
        const scaleF = exp(scale.sub(2))
          .mul(vec3(1, fibersDensity, 1))
          .toVar();
        const power = float(2).toVar();

        Loop(10, () => {
          kk.addAssign(
            mul(
              power,
              mx_noise_float(
                posLocal.mul(scaleF).add(seed).add(time.mul(0.25)),
              ),
            ),
          );
          sum.addAssign(power).addAssign(deltaTime);
          scaleF.mulAssign(1.8);
          power.mulAssign(0.6);
        });

        // Remap fiber sum: sinusoidal contrast → [0, 1]
        kk.assign(mul(kk, 5).div(sum).mul(10).sin().add(1).div(2));

        // Blend wood color and background using ring + fiber mix
        return desaturate(mix(color, background, mix(k, kk, fibers)), 0.1).mul(
          10,
        );
      },
    ).setLayout({
      name: "woodRaw",
      type: "vec3",
      inputs: [
        { name: "position", type: "vec3" },
        { name: "scale", type: "float" },
        { name: "rings", type: "float" },
        { name: "lengths", type: "float" },
        { name: "angle", type: "float" },
        { name: "fibers", type: "float" },
        { name: "fibersDensity", type: "float" },
        { name: "color", type: "vec3" },
        { name: "background", type: "vec3" },
        { name: "seed", type: "float" },
      ],
    });

    const uniforms = {
      scale: uniform(2.5),
      rings: uniform(3),
      lengths: uniform(1),
      angle: uniform(45),
      fibers: uniform(0.3),
      fibersDensity: uniform(5),
      color: uniform(new THREE.Color(0x8b4513)),
      background: uniform(new THREE.Color(0xdeb887)),
      seed: uniform(Math.random() * 1000),
    };

    const woodConfig = {
      position: positionGeometry,
      scale: uniforms.scale,
      rings: uniforms.rings,
      lengths: uniforms.lengths,
      angle: uniforms.angle,
      fibers: uniforms.fibers,
      fibersDensity: uniforms.fibersDensity,
      color: color(uniforms.color),
      background: color(uniforms.background),
      seed: uniforms.seed,
    };

    const material = new THREE.MeshStandardNodeMaterial({
      colorNode: woodRaw(woodConfig),
      side: THREE.DoubleSide,
    });

    return {
      material,
      uniforms,
    };
  }, []);

  return (
    <mesh position={[0, 0, 3]} rotation={[0, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <primitive object={material} />
    </mesh>
  );
}
