import { BigNumber, constants } from "ethers";
import { Hue } from "../models/hue";
import { Text } from "../models/text";
import { RGB } from "../models/rgb";
import { unicodes } from "../fonts/unicode";

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

export const isEmptyText = (text: string[]) => text.every((l) => !l.length);

export const rgbToHex = (rgb: RGB) => {
  const toOctet = (int: number) =>
    BigNumber.from(int).toHexString().split("0x")[1];

  return "#" + toOctet(rgb.r) + toOctet(rgb.g) + toOctet(rgb.b);
};

export const defaultText = (
  color: string | undefined,
  id: number,
  owner: string = constants.AddressZero
): Text => [
  `CAPSULE`,
  `#${color?.split("#")[1] ?? "--"}`,
  // "OWNER:",
  // `${owner.slice(0, 14)}`,
  // `${owner.slice(14, 28)}`,
  // `${owner.slice(28, 42)}`,
];

export const isAllowedChar = (char: string) => {
  if (!char.length || char.length > 1) return false;
  return isAllowedCode(char.codePointAt(0));
};

export const isAllowedCode = (code?: number) => {
  if (code === undefined) return false;
  return unicodes.includes(code);
};
