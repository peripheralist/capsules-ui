import { CSSProperties } from "react";

import { fonts } from "../fonts/fonts";
import { Weight } from "../models/weight";

export default function WeightSelector({
  selectedWeight,
  onSelectWeight,
  style,
  weightStyle,
}: {
  selectedWeight: Weight;
  onSelectWeight: (w: Weight) => void;
  style?: CSSProperties;
  weightStyle?: CSSProperties;
}) {
  return (
    <div
      style={{
        alignItems: "baseline",
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        ...style,
      }}
    >
      {Object.keys(fonts).map((w) => (
        <div
          style={{
            padding: "1rem 0",
            opacity: parseInt(w) === selectedWeight ? 1 : 0.5,
            fontWeight: w,
            cursor: "pointer",
            ...weightStyle,
          }}
          onClick={() => onSelectWeight(parseInt(w) as Weight)}
        >
          {w}
        </div>
      ))}
    </div>
  );
}
