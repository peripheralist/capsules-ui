import { useMemo } from "react";
import { maxLineLength, maxLinesCount } from "./constants/text";

import { Text } from "./models/text";
import { defaultText, isAllowedChar, isEmptyText } from "./utils";
import { isMobile } from "./constants/isMobile";
import Button from "./components/Button";

export default function TextEditor({
  text,
  setText,
  color,
}: {
  text: Text;
  setText: (text: Text | ((text: Text) => Text)) => void;
  color: string | undefined;
}) {
  const gap = 0;
  const fontSize = isMobile ? 20 : 24;
  const charWidth = fontSize * 0.6;

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

      const placeholders: string[] = isEmptyText(text)
        ? defaultText(color, 0)
        : [];

      elems.push(
        <div key={i} style={{ position: "relative", height: fontSize * 1.5 }}>
          <input
            autoFocus={!isMobile && i === 0}
            autoComplete="off"
            placeholder={placeholders[i]}
            style={{
              background: "transparent",
              height: 36,
              lineHeight: 1,
              fontSize,
              width: maxLineLength * charWidth,
              padding: 0,
            }}
            value={text[i] ?? ""}
            type="text"
            maxLength={maxLineLength}
            name={`input${i}`}
            data-lpignore="true"
            id={`input${i}`}
            onKeyUp={(e) => {
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
                  break;
                case "ArrowUp":
                  _prevInput?.focus();
                  break;
                case "ArrowRight":
                  if (cursorPosition === lineLength) {
                    _nextInput?.focus();
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
  }, [text, setText, charWidth, fontSize]);

  return (
    <div>
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
