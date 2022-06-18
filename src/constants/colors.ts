import { RGB } from "../models/rgb";
import { rgbToHex } from "../utils";

export const reservedColors: string[] = [
  "#ff0000",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#0000ff",
  "#ff00ff",
  "#ffffff",
];

export const allColors = () => {
  let colors: RGB[] = [];

  for (let g = 0; g <= 255; g += 5) {
    for (let b = 0; b <= 255; b += 5) {
      for (let r = 0; r <= 255; r += 5) {
        if (r === 255 || b === 255 || g === 255) colors.push({ r, g, b });
      }
    }
  }

  return colors.map(rgbToHex);
};
