import { useState } from "react";

import Button from "./components/Button";
import WeightSelector from "./components/WeightSelector";
import { isMobile } from "./constants/isMobile";
import { charGroups } from "./constants/orderedUnicodes";
import { fonts } from "./fonts/fonts";
import { unicodeNames } from "./fonts/unicode";
import { Weight } from "./models/weight";

export default function Landing() {
  const [weight, setWeight] = useState<number>(400);
  const top = isMobile ? "3.5rem" : "4.5rem";

  const GlyphElem = (x: number) => (
    <div
      style={{ textAlign: "center", width: isMobile ? "3rem" : 100 }}
      key={x}
    >
      <div
        style={{
          padding: "1rem",
          fontSize: isMobile ? "2rem" : "3rem",
          whiteSpace: "pre",
          background: "#ffffff16",
          fontWeight: weight,
          userSelect: "all",
          cursor: "default",
        }}
        dangerouslySetInnerHTML={{ __html: "&#" + x + ";" }}
      ></div>
      {!isMobile && (
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            opacity: 0.5,
          }}
        >
          <div>{unicodeNames[x.toString(16).padStart(4, "0")]}</div>
        </div>
      )}
    </div>
  );

  const GlyphSection = (title: string, chars: number[]) => (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: isMobile ? "0.5rem" : "1rem",
      }}
    >
      {chars.map(GlyphElem)}
    </div>
  );

  return (
    <div
      style={{
        padding: isMobile ? 20 : 30,
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 600,
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
          maxWidth: 600,
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
          }}
          rows={7}
          placeholder={`Mono typeface\n\nSeven font weights stored on Ethereum\n\nAvailable to all smart contracts for free, forever`}
        />
      </div>

      <div
        style={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          margin: "0 auto",
          background: "#000",
          paddingBottom: 20,
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <WeightSelector
            selectedWeight={weight as Weight}
            onSelectWeight={setWeight}
            style={{ height: top }}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        Fonts are locked until they've been stored on-chain. Anyone who pays gas
        to store a font will also earn one of the 7 pure-color{" "}
        <a href="/#/mint" rel="noopener noreferrer">
          Capsule NFTs
        </a>
        .
        <br />
        <br />
        <Button text="Unlock a font" href="/#/fonts" />
        <br />
        <Button text="Mint a Capsule NFT" href="/#/mint" />
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          ▶ CapsulesTypeface contract
        </a>
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "3rem" : "6rem",
          margin: "0 auto",
        }}
      >
        {GlyphSection("Uppercase", charGroups.uppercase)}
        {GlyphSection("Lowercase", charGroups.lowercase)}
        {GlyphSection("Numbers", charGroups.digits)}
        {GlyphSection("Punctuation", charGroups.punctuationSymbols)}
        {GlyphSection("Math", charGroups.math)}
        {GlyphSection("Currencies", charGroups.currencies)}
        {GlyphSection("Arrows", charGroups.arrows)}
        {GlyphSection("Other symbols", [
          ...charGroups.custom,
          ...charGroups.others,
        ])}
      </div>
      <br />
      <br />
    </div>
  );
}
