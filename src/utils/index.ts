import { BigNumber, utils } from "ethers";
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

export const isEmptyText = (text: string[]) =>
  text.every((l) => !l.length) ||
  text.every((l) => l === "0x00000000000000000000000000000000");

export const rgbToHex = (rgb: RGB) => {
  const toOctet = (int: number) =>
    BigNumber.from(int).toHexString().split("0x")[1];

  return "#" + toOctet(rgb.r) + toOctet(rgb.g) + toOctet(rgb.b);
};

export const defaultText = (color: string | undefined): Text => [
  `CAPSULE`,
  `${color?.startsWith("0x") ? bytesToColorString(color) : color}`,
];

export const isAllowedChar = (char: string) => {
  if (!char.length || char.length > 1) return false;
  return isAllowedCode(char.codePointAt(0));
};

export const isAllowedCode = (code?: number) => {
  if (code === undefined) return false;
  return unicodes.includes(code);
};

export const bytesToColorString = (bytes: string) => `#${bytes.split("0x")[1]}`;

export const colorStringToBytes = (str: string) => `0x${str.split("#")[1]}`;

export const toText = (text: string[]) => [
  ...text.map(strToBytes16),
  ...Array.from(Array(8 - text.length)).map(
    (_) => "0x00000000000000000000000000000000"
  ),
];

export const parseText = (text: string[], color: string) =>
  isEmptyText(text)
    ? defaultText(color.startsWith("0x") ? bytesToColorString(color) : color)
    : text
        .filter((t) => t !== "0x00000000000000000000000000000000")
        .map((t) => {
          let str = t;
          try {
            str = utils.toUtf8String(t);
            // trim 0x00 chars from end
            while (str[str.length - 1] === "\u0000") {
              str = str.substring(0, str.length - 1);
            }
          } catch (_) {}
          return str;
        });

export const strToBytes16 = (str: string) => {
  let bytes = strToUtf8Bytes(str)
    .map((char) => utils.hexValue(char).split("0x")[1])
    .join("");
  bytes = bytes.toString().padEnd(32, "00");
  return "0x" + bytes;
};

function strToUtf8Bytes(str: string) {
  const utf8 = [];
  for (let ii = 0; ii < str.length; ii++) {
    let charCode = str.charCodeAt(ii);
    if (charCode < 0x80) utf8.push(charCode);
    else if (charCode < 0x800) {
      utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      utf8.push(
        0xe0 | (charCode >> 12),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      );
    } else {
      ii++;
      // Surrogate pair:
      // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
      // splitting the 20 bits of 0x0-0xFFFFF into two halves
      charCode =
        0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
      utf8.push(
        0xf0 | (charCode >> 18),
        0x80 | ((charCode >> 12) & 0x3f),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      );
    }
  }
  return utf8;
}
