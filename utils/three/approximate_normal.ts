import { cross, Fn, sub, transformNormalToView, vec3 } from "three/tsl";

// approximate normal vector given point and two neighbout points
const approximateNormal = Fn(
  ([pos, posU, posV]: [
    ReturnType<typeof vec3>,
    ReturnType<typeof vec3>,
    ReturnType<typeof vec3>,
  ]) => {
    const dU = sub(posU, pos);
    const dV = sub(posV, pos);

    return transformNormalToView(cross(dU, dV).normalize());
  },
).setLayout({
  name: "approximateNormal",
  type: "vec3",
  inputs: [
    { name: "pos", type: "vec3" },
    { name: "posU", type: "vec3" },
    { name: "posV", type: "vec3" },
  ],
});

export default approximateNormal;
