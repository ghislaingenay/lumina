import { Fn, log2, mul, pow, remap, vec3 } from "three/tsl";

const remapExp = Fn(
  ([x, fromMin, fromMax, toMin, toMax]: [
    ReturnType<typeof vec3>,
    ReturnType<typeof vec3>,
    ReturnType<typeof vec3>,
    ReturnType<typeof vec3>,
    ReturnType<typeof vec3>,
  ]) => {
    const remapped = remap(x, fromMin, fromMax, 0, 1);
    const expRemap = pow(
      2,
      mul(remapped, log2(toMax.div(toMin))).add(log2(toMin)),
    );
    return expRemap;
  },
).setLayout({
  name: "remapExp",
  type: "float",
  inputs: [
    { name: "x", type: "float" },
    { name: "fromMin", type: "float" },
    { name: "fromMax", type: "float" },
    { name: "toMin", type: "float" },
    { name: "toMax", type: "float" },
  ],
});

export default remapExp;
