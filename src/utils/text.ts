import { bytesToColorString } from "../constants/colors";
import { maxLineLength } from "../constants/text";
import { unicodes } from "../fonts/unicode";
import { BytesText, Text } from "../models/text";

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

export const isEmptyBytesText = (text: BytesText) => {
  for (let i = 0; i < 8; i++) {
    const line = text[i];
    for (let j = 0; j < 64; j += 4) {
      if (line.substring(j, j + 4) !== "0000") return false;
    }
  }
  return true;
};

export const textToBytesText = (text: string[]): BytesText => {
  const lines = [];
  for (let i = 0; i < 8; i++) {
    lines.push(stringToBytes32(text.length > i ? text[i] : ""));
  }
  return lines as BytesText;
};

export const stringToBytes32 = (str?: string) => {
  let bytes32: string = "";
  for (let i = 0; i < 16; i++) {
    let byte = "0000";
    if (str && str.length > i) {
      byte = str[i].charCodeAt(0).toString(16).padStart(4, "0");
    }
    bytes32 += byte;
  }
  return "0x" + bytes32;
};

export const charToBytes2 = (char?: string) =>
  "0x" +
  (char
    ? // get unicode
      char.charCodeAt(0).toString(16).padStart(4, "0")
    : "0000");

export const parseBytesText = (text: BytesText): Text =>
  isEmptyBytesText(text)
    ? []
    : trimText(
        text.map((line) => {
          line = line.split("0x")[1];
          let str = "";
          for (let i = 0; i <= 64; i += 4) {
            str += String.fromCharCode(parseInt(line.substring(i, i + 4), 16));
          }
          return str;
        })
      );

// Remove trailing empty lines
export const trimText = (text: Text): Text => {
  let output = [];
  for (let i = text.length - 1; i >= 0; i--) {
    const line = trimLine(text[i]);
    if (line.length || output.length) output.unshift(line);
  }
  return output;
};

// Remove trailing
export const trimLine = (line: string) => {
  let _line = line;
  while (_line.length > 0 && _line.endsWith(`\x00`)) {
    _line = _line.substring(0, _line.length - 1);
  }
  return _line;
};

export const textWidth = (text: Text) =>
  Math.min(
    text.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0),
    maxLineLength
  );

export const deepEqBytesTexts = (text1: BytesText, text2: BytesText): boolean =>
  text1.every((line, i) => line === text2[i]);

export const isAllowedChar = (char: string) =>
  char?.length === 1 && isAllowedCode(char.codePointAt(0));

export const isAllowedCode = (code?: number) => code && unicodes.includes(code);

export const toSmallCaps = (str: string) =>
  str.split("").map((x) => {
    switch (x.toLowerCase()) {
      case "a":
        return "ᴀ";
      case "b":
        return "ʙ";
      case "d":
        return "ᴅ";
      case "e":
        return "ᴇ";
      case "f":
        return "ꜰ";
      case "g":
        return "ɢ";
      case "h":
        return "ʜ";
      case "i":
        return "ɪ";
      case "j":
        return "ᴊ";
      case "k":
        return "ᴋ";
      case "l":
        return "ʟ";
      case "m":
        return "ᴍ";
      case "n":
        return "ɴ";
      case "p":
        return "ᴘ";
      case "q":
        return "ꞯ";
      case "r":
        return "ʀ";
      case "t":
        return "ᴛ";
      case "y":
        return "ʏ";
      default:
        return x.toLowerCase();
    }
  });
