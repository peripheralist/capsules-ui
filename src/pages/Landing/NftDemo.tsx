import { useEffect, useMemo, useState } from "react";
import Capsule from "../../components/Capsule";
import TextEditor from "../../components/TextEditor";
import { ALL_COLORS } from "../../constants/colors";
import { isMobile } from "../../constants/isMobile";
import { Text } from "../../models/text";
import { Weight } from "../../models/weight";

export default function NftDemo() {
  const [weight, setWeight] = useState<Weight>(400);
  const [text, setText] = useState<Text>([]);
  const [color, setColor] = useState<string>();
  const [locked, setLocked] = useState<boolean>(false);

  useEffect(() => {
    setRandomColor();
  }, []);

  const setRandomColor = () =>
    setColor(ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)]);

  return (
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
          // alignItems: "center",
          flexWrap: "wrap-reverse",
          gap: isMobile ? 30 : 50,
          minHeight: isMobile ? 750 : 0,
          textAlign: "left",
        }}
      >
        <div>
          <TextEditor
            text={text}
            setText={setText}
            color={color}
            weight={weight}
            setWeight={setWeight}
            // locked={locked}
            // setLocked={setLocked}
          />
        </div>

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
              <span style={{ color }}>{color}</span> New color ⏩
            </span>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => setLocked((l) => !l)}
            >
              {locked ? " Locked" : " Unlocked"}
            </div>
          </div>
          <Capsule
            text={text}
            color={color}
            width={400}
            weight={weight}
            square
            locked={locked}
          />
        </div>
      </div>
    </div>
  );
}
