import { useMemo } from "react";

import Button from "./Button";
import { isMobile } from "../constants/isMobile";
import { maxLineLength, maxLinesCount } from "../constants/text";
import { useFonts } from "../hooks/fonts";
import { Weight } from "../models/weight";
import {
  defaultText,
  isAllowedChar,
  isEmptyText,
  randPlaceholders,
} from "../utils";
import { Text } from "../models/text";

export default function TextEditor({
  text,
  setText,
  color,
  weight,
  setWeight,
  locked,
  setLocked,
  autofocus,
}: {
  text: Text;
  setText: (text: string[] | ((text: Text) => Text)) => void;
  color: string | undefined;
  weight: Weight;
  setWeight: (weight: Weight | ((weight: Weight) => Weight)) => void;
  locked?: boolean;
  setLocked?: (locked: boolean | ((locked: boolean) => boolean)) => void;
  autofocus?: boolean;
}) {
  const fontSize = isMobile ? 20 : 24;
  const charWidth = fontSize * 0.6;

  const fonts = useFonts();

  const placeholders: string[] = useMemo(() => {
    if (!text.length) {
      return [defaultText(color)[0], defaultText(color)[1]];
    }

    return randPlaceholders().map((p, i) => (text.length > i ? text[i] : p));
  }, [text, color]);

  const textInputs = useMemo(() => {
    let elems: JSX.Element[] = [];
    let underline: string = "";

    for (let i = 0; i < maxLineLength; i++) {
      underline += "_";
    }

    for (let i = 0; i < maxLinesCount; i++) {
      const nextInput = () =>
        document.getElementById(`input${i + 1}`) as HTMLInputElement | null;
      const prevInput = () =>
        document.getElementById(`input${i - 1}`) as HTMLInputElement | null;

      elems.push(
        <div
          key={i}
          style={{
            position: "relative",
            height: fontSize * 1.5,
            width: maxLineLength * charWidth,
          }}
        >
          <input
            autoFocus={!isMobile && autofocus && i === 0}
            autoComplete="off"
            placeholder={placeholders[i]}
            style={{
              background: "transparent",
              height: 36,
              lineHeight: 1,
              fontSize,
              padding: 0,
              caretColor: color,
            }}
            value={text[i] ?? ""}
            type="text"
            maxLength={maxLineLength}
            name={`input${i}`}
            data-lpignore="true"
            id={`input${i}`}
            onKeyDown={(e) => {
              const cursorPosition: number = (e.target as any).selectionStart;
              const selectionLength: number =
                (e.target as any).selectionEnd - cursorPosition;
              const lineLength = (e.target as any).value.length;
              const _prevInput = prevInput();
              const _nextInput = nextInput();

              // Allow switching between inputs
              switch (e.code) {
                case "Enter":
                case "ArrowDown":
                  _nextInput?.focus();
                  e.preventDefault();
                  break;
                case "ArrowUp":
                  _prevInput?.focus();
                  e.preventDefault();
                  break;
                case "ArrowRight":
                  if (cursorPosition === lineLength) {
                    _nextInput?.focus();
                    e.preventDefault();
                  }
                  break;
                case "ArrowLeft":
                case "Backspace":
                  if (cursorPosition === 0 && selectionLength === 0) {
                    _prevInput?.focus();
                    _prevInput?.setSelectionRange(
                      _prevInput.value.length,
                      _prevInput.value.length
                    );
                    e.preventDefault();
                  }
                  break;
              }
            }}
            onChange={(e) => {
              // Filter unallowed chars from val
              const value = e.target.value
                .replace("…", ".")
                .split("")
                .filter(isAllowedChar)
                .join("");

              const trim = (text: Text) => {
                let _text = [...text.reverse()];

                while (_text.length && !_text[0].length) {
                  _text = _text.slice(1);
                }

                return _text.reverse();
              };

              setText((_text) => {
                if (_text.length < i + 1) {
                  let newText: Text = [];

                  for (let _i = 0; _i < i; _i++) {
                    newText.push(_text[_i] || "");
                  }

                  newText.push(value);

                  return trim(newText);
                } else {
                  return trim(_text.map((l, _i) => (_i === i ? value : l)));
                }
              });

              const cursorPosition = e.target.selectionStart;

              // Focus previous or next text input while typing
              if (cursorPosition === maxLineLength) {
                nextInput()?.focus();
                nextInput()?.setSelectionRange(0, 0);
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
  }, [text, setText, charWidth, fontSize, color, placeholders, autofocus]);

  const options = useMemo(
    () =>
      fonts?.map((f) => (
        <option
          key={f.weight}
          value={f.weight}
          label={f.weight.toString() + (!f.minter ? " - locked" : "")}
          disabled={!f.minter}
        />
      )),
    [fonts]
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          right: 0,
          left: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "baseline",
            fontWeight: 600,
          }}
        >
          <div>FONT:</div>
          <select
            style={{ flex: 1, fontSize: "1rem", fontWeight: 600 }}
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value) as Weight)}
          >
            {options}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {textInputs}
        </div>
      </div>

      <Button
        style={{ margin: "0 auto" }}
        size="small"
        onClick={() => setText([])}
        isDisabled={isEmptyText(text)}
        text="Clear"
      />
    </div>
  );
}
