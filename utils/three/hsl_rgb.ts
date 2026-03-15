// helper function - convert hsl to rgb, ported to TSL from:
// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
import { add, float, Fn, If, max, min, select, sub, vec3 } from "three/tsl";

const hslHelper = Fn(
  ([h, s, l, n]: [
    ReturnType<typeof float>,
    ReturnType<typeof float>,
    ReturnType<typeof float>,
    ReturnType<typeof float>,
  ]) => {
    const k = n.add(h.mul(12)).mod(12);
    const a = s.mul(min(l, sub(1, l)));
    return l.sub(a.mul(max(-1, min(min(k.sub(3), sub(9, k)), 1))));
  },
).setLayout({
  name: "hslHelper",
  type: "float",
  inputs: [
    { name: "h", type: "float" },
    { name: "s", type: "float" },
    { name: "l", type: "float" },
    { name: "n", type: "float" },
  ],
});

// convert from hsl to rgb
const hslToRgb = Fn(([col]: [ReturnType<typeof vec3>]) => {
  const h = col.x.fract().add(1).fract();
  const s = col.y.clamp(0, 1);
  const l = col.z.clamp(0, 1);

  const r = hslHelper(h, s, l, 0);
  const g = hslHelper(h, s, l, 8);
  const b = hslHelper(h, s, l, 4);

  return vec3(r, g, b);
}).setLayout({
  name: "hsl",
  type: "vec3",
  inputs: [{ name: "col", type: "vec3" }],
});

const rgbToHsl = Fn(([rgb]: [ReturnType<typeof vec3>]) => {
  const R = float(rgb.x).toVar();
  const G = float(rgb.y).toVar();
  const B = float(rgb.z).toVar();

  const mx = max(R, max(G, B)).toVar();
  const mn = min(R, min(G, B)).toVar();

  const H = float(0).toVar();
  const S = float(0).toVar();
  const L = add(mx, mn).div(2);

  If(mn.notEqual(mx), () => {
    const delta = sub(mx, mn).toVar();

    S.assign(
      select(
        L.lessThanEqual(0.5),
        delta.div(add(mn, mx)),
        delta.div(sub(2, add(mn, mx))),
      ),
    );
    If(mx.equal(R), () => {
      H.assign(
        sub(G, B)
          .div(delta)
          .add(select(G.lessThanEqual(B), 6, 0)),
      );
    })
      .ElseIf(mx.equal(G), () => {
        H.assign(sub(B, R).div(delta).add(2));
      })
      .Else(() => {
        H.assign(sub(R, G).div(delta).add(4));
      });
    H.divAssign(6);
  });
  return vec3(H, S, L);
});

export { hslToRgb, rgbToHsl };
