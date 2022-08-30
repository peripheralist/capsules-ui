import { bytesToColorString } from "../constants/colors";
import { unicodes } from "../fonts/unicode";
import { BytesText, Text } from "../models/text";

const zeroBytes4 = "0x00000000";

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

export const isEmptyText = (text: Text) => text.every((line) => !line.length);

export const isEmptyBytesText = (text: BytesText) =>
  text.every((line) => line.every((char) => char === zeroBytes4));

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
    if (text[i].length || output.length) output.unshift(text[i]);
  }
  return output;
};

export const deepEqBytesTexts = (text1: BytesText, text2: BytesText): boolean =>
  text1.every((line, i) => line.every((bytes4, j) => bytes4 === text2[i][j]));

export const isAllowedChar = (char: string) =>
  char?.length === 1 && isAllowedCode(char.codePointAt(0));

export const isAllowedCode = (code?: number) => code && unicodes.includes(code);
