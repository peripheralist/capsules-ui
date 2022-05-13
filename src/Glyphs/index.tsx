import React, { useMemo, useState } from "react";

import { fonts } from "../fonts/fonts";
import { unicodeNames } from "../fonts/unicode";
import { charGroups } from "./orderedUnicodes";
import { placeholders } from "./placeholders";

export default function Glyphs() {
  const [weight, setWeight] = useState<number>(400);
  const [showUnicode, setShowUnicode] = useState<boolean>(false);

  const top = "4rem";

  const GlyphElem = (x: number) => (
    <div style={{ textAlign: "center", width: 100 }}>
      <div
        style={{
          padding: "1rem",
          fontSize: "3rem",
          whiteSpace: "pre",
          background: "#ffffff16",
          fontWeight: weight,
          userSelect: "all",
          cursor: "default",
        }}
        dangerouslySetInnerHTML={{ __html: "&#" + x + ";" }}
      ></div>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, opacity: 0.5 }}>
        {showUnicode ? (
          <div>0x{x.toString(16).padStart(4, "0").toUpperCase()}</div>
        ) : (
          <div>{unicodeNames[x.toString(16).padStart(4, "0")]}</div>
        )}
      </div>
    </div>
  );

  const GlyphSection = (title: string, chars: number[]) => (
    <div>
      {/* <h4>{title}</h4> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {chars.map(GlyphElem)}
      </div>
    </div>
  );

  const placeholder = useMemo(
    () => placeholders[Math.floor(Math.random() * placeholders.length)],
    []
  );

  return (
    <div>
      <div
        style={{
          padding: "0 4rem",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexWrap: "wrap",
          height: top,
          margin: "0 auto",
          alignItems: "baseline",
          background: "#000",
          zIndex: 1,
          gap: "2rem",
        }}
      >
        {Object.keys(fonts).map((w) => (
          <div
            style={{
              fontSize: "1.5rem",
              padding: "1rem 0",
              opacity: parseInt(w) === weight ? 1 : 0.5,
              fontWeight: w,
              cursor: "pointer",
            }}
            onClick={() => setWeight(parseInt(w))}
          >
            {w}
          </div>
        ))}

        <div
          style={{
            textTransform: "uppercase",
            flex: 1,
            textAlign: "right",
            cursor: "pointer",
          }}
          onClick={() => setShowUnicode(!showUnicode)}
        >
          {showUnicode ? "Names" : "Unicode"}
        </div>
      </div>

      <div
        style={{
          marginTop: top,
          display: "flex",
          flexDirection: "column",
          gap: "6rem",
          padding: "3rem",
        }}
      >
        <div>
          <textarea
            autoFocus
            autoCorrect="false"
            style={{
              fontSize: "2rem",
              background: "#ffffff16",
              padding: "2rem",
              width: "100%",
              boxSizing: "border-box",
              fontWeight: weight,
            }}
            rows={5}
            placeholder={placeholder}
          />
        </div>

        {GlyphSection("Uppercase", charGroups.uppercase)}
        {GlyphSection("Lowercase", charGroups.lowercase)}
        {GlyphSection("Numbers", charGroups.digits)}
        {GlyphSection("Punctuation", charGroups.punctuationSymbols)}
        {GlyphSection("Math", charGroups.math)}
        {GlyphSection("Currencies", charGroups.currencies)}
        {GlyphSection("Arrows", charGroups.arrows)}
        {GlyphSection("Other symbols", [
          ...charGroups.custom,
          ...charGroups.others,
        ])}
      </div>
    </div>
  );
}
