import { useState } from "react";

import WeightSelector from "../../components/WeightSelector";
import { reservedColors } from "../../constants/colors";
import { spectrumAuctionColors } from "../../constants/elements/spectrumAuctionColors";
import { spectrumMintColors } from "../../constants/elements/spectrumMintColors";
import { isMobile } from "../../constants/isMobile";
import { charGroups } from "../../constants/orderedUnicodes";
import { unicodeNames, unicodes } from "../../fonts/unicode";
import { Weight } from "../../models/weight";
import Fonts from "./Fonts";
import NftDemo from "./NftDemo";

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
            fontSize: "0.7rem",
            fontWeight: 600,
            opacity: 0.5,
          }}
        >
          <div>{unicodeNames[x.toString(16).padStart(4, "0")]}</div>
          <div>{x.toString(16).padStart(4, "0")}</div>
        </div>
      )}
    </div>
  );

  const GlyphSection = (chars: number[]) => (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: isMobile ? "0.5rem" : "1rem",
      }}
    >
      {chars.map(GlyphElem)}
    </div>
  );

  return (
    <div
      style={{
        padding: isMobile ? 20 : 0,
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
            caretColor:
              reservedColors[Math.floor(Math.random() * reservedColors.length)],
          }}
          rows={8}
          placeholder={`Mono typeface\n\n${unicodes.length} characters + 7 fonts\n\nStored on Ethereum\n\nAvailable to any smart contract for free, forever`}
        />
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <WeightSelector
          selectedWeight={weight as Weight}
          onSelectWeight={setWeight}
          style={{ height: top }}
        />
      </div>

      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          paddingTop: 100,
          paddingBottom: 50,
          fontWeight: 500,
        }}
      >
        Capsules fonts need to be stored on-chain before they're available to
        other smart contracts. Anyone can store a font just by paying gas.
        <br />
        <br />
        Storing a font also mints a Capsule NFT with{" "}
        <b>one of 7 pure colors, out of 7,957.</b>
      </div>

      <Fonts />

      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          paddingTop: 100,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 50 }}>
          <h1>7,957 Capsule NFTs</h1>
          Each Capsule has <b>1 unique color</b> and <b>128 text characters</b>,
          rendered as an on-chain SVG in the Capsules typeface.
          <br />
          <br />
          Text and font can be changed whenever by the owner. Leave the text
          blank for a default image.
          <br />
          <br />
          Capsules can also be locked. Locked Capsules{" "}
          <b>can never be changed</b>, even when transferred, and their images
          have sharp corners.
          {/* <span style={{ fontSize: "2rem" }}>↓</span> */}
        </div>
        <NftDemo />
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", paddingTop: 100 }}>
        <h1 style={{ textAlign: "center" }}>7,957 unique colors</h1>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: 100,
          }}
        >
          <div style={{ flex: 1 }}>
            <b>7 pure colors</b> can only be minted by storing a Capsule font,
            which just costs gas
            <br />
            <br />
            <br />
            <div
              style={{ flex: 1 }}
              dangerouslySetInnerHTML={{ __html: spectrumAuctionColors }}
            ></div>
          </div>

          <div style={{ flex: 1 }}>
            <b>7,950 colors</b> can be minted for Ξ0.01
            <br />
            <br />
            <br />
            <div
              style={{ flex: 1 }}
              dangerouslySetInnerHTML={{ __html: spectrumMintColors }}
            ></div>
          </div>
        </div>
      </div>

      <div
        style={{
          margin: "0 auto",
          paddingTop: 100,
          textAlign: "center",
        }}
      >
        <h1>Capsules Typeface</h1>
      </div>

      <div
        style={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "3rem" : "6rem",
          margin: "0 auto",
          paddingTop: 50,
          paddingBottom: 50,
        }}
      >
        {GlyphSection(charGroups.uppercase)}
        {GlyphSection(charGroups.lowercase)}
        {GlyphSection(charGroups.digits)}
        {GlyphSection(charGroups.punctuationSymbols)}
        {GlyphSection(charGroups.math)}
        {GlyphSection(charGroups.currencies)}
        {GlyphSection(charGroups.arrows)}
        {GlyphSection([...charGroups.custom, ...charGroups.others])}
      </div>
    </div>
  );
}
