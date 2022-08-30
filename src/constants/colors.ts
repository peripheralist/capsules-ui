import { BigNumber } from "ethers";
import { Hue } from "../models/hue";
import { RGB } from "../models/rgb";

export const RESERVED_COLORS: string[] = [
  "#ff0000",
  "#ffff00",
  "#00ff00",
  "#ffffff",
  "#00ffff",
  "#0000ff",
  "#ff00ff",
];

export const rgbToHex = (rgb: RGB) => {
  const toOctet = (int: number) =>
    BigNumber.from(int).toHexString().split("0x")[1];

  return "#" + toOctet(rgb.r) + toOctet(rgb.g) + toOctet(rgb.b);
};

export const hexToRgb = (hex: string): RGB => {
  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5), 16),
  };
};

export const ALL_COLORS = (() => {
  let colors: RGB[] = [];

  for (let g = 0; g <= 255; g += 5) {
    for (let b = 0; b <= 255; b += 5) {
      for (let r = 0; r <= 255; r += 5) {
        if (r === 255 || b === 255 || g === 255) colors.push({ r, g, b });
      }
    }
  }

  return colors.map(rgbToHex);
})();

// 7,957 total colors

export const hueForColor = (color: string): Hue | undefined => {
  const _color = color.split("#")[1];

  const r = BigNumber.from(`0x${_color.slice(0, 2)}`).toNumber();
  const g = BigNumber.from(`0x${_color.slice(2, 4)}`).toNumber();
  const b = BigNumber.from(`0x${_color.slice(4, 6)}`).toNumber();

  if (r === 255 && g === 255 && b === 255) return "white";

  if (r === 255) {
    if (g - b > r - g) return "yellow";
    if (b - g > r - b) return "pink";
    return "red";
  }

  if (b === 255) {
    if (r - g > b - r) return "pink";
    if (g - r > b - g) return "cyan";
    return "blue";
  }

  if (g === 255) {
    if (r - b > g - r) return "yellow";
    if (b - r > g - b) return "cyan";
    return "green";
  }
};

export const bytesToColorString = (bytes: string | undefined) =>
  bytes ? `#${bytes.split("0x")[1]}` : "";

export const colorStringToBytes = (str: string) => `0x${str.split("#")[1]}`;

export const byteFromColorString = (str: string, color: "r" | "g" | "b") => {
  const bytes = str.split("#")[1];

  switch (color) {
    case "r":
      return bytes.substring(0, 2);
    case "g":
      return bytes.substring(2, 4);
    case "b":
      return bytes.substring(4, 6);
  }
};
