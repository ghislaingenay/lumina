import { Fn, vec3 } from "three/tsl";

const vnoise = Fn(([v]: [ReturnType<typeof vec3>]) => {
  return v
    .dot(vec3(12.9898, 78.233, -97.5123))
    .sin()
    .mul(43758.5453)
    .fract()
    .mul(2)
    .sub(1);
}).setLayout({
  name: "vnoise",
  type: "float",
  inputs: [{ name: "v", type: "vec3" }],
});

export default vnoise;
