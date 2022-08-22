import WeightSelector from "../../components/WeightSelector";
import { reservedColors } from "../../constants/colors";
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
        }}
      >
        <textarea
          autoFocus
          autoCorrect="false"
          style={{
            fontSize: isMobile ? "1rem" : "2rem",
            background: "#ffffff16",
            padding: "2rem",
            width: "100%",
            boxSizing: "border-box",
            fontWeight: weight,
            caretColor:
              reservedColors[Math.floor(Math.random() * reservedColors.length)],
          }}
          rows={8}
          placeholder={`Mono typeface\n\n${unicodes.length} characters × 7 fonts\n\nStored on Ethereum\n\nAvailable to any smart contract for free, forever`}
        />
      </div>

      <div style={{ margin: "0 auto" }}>
        <WeightSelector selectedWeight={weight} onSelectWeight={setWeight} />
      </div>
    </div>
  );
}
