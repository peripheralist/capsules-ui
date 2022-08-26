import { useState } from "react";
import TypefaceGlyphs from "../components/TypefaceGlyphs";

export default function Typeface() {
  const [weight, setWeight] = useState<number>(400);

  return (
    <div style={{ paddingTop: "10vh", paddingBottom: 100 }}>
      <TypefaceGlyphs weight={weight} setWeight={setWeight} />
    </div>
  );
}
