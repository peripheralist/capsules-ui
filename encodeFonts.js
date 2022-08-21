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
    .sort((a, b) => (parseInt(a, 16) > parseInt(b, 16) ? 1 : -1))
    .forEach((curr, i) => {
      const prev = unicodes[i - 1];
      const formatted = `0x${curr.toString(16)}`;
      if (prev && curr - prev > 1) {
        groups.push(temp);
        temp = [formatted];
      } else {
        temp.push(formatted);
      }
    });

  fs.writeFileSync(
    dir + "/unicode.ts",
    `export const unicodes = [${unicodes.map((x) => "0x" + x)}];
  
export const unicodeGroups = [${groups.map((g) => `[${g}]`)}];
  
export const unicodeNames: Record<string, string> = ${JSON.stringify(charMap)};`
  );

  console.log(`Wrote ${unicodes.length} unicodes`);
}

writeFontsFile();
writeUnicode();
