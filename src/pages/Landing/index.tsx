import { useState } from "react";

import { isMobile } from "../../constants/isMobile";
import AboveFold from "./AboveFold";
import Colors from "./Colors";
import Fonts from "./Fonts";
import NftDemo from "./NftDemo";
import TypefaceGlyphs from "../../components/TypefaceGlyphs";

export default function Landing() {
  const [weight, setWeight] = useState<number>(400);

  const padding = isMobile ? "1rem" : undefined;

  return (
    <div>
      <div
        style={{
          maxWidth: isMobile ? 360 : 600,
          margin: "0 auto",
          padding,
          paddingTop: isMobile ? 50 : 0,
        }}
      >
        <AboveFold weight={weight} setWeight={setWeight} />
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding }}>
        <Fonts />
      </div>

      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding,
          paddingTop: 100,
        }}
      >
        <NftDemo />
      </div>

      <div style={{ padding }}>
        <Colors />
      </div>

      <div
        style={{
          margin: "0 auto",
          padding,
          paddingTop: 100,
        }}
      >
        <TypefaceGlyphs weight={weight} setWeight={setWeight} />
      </div>
    </div>
  );
}
