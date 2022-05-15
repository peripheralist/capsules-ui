import { unicodes } from "../fonts/unicode";

export const charGroups = {
  punctuationSymbols: [
    ...unicodes.filter(
      (x) =>
        (x >= 0x21 && x <= 0x2f) ||
        (x >= 0x3a && x <= 0x40) ||
        (x >= 0x5b && x <= 0x60) ||
        (x >= 0x7b && x <= 0x7e)
    ),
    0x00a1,
    0x00bf,
    0x203c,
  ],
  digits: unicodes.filter((x) => x >= 0x30 && x <= 0x39),
  uppercase: unicodes.filter((x) => x >= 0x41 && x <= 0x5a),
  lowercase: unicodes.filter((x) => x >= 0x61 && x <= 0x7a),
  arrows: [
    ...unicodes.filter(
      (x) => (x >= 0x2190 && x <= 0x2199) || (x >= 0x2b05 && x <= 0x2b0d)
    ),
    0x2b95,
  ],
  spaces: [0x20, 0xa0],
  math: [
    0x00d7, 0x2212, 0x00b1, 0x00f7, 0x2265, 0x2264, 0x03c0, 0x2211, 0x220f,
    0x221a, 0x222b, 0x2260, 0x2248, 0x221e, 0x2206, 0x2044, 0x2030,
  ],
  currencies: [
    0x039e, 0x20bf, 0x00a3, 0x00a2, 0x00a4, 0x00a5, 0x20ac, 0x0192, 0x0e3f,
    0x20b4, 0x20bd, 0x20b9,
  ],
  custom: unicodes.filter((x) => x >= 0xe000),
  others: [] as number[],
};

charGroups.others = unicodes.filter(
  (x) => !Object.values(charGroups).flat().includes(x)
);
