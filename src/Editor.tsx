import { useState } from "react";
import { Lines } from "./models/lines";
import Capsule from "./Capsule";

const maxLineLength = 15;

export default function Editor() {
  const [lines, setLines] = useState<Lines>([]);

  function handleInput(str: string) {
    let newLines: Lines = [];
    let line = "";

    const words = str
      .split(" ")
      .flatMap((w) =>
        w.includes("\n")
          ? w
              .split("\n")
              .flatMap((_w, i, arr) => (i < arr.length - 1 ? [_w, "\n"] : [_w]))
          : [w]
      );

    words.forEach((word) => {
      if (word.length >= maxLineLength) {
        line = word;
        return;
      }

      if (line.length + word.length >= maxLineLength || word === "\n") {
        // End line and start new
        newLines.push(line);
        // Reset line
        line = "";
      } else {
        // Add to current line
        if (line.length) line += " ";
      }

      if (word !== "\n") line += word;
    });

    setLines([...newLines, line]);
  }

  const size = 400;

  return (
    <div>
      <div style={{ paddingBottom: 100 }}>
        <div>
          <textarea
            style={{ fontSize: 20 }}
            cols={maxLineLength + 1}
            rows={12}
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <div style={{ display: "flex", gap: 30 }}>
            <Capsule size={size} note={lines} scheme="white" />
            <Capsule size={size} note={lines} scheme="cyan" />
          </div>
          <div style={{ display: "flex", gap: 30 }}>
            <Capsule size={size} note={lines} scheme="pink" />
            <Capsule size={size} note={lines} scheme="yellow" />
          </div>
        </div>
      </div>
    </div>
  );
}
