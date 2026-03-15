// Only consider completed lamps for now, as the incomplete ones are not yet supported in the UI

import lamps, { LampData } from "@constants/lamp";
import paints, { PaintColor, PaintOption } from "@constants/paints";
import woods, { WoodOption, WoodType } from "@constants/woods";
import { create } from "zustand";

const [_, lamp] = lamps;
const [wood] = woods;

type LampState = {
  lamp: LampData;
  color: PaintOption | undefined;
  wood: WoodOption;
  setLamp: (lampId: string) => void;
  /** Set the color of the lamp */
  setLampColor: (color: PaintColor | undefined) => void;
  /** Set the wood type of the lamp */
  setLampWood: (wood: WoodType) => void;
};

const useLampStore = create<LampState>((set, get) => ({
  lamp,
  color: undefined,
  wood,
  setLamp: (lampId: string) => {
    const newLamp = lamps.find((l) => l.id === lampId);
    if (!newLamp) return;

    // Check if the current color and wood are available for the new lamp
    const store = get();
    let newColor = store.color;
    let newWood = store.wood;

    if (newColor && !newLamp.availableColor.includes(newColor.id)) {
      newColor = undefined;
    }
    if (!newLamp.availableWood.includes(newWood.id)) {
      newWood = woods.find((w) => w.id === newLamp.availableWood[0])!;
    }

    set({ lamp: newLamp, color: newColor, wood: newWood });
  },
  setLampColor: (color: PaintColor | undefined) => {
    const lamp = get().lamp;
    if (color === undefined) {
      set({ color: undefined });
      return;
    }
    const isColorAvailable = lamp.availableColor.includes(color);
    if (!isColorAvailable) {
      console.warn(`Color ${color} is not available for lamp ${lamp.name}`);
      return;
    }
    set({ color: paints.find((p) => p.id === color) });
  },
  setLampWood: (wood) => {
    const lamp = get().lamp;
    const isWoodAvailable = lamp.availableWood.includes(wood);
    if (!isWoodAvailable) {
      console.warn(`Wood ${wood} is not available for lamp ${lamp.name}`);
      return;
    }
    set({ wood: woods.find((w) => w.id === wood) });
  },
}));

export default useLampStore;
