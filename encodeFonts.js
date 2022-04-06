const fs = require("fs");
const { base64 } = require("ethers/lib/utils");

const dir = "src/fonts/";
const base64Dir = dir + "base64/";

fs.rmSync(base64Dir, {
  recursive: true,
  force: true,
});

fs.mkdirSync(base64Dir);

console.log("Created empty dir:", base64Dir);

const files = fs.readdirSync(dir);

for (let file of files) {
  if (!file.endsWith(".otf")) continue;

  console.log("encoding", file);

  fs.writeFileSync(
    base64Dir + file.replace(".otf", ".ts"),
    `export const font${file
      .replace(".otf", "")
      .replace("-", "")} = "${base64.encode(fs.readFileSync(dir + file))}"`
  );
}
