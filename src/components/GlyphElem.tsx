import { CSSProperties, useState } from "react";
import { unicodeNames } from "../fonts/unicode";

export default function GlyphElem({
  charCode,
  includeCode,
  style,
  onCopyGlyph,
}: {
  charCode: number;
  includeCode?: boolean;
  style?: CSSProperties;
  onCopyGlyph?: VoidFunction;
}) {
  const [didCopy, setDidCopy] = useState<boolean>();

  const id = charCode.toString();
  const char = String.fromCharCode(charCode);

  const copyToClipboard = () => {
    if (didCopy) return;

    onCopyGlyph?.();

    const input = document.getElementById(id) as HTMLInputElement;

    if (!input) return;

    /* Select the text field */
    input.select();
    input.setSelectionRange(0, 1); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(input.value);

    setDidCopy(true);

    setTimeout(() => {
      setDidCopy(undefined);
    }, 1500);
  };

  return (
    <div style={{ textAlign: "center" }} key={charCode}>
      <div
        style={{
          padding: "1rem",
          fontSize: "1.5rem",
          width: "1.5rem",
          whiteSpace: "pre",
          background: "#ffffff16",
          userSelect: "none",
          cursor: "default",
          position: "relative",
          ...style,
          fontWeight: didCopy ? 700 : style?.fontWeight,
        }}
        onClick={copyToClipboard}
      >
        {char}

        {didCopy ? (
          <div
            style={{
              fontWeight: 700,
              fontSize: "35%",
              position: "absolute",
              bottom: "5%",
              left: 0,
              right: 0,
            }}
          >
            COPIED
          </div>
        ) : null}

        {includeCode && (
          <div
            style={{
              fontWeight: 600,
              fontSize: "25%",
              opacity: 0.5,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "-20%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {unicodeNames[charCode.toString(16).padStart(4, "0")]}
          </div>
        )}
      </div>
      <input hidden type="text" id={id} defaultValue={char} />
    </div>
  );
}
