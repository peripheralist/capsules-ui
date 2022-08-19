import { BigNumber } from "ethers";
import { Hue } from "../models/hue";
import { RGB } from "../models/rgb";
import { unicodes } from "../fonts/unicode";
import { BytesText, Text } from "../models/text";

const zeroBytes4 = "0x00000000";

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

export const isEmptyText = (text: Text) => text.every((line) => !line.length);

export const isEmptyBytesText = (text: BytesText) =>
  text.every((line) => line.every((char) => char === zeroBytes4));

export const rgbToHex = (rgb: RGB) => {
  const toOctet = (int: number) =>
    BigNumber.from(int).toHexString().split("0x")[1];

  return "#" + toOctet(rgb.r) + toOctet(rgb.g) + toOctet(rgb.b);
};

export const defaultText = (color: string | undefined): string[] => [
  `CAPSULE`,
  `${color?.startsWith("0x") ? bytesToColorString(color) : color}`,
];

export const randPlaceholders = () => {
  let text: Text = [];
  for (let li = 0; li < 8; li++) {
    let line = "";
    for (let ci = 0; ci < 16; ci++) {
      line += String.fromCharCode(
        unicodes[Math.floor(Math.random() * unicodes.length)]
      );
    }
    text.push(line);
  }
  return text;
};

export const isAllowedChar = (char: string) => {
  if (!char.length || char.length > 1) return false;
  return isAllowedCode(char.codePointAt(0));
};

export const isAllowedCode = (code?: number) => {
  if (code === undefined) return false;
  return unicodes.includes(code);
};

export const bytesToColorString = (bytes: string | undefined) =>
  bytes ? `#${bytes.split("0x")[1]}` : "";

export const colorStringToBytes = (str: string) => `0x${str.split("#")[1]}`;

export const textToBytesText = (text: string[]) => {
  const lines = [];
  for (let i = 0; i < 8; i++) {
    lines.push(stringToBytes4Line(text.length > i ? text[i] : ""));
  }
  return lines;
};

export const stringToBytes4Line = (str?: string) => {
  const arr: string[] = [];
  for (let i = 0; i < 16; i++) {
    let byte = "00000000";
    if (str && str.length > i) {
      byte = Buffer.from(str[i], "utf8").toString("hex").padStart(8, "0");
    }
    arr.push("0x" + byte);
  }
  return arr;
};

export const parseBytesText = (text: BytesText): string[] =>
  isEmptyBytesText(text)
    ? []
    : trimText(
        text.map((line) =>
          line
            .map((bytes4) =>
              Buffer.from(bytes4.split("0x")[1], "hex").toString()
            )
            .join("")
            .replaceAll("\x00", "")
        )
      );

// Remove trailing empty lines
export const trimText = (text: Text): Text => {
  let output = [];
  for (let i = text.length - 1; i >= 0; i--) {
    if (text[i].length || output.length) output.push(text[i]);
  }
  return output;
};

export const deepEqBytesTexts = (text1: BytesText, text2: BytesText): boolean =>
  text1.every((line, i) => line.every((bytes4, j) => bytes4 === text2[i][j]));
