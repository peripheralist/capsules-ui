import { useState } from "react";

import Button from "./components/Button";
import WeightSelector from "./components/WeightSelector";
import { isMobile } from "./constants/isMobile";
import { unicodeNames } from "./fonts/unicode";
import { charGroups } from "./Glyphs/orderedUnicodes";
import { Weight } from "./models/weight";
import { isAllowedChar, isAllowedCode } from "./utils/index";

export default function Landing() {
  const [weight, setWeight] = useState<Weight>(400);
  const top = 100;

  const GlyphElem = (x: number) => (
    <div style={{ textAlign: "center", width: isMobile ? "3rem" : 100 }}>
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
        padding: isMobile ? 20 : 40,
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "10vh auto 0",
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
      <WeightSelector
        selectedWeight={weight}
        onSelectWeight={setWeight}
        style={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          fontSize: isMobile ? "1rem" : "2rem",
          background: "#000",
          height: top,
          justifyContent: "center",
          gap: isMobile ? "1rem" : "2rem",
        }}
      />
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
          defaultValue={`A mono typeface in seven font weights\n\nStored on Ethereum\n\nAvailable to all smart contracts for free, forever`}
        />
        <br />
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          ⮕ CapsulesTypeface contract
        </a>
      </div>
      <br />
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
        {/* <div style={{ display: "inline-block" }}>
          <div style={{ fontWeight: 300 }}>------------------------------</div>
          {fonts.map((f) => (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "2.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? "1rem" : "2rem",
                    fontWeight: f.weight,
                    color: f.color,
                  }}
                >
                  {f.weight}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {f.unlocked === constants.AddressZero ? "" : f.unlocked}
                </span>
              </div>
            </>
          ))}
          <div style={{ fontWeight: 300 }}>------------------------------</div>
        </div> */}
        <Button text="Unlock a font" href="/#/fonts" />
        <Button text="Mint a Capsule NFT" href="/#/mint" />
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
