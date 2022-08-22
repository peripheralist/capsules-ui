import { useState } from "react";

import { isMobile } from "../../constants/isMobile";
import AboveFold from "./AboveFold";
import Colors from "./Colors";
import Fonts from "./Fonts";
import NftDemo from "./NftDemo";
import Typeface from "./Typeface";

export default function Landing() {
  const [weight, setWeight] = useState<number>(400);

  return (
    <div
      style={{
        padding: isMobile ? 20 : 0,
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? 360 : 600,
          margin: "0 auto",
          paddingTop: isMobile ? 50 : 0,
        }}
      >
        <AboveFold weight={weight} setWeight={setWeight} />
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Fonts />
      </div>

      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          paddingTop: 100,
        }}
      >
        <NftDemo />
      </div>

      <Colors />

      <div style={{ margin: "0 auto", paddingTop: 100 }}>
        <Typeface weight={weight} setWeight={setWeight} />
      </div>
    </div>
  );
}
