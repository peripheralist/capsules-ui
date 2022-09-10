const fs = require("fs");
const { base64 } = require("ethers/lib/utils");

const dir = "src/fonts/";

let fileContents = "export const FONTS = {";

function writeFontsFile() {
  console.log("Writing fonts file");

  const files = fs.readdirSync(dir);

  for (let file of files) {
    if (!file.endsWith(".woff")) continue;

    console.log("encoding", file);

    let weight = file.replace(".woff", "").split("-")[1];

    if (!weight) continue;

    fileContents += `${weight}: "${base64.encode(
      fs.readFileSync(dir + file)
    )}",`;
  }

  // Remove trailing comma
  fileContents = fileContents.substring(0, fileContents.length - 1);

  fileContents += "};";

  fs.writeFileSync(dir + "/fonts.ts", fileContents);
}

function writeUnicode() {
  const txt = fs.readFileSync(dir + "unicode.txt").toString();

  const lines = txt.split("\n").filter((x) => x.startsWith("uni"));

  const unicodes = lines
    .map((x) => x.split(" ")[0].split("uni")[1])
    .filter((x) => x.toLowerCase() != "ffff" && x != "0000");

  const charMap = unicodes.reduce(
    (acc, curr, i) => ({
      ...acc,
      [curr.toLowerCase()]: lines[i].split(" ")[2],
    }),
    {}
  );

  const groups = [];
  let temp = [];
  unicodes
    .sort((a, b) => (a > b ? 1 : -1))
    .forEach((curr, i) => {
      const prev = unicodes[i - 1];
      const formatted = `0x${curr.toString(16)}`;
      if (prev && parseInt(curr, 16) - parseInt(prev, 16) > 1) {
        groups.push(temp);
        temp = [formatted];
      } else {
        temp.push(formatted);
      }
    });

  // temp = [];
  // const bytes1Groups = [];
  // unicodes
  //   .sort((a, b) => (a > b ? 1 : -1))
  //   .forEach((curr, i) => {
  //     const prev = unicodes[i - 1];
  //     const formatted = `0x${curr.toString(16)}`;
  //     const isBytes1 = formatted.startsWith("0x00");

  //     if (!isBytes1 || (prev && parseInt(curr, 16) - parseInt(prev, 16) > 1)) {
  //       if (temp.length) bytes1Groups.push(temp);
  //       temp = isBytes1 ? [formatted] : [];
  //     } else if (isBytes1) {
  //       temp.push(formatted);
  //     }
  //   });

  // function trimBytes1(char) {
  //   return `0x${char.toString().split("0x00")[1]}`;
  // }
  // let bytes1Comparison = "(";
  // bytes1Groups.forEach((g, i) => {
  //   if (g.length === 1) {
  //     bytes1Comparison += ` char == ${trimBytes1(g)}`;
  //   } else {
  //     bytes1Comparison += ` (char >= ${trimBytes1(
  //       g[0]
  //     )} && char <= ${trimBytes1(g[g.length - 1])})`;
  //   }

  //   if (i < groups.length - 1) bytes1Comparison += " ||";
  // });
  // bytes1Comparison += ")";
  // bytes1Comparison = bytes1Comparison.toLowerCase();

  function padBytes3(char) {
    return `0x${char.toString().split("0x")[1].padStart(6, "0")}`;
  }
  const varName = "cp";
  let bytes4Comparison = "(";
  groups.forEach((g, i) => {
    if (g.length === 1) {
      bytes4Comparison += ` ${varName} == ${padBytes3(g)}`;
    } else {
      bytes4Comparison += ` (${varName} >= ${padBytes3(
        g[0]
      )} && ${varName} <= ${padBytes3(g[g.length - 1])})`;
    }

    if (i < groups.length - 1) bytes4Comparison += " ||";
  });
  bytes4Comparison += ")";
  bytes4Comparison = bytes4Comparison.toLowerCase();

  fs.writeFileSync(
    dir + "/unicode.ts",
    `export const unicodes = [${unicodes.map((x) => "0x" + x)}];
  
export const unicodeGroups = [${groups.map((g) => `[${g}]`)}];

export const bytes4Comparison = '${bytes4Comparison}';
  
export const unicodeNames: Record<string, string> = ${JSON.stringify(charMap)};`
  );

  console.log(`Wrote ${unicodes.length} unicodes`);
}

writeFontsFile();
writeUnicode();
