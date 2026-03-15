export type PaintColor = "white" | "black" | "red" | "green" | "blue";

export interface PaintOption {
  id: PaintColor;
  name: string;
  color: string;
}

const paints: PaintOption[] = [
  {
    id: "white",
    name: "White",
    color: "#ffffff",
  },
  {
    id: "black",
    name: "Black",
    color: "#000000",
  },
  {
    id: "red",
    name: "Red",
    color: "#ff0000",
  },
  {
    id: "green",
    name: "Green",
    color: "#00ff00",
  },
  {
    id: "blue",
    name: "Blue",
    color: "#0000ff",
  },
];

export default paints;
