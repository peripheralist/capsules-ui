import { useMemo } from "react";
import { maxLineLength, maxLinesCount } from "./constants/lines";

import { Lines } from "./models/lines";
import { isAllowedChar } from "./utils";

export default function TextEditor({
  lines,
  setLines,
}: {
  lines: Lines;
  setLines: (lines: Lines | ((lines: Lines) => Lines)) => void;
}) {
  const gap = 0;
  const fontSize = 24;
  const charWidth = fontSize * 0.6;

  const textInputs = useMemo(() => {
    let elems: JSX.Element[] = [];
    let underline: string = "";

    for (let i = 0; i < maxLineLength; i++) {
      underline += "_";
    }

    for (let i = 0; i < maxLinesCount; i++) {
      const nextInput = document.getElementById(
        `input${i + 1}`
      ) as HTMLInputElement | null;
      const prevInput = document.getElementById(
        `input${i - 1}`
      ) as HTMLInputElement | null;

      elems.push(
        <div style={{ position: "relative", height: 36 }}>
          <input
            key={i}
            autoFocus={i === 0}
            autoComplete="off"
            style={{
              background: "transparent",
              height: 36,
              lineHeight: 1,
              fontSize,
              width: maxLineLength * charWidth,
              padding: 0,
            }}
            value={lines[i] ?? ""}
            type="text"
            maxLength={maxLineLength}
            name={`input${i}`}
            data-lpignore="true"
            id={`input${i}`}
            onKeyDown={(e) => {
              const cursorPosition: number = (e.target as any).selectionStart;
              const lineLength = (e.target as any).value.length;

              // Allow switching between inputs
              switch (e.code) {
                case "Enter":
                case "ArrowDown":
                  nextInput?.focus();
                  break;
                case "ArrowUp":
                  prevInput?.focus();
                  break;
                case "ArrowRight":
                  if (cursorPosition === lineLength) {
                    nextInput?.focus();
                  }
                  break;
                case "ArrowLeft":
                case "Backspace":
                  if (cursorPosition === 0) {
                    prevInput?.focus();
                    prevInput?.setSelectionRange(
                      prevInput.value.length - 1,
                      prevInput.value.length - 1
                    );
                  }
                  break;
              }
            }}
            onChange={(e) => {
              // Filter unallowed chars from val
              const value = e.target.value
                .split("")
                .filter(isAllowedChar)
                .join("");

              const trim = (lines: Lines) => {
                let _lines = [...lines.reverse()];

                while (_lines.length && !_lines[0].length) {
                  _lines = _lines.slice(1);
                }

                return _lines.reverse();
              };

              setLines((_lines) => {
                if (_lines.length < i + 1) {
                  let newLines: Lines = [];

                  for (let _i = 0; _i < i; _i++) {
                    newLines.push(_lines[_i] || "");
                  }

                  newLines.push(value);

                  return trim(newLines);
                } else {
                  return trim(_lines.map((l, _i) => (_i === i ? value : l)));
                }
              });

              const cursorPosition = e.target.selectionStart;

              // Focus previous or next text input while typing
              if (cursorPosition === maxLineLength) {
                nextInput?.focus();
                nextInput?.setSelectionRange(0, 0);
              }
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 0,
              top: 12,
              opacity: 0.25,
              fontSize,
              color: "#fff",
              lineHeight: 1,
              zIndex: -1,
            }}
          >
            {underline}
          </div>
        </div>
      );
    }

    return elems;
  }, [lines, setLines]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        right: 0,
        left: 0,
      }}
    >
      {textInputs}
    </div>
  );
}
