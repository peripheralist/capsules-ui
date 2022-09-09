import { useCallback, useContext, useState } from "react";
import Button from "../../components/Button";
import Capsule from "../../components/Capsule";
import ColorHeader from "../../components/ColorHeader";
import TextEditor from "../../components/TextEditor";
import { ALL_COLORS } from "../../constants/colors";
import { isMobile } from "../../constants/isMobile";
import { EditingContext } from "../../contexts/editingContext";

export default function NftDemo() {
  const { color, setColor, text, setText, weight, setWeight } =
    useContext(EditingContext);
  const [locked, setLocked] = useState<boolean>(false);

  const setRandomColor = useCallback(
    () => setColor?.(ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)]),
    [setColor]
  );

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          paddingBottom: 50,
          maxWidth: isMobile ? "96vw" : 600,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? "3rem" : "6rem",
              lineHeight: 6 / 10,
              fontWeight: 500,
            }}
          >
            {/* <ColorHeader
              text="CAPSULES"
              style={{ margin: 0, fontSize: isMobile ? "3rem" : "6rem" }}
            /> */}
            CAPSULES
            <br />
            <span style={{ fontWeight: 200 }}>ɴꜰᴛs</span>
          </h1>
        </div>
        {/* <h1>7,957 Capsule NFTs</h1> */}
        <div style={{ fontSize: "1.4rem" }}>
          <b>7,957 total</b>
          <br />
          <br />
          Each Capsule has <b>1 unique color</b> and <b>128 text characters</b>,
          rendered as an on-chain SVG in the Capsules typeface.
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

              <div
                style={{ cursor: "pointer" }}
                onClick={() => setLocked((l) => !l)}
              >
                {locked ? " Locked" : " Unlocked"}
              </div>
            </div>

            <Capsule
              text={text}
              color={color}
              width={isMobile ? 320 : 400}
              weight={weight}
              square
              locked={locked}
            />
          </div>
        </div>
      </div>
      <Button href="/#/mint" text="Mint a Capsule" />
      <br />
      <br />
      Text and font can be changed whenever by the owner. Leave the text blank
      for a default image.
      <br />
      <br />
      Capsules can also be locked. Locked Capsules <b>can never be changed</b>
      ——even when transferred——and their images have super special sharp corners.
    </div>
  );
}
