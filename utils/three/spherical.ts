import { cos, float, Fn, sin, vec3 } from "three/tsl";

const spherical = Fn(
  ([phi, theta]: [ReturnType<typeof float>, ReturnType<typeof float>]) => {
    return vec3(sin(theta).mul(sin(phi)), cos(phi), cos(theta).mul(sin(phi)));
  },
).setLayout({
  name: "spherical",
  type: "vec3",
  inputs: [
    { name: "phi", type: "float" },
    { name: "theta", type: "float" },
  ],
});

export default spherical;
