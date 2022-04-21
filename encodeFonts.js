const fs = require("fs");
const { base64 } = require("ethers/lib/utils");

const dir = "src/fonts/";

const files = fs.readdirSync(dir);

const weightForFont = (name) => {
  switch (name) {
    case "Thin":
      return 100;
    case "ExtraLight":
      return 200;
    case "Light":
      return 300;
    case "Regular":
      return 400;
    case "Medium":
      return 500;
    case "SemiBold":
      return 600;
    case "Bold":
      return 700;
    case "ExtraBold":
      return 800;
    case "Black":
      return 900;
  }
};

let fileContents = "export const fonts = {";

for (let file of files) {
  if (!file.endsWith(".otf")) continue;

  console.log("encoding", file);

  let weight = weightForFont(file.replace(".otf", "").split("-")[1]);

  fileContents += `${weight}: "${base64.encode(fs.readFileSync(dir + file))}",`;
}

// Remove trailing comma
fileContents = fileContents.substring(0, fileContents.length - 1);

fileContents += "};";

fs.writeFileSync(dir + "/fonts.ts", fileContents);
