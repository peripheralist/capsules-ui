import { constants } from "ethers";
import { Weight } from "../models/weight";

export function useFonts(): {
  weight: Weight;
  color: string;
  unlocked: string;
}[] {
  return [
    {
      weight: 100,
      color: "#00ffff",
      unlocked: constants.AddressZero,
    },
    {
      weight: 200,
      color: "#0000ff",
      unlocked: constants.AddressZero,
    },
    {
      weight: 300,
      color: "#ff00ff",
      unlocked: constants.AddressZero,
    },
    {
      weight: 400,
      color: "#ffffff",
      unlocked: "peri.eth",
    },
    {
      weight: 500,
      color: "#ff0000",
      unlocked: constants.AddressZero,
    },
    {
      weight: 600,
      color: "#ffff00",
      unlocked: constants.AddressZero,
    },
    {
      weight: 700,
      color: "#00ff00",
      unlocked: constants.AddressZero,
    },
  ];
}
