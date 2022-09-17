import { CSSProperties, useCallback, useContext, useState } from "react";
import Button from "../../components/Button";
import Capsule from "../../components/Capsule";
import TextEditor from "../../components/TextEditor";
import { ALL_COLORS } from "../../constants/colors";
import { isMobile } from "../../constants/isMobile";
import { EditingContext } from "../../contexts/editingContext";

export default function NftDemo() {
  const { color, setColor, text, setText, weight, setWeight } =
    useContext(EditingContext);

  const setRandomColor = useCallback(
    () => setColor?.(ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)]),
    [setColor]
  );

  const maxWidth: CSSProperties["maxWidth"] = isMobile ? "96vw" : 600;

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          paddingBottom: 50,
          maxWidth,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? "3rem" : "6rem",
              lineHeight: 0.6,
              fontWeight: 500,
              marginBottom: "3rem",
            }}
          >
            CAPSULES
            <br />
            <span style={{ fontWeight: 200 }}>ɴꜰᴛs</span>
          </h1>
        </div>
        <div style={{ fontSize: isMobile ? "1rem" : "1.4rem" }}>
          <b>7,957 total</b>
          <br />
          <br />
          Each Capsule has <b>1 unique color</b> + <b>128 text characters</b>{" "}
          rendered as an on-chain SVG in a Capsules font.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: isMobile ? 30 : 50,
            minHeight: isMobile ? 750 : 0,
            textAlign: "left",
          }}
        >
          {setText && setWeight && (
            <TextEditor
              text={text}
              setText={setText}
              color={color}
              weight={weight}
              setWeight={setWeight}
            />
          )}

          <div style={{ padding: isMobile ? 10 : 0, flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={setRandomColor}
              >
                <span style={{ color }}>{color}</span> ↻
              </span>
            </div>

            <Capsule
              text={text}
              color={color}
              width={isMobile ? 320 : 400}
              weight={weight}
              square
            />
          </div>
        </div>
      </div>
      <Button href="/#/mint" text="Minter" size="large" />
      <br />
      <br />
      <div style={{ margin: "0 auto", maxWidth, textAlign: "center" }}>
        Text and font can be changed anytime by the owner. Leave the text blank
        for a default image.
      </div>
    </div>
  );
}
