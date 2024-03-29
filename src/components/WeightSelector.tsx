import { CSSProperties, useEffect, useState } from "react";
import { isMobile } from "../constants/isMobile";

import { FONTS } from "../fonts/fonts";
import { Weight } from "../models/weight";

export default function WeightSelector({
  selectedWeight,
  onSelectWeight,
  style,
}: {
  selectedWeight: number;
  onSelectWeight: (w: Weight) => void;
  style?: CSSProperties;
}) {
  const [useVariableWeight, setUseVariableWeight] = useState<boolean>();

  useEffect(() => {
    if (selectedWeight % 100 !== 0) {
      setUseVariableWeight(true);
    }
  }, [selectedWeight]);

  return (
    <div
      style={{
        position: "relative",
        lineHeight: 1,
        color: "#fff",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "0.9rem",
          textTransform: "uppercase",
          fontWeight: 300,
          gap: "0.9rem",
          paddingTop: "1rem",
        }}
      >
        <span
          style={{
            fontWeight: useVariableWeight ? "inherit" : 600,
            cursor: "pointer",
          }}
          onClick={() => {
            setUseVariableWeight(false);
            if (selectedWeight % 100 !== 0) {
              onSelectWeight(
                (Math.round(selectedWeight / 100) * 100) as Weight
              );
            }
          }}
        >
          On-chain fonts
        </span>{" "}
        <span
          style={{
            fontWeight: useVariableWeight ? 600 : "inherit",
            cursor: "pointer",
          }}
          onClick={() => setUseVariableWeight(true)}
        >
          Variable font
        </span>
      </div>

      {useVariableWeight ? (
        <div
          style={{
            paddingTop: 10,
            maxWidth: 600,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: ((selectedWeight - 90) / 655) * 100 - 0.7 + "%", // hack for aligning slider handle
              fontWeight: selectedWeight,
              fontSize: isMobile ? "0.8rem" : "1.4rem",
            }}
          >
            {selectedWeight}
          </div>
          <input
            type="range"
            min={100}
            max={700}
            step={1}
            value={selectedWeight}
            onChange={(e) => onSelectWeight(parseInt(e.target.value) as Weight)}
            style={{
              display: "block",
              margin: "0 auto",
              width: "95%",
              height: 25,
              paddingTop: 22,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            alignItems: "baseline",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "1rem" : "1.6rem",
            fontSize: isMobile ? "1rem" : "1.6rem",
          }}
        >
          {Object.keys(FONTS).map((w) => (
            <div
              key={w}
              style={{
                position: "relative",
                padding: "1rem 0",
                opacity: parseInt(w) === selectedWeight ? 1 : 0.5,
                fontWeight: w,
                cursor: "pointer",
              }}
              onClick={() => onSelectWeight(parseInt(w) as Weight)}
            >
              {parseInt(w) === selectedWeight && (
                <div
                  style={{
                    position: "absolute",
                    bottom: isMobile ? 0 : "-5%",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  ▲
                </div>
              )}
              {w}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
