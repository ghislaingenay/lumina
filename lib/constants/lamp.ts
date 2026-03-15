import { PaintColor } from "./paints";
import { WoodType } from "./woods";

export type LampData = {
  id: string;
  name: string;
  assembly: string;
  model: string;
  image: string;
  parts: string[] | null;
  availableColor: PaintColor[];
  availableWood: WoodType[];
};

export default [
  {
    id: "treed",
    name: "Treed",
    model: "/models/treed.glb",
    assembly: "whole",
    parts: null,
    image: "/lamps/treed.png",
    availableColor: ["white", "black", "blue"],
    availableWood: ["plywood", "linoleum"],
  },
  {
    id: "tuboc",
    name: "Tuboc",
    model: "/models/tuboc.glb",
    assembly: "whole",
    parts: null,
    image: "/lamps/tuboc.png",
    availableColor: ["white", "black"],
    availableWood: ["plywood", "linoleum"],
  },
  {
    id: "japo",
    name: "Japo",
    model: "/models/japo.glb",
    assembly: "whole",
    image: "/lamps/japo.png",
    parts: null,
    availableColor: [],
    availableWood: ["plywood", "linoleum"],
  },
] satisfies LampData[];
