export type WoodType = "plywood" | "linoleum";

type WoodTexture = {
  color: string;
  normal: string;
  ao: string;
};

export interface WoodOption {
  id: WoodType;
  name: string;
  texture: {
    color: string;
    normal: string;
    ao: string;
  };
}

const getTexture = (wood: WoodType): WoodTexture => {
  const baseURL = `textures/woods/${wood}`;
  return {
    color: `${baseURL}/${wood}_diff_1k.ktx2`,
    normal: `${baseURL}/${wood}_nor_gl_1k.ktx2`,
    ao: `${baseURL}/${wood}_arm_1k.ktx2`,
  };
};

const woods: WoodOption[] = [
  {
    id: "plywood",
    name: "Plywood",
    texture: getTexture("plywood"),
  },
  {
    id: "linoleum",
    name: "Linoleum",
    texture: getTexture("linoleum"),
  },
];

export default woods;
