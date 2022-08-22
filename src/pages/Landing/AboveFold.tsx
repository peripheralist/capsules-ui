import { CSSProperties, useState } from "react";
import GlyphPicker from "../../components/GlyphPicker";
import WeightSelector from "../../components/WeightSelector";
import { reservedColors } from "../../constants/colors";
import { isMobile } from "../../constants/isMobile";
import { Weight } from "../../models/weight";

export default function AboveFold({
  weight,
  setWeight,
}: {
  weight: number;
  setWeight: (w: Weight) => void;
}) {
  const [text, setText] = useState<string>();

  const textAreaStyle: CSSProperties = {
    padding: isMobile ? "1rem 1rem 2.5rem" : "2rem",
    fontSize: isMobile ? "1.25rem" : "2rem",
  };

  return (
    <div>
      <div
        style={{
          margin: "5vh auto 0",
          fontWeight: weight,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2rem" : "4rem",
          }}
        >
          Capsules
        </h1>
      </div>

      <div
        style={{
          margin: "0 auto",
          fontWeight: weight,
          textAlign: "center",
          position: "relative",
        }}
      >
        <textarea
          autoFocus={!isMobile}
          autoCorrect="false"
          style={{
            background: "#ffffff16",
            width: "100%",
            boxSizing: "border-box",
            fontWeight: weight,
            caretColor:
              reservedColors[Math.floor(Math.random() * reservedColors.length)],
            ...textAreaStyle,
          }}
          rows={8}
          // placeholder="Mono typeface&#13;&#10;·&#13;&#10;328 characters × 7 fonts&#13;&#10;·&#13;&#10;Stored on Ethereum&#13;&#10;·&#13;&#10;Available to any smart contract for free, forever"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {!text?.length && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              boxSizing: "border-box",
              textAlign: "left",
              lineHeight: "normal",
              userSelect: "none",
              pointerEvents: "none",
              ...textAreaStyle,
            }}
          >
            Mono typeface
            <br />
            <br />
            328 characters × 7 fonts
            <br />
            <br />
            Stored on Ethereum
            <br />
            <br />
            Available to any smart contract for free, forever
          </div>
        )}

        <div
          style={{
            position: "absolute",
            right: "1rem",
            bottom: "1rem",
            fontWeight: 600,
          }}
        >
          <GlyphPicker
            onClickGlyph={(glyph) => {
              setText((t) => (t ?? "") + glyph);
              return true;
            }}
          />
        </div>
      </div>

      <div style={{ margin: "0 auto" }}>
        <WeightSelector selectedWeight={weight} onSelectWeight={setWeight} />
      </div>
    </div>
  );
}
