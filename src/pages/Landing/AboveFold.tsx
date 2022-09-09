import { CSSProperties, useState } from "react";
import ColorHeader from "../../components/ColorHeader";
import GlyphPicker from "../../components/GlyphPicker";
import WeightSelector from "../../components/WeightSelector";
import { RESERVED_COLORS } from "../../constants/colors";
import { isMobile } from "../../constants/isMobile";
import { unicodes } from "../../fonts/unicode";
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
    fontSize: isMobile ? "1.1rem" : "2rem",
  };

  return (
    <div>
      <div
        style={{
          margin: isMobile ? "2rem auto" : "4.5rem auto",
          fontWeight: weight,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "3rem" : "6rem",
            lineHeight: 6 / 10,
            margin: 0,
            fontWeight: 500,
          }}
        >
          {/* <ColorHeader
            text="CAPSULES"
            style={{ margin: 0, fontSize: isMobile ? "3rem" : "6rem" }}
          /> */}
          CAPSULES
          {/* COMPOSIT */}
          {/* Primitiv */}
          {/* Strata */}
          {/* Silica */}
          {/* Precursa */}
          {/* Habita mono */}
          {/* Boule mono */}
          {/* Achira */}
          {/* ISOMER */}
          {/* Thesis */}
          {/* Minori */}
          {/* Particle */}
          {/* Isomene */}
          <br />
          <span style={{ fontWeight: 200 }}>ᴛʏᴘᴇꜰᴀcᴇ</span>
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
            // caretColor:
            //   RESERVED_COLORS[
            //     Math.floor(Math.random() * RESERVED_COLORS.length)
            //   ],
            ...textAreaStyle,
          }}
          rows={6}
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
            {unicodes.length} characters × 7 fonts
            <br />
            <br />
            Stored on Ethereum
            <br />
            <br />
            Free to use by any smart contract, forever
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
