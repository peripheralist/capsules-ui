import { useState } from "react";
import GlyphElem from "../../components/GlyphElem";

import WeightSelector from "../../components/WeightSelector";
import { reservedColors } from "../../constants/colors";
import { spectrumAuctionColors } from "../../constants/elements/spectrumAuctionColors";
import { spectrumMintColors } from "../../constants/elements/spectrumMintColors";
import { isMobile } from "../../constants/isMobile";
import { charGroups } from "../../constants/orderedUnicodes";
import { unicodes } from "../../fonts/unicode";
import { Weight } from "../../models/weight";
import Fonts from "./Fonts";
import NftDemo from "./NftDemo";

export default function Landing() {
  const [weight, setWeight] = useState<number>(400);

  const top = isMobile ? "3.5rem" : "4.5rem";

  const GlyphSection = (chars: number[]) => (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: isMobile ? "0.5rem" : "1rem",
      }}
    >
      {chars.map((x) => (
        <GlyphElem
          key={x}
          charCode={x}
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            width: isMobile ? "3rem" : "5rem",
            fontWeight: weight,
            marginBottom: 20,
          }}
          includeCode={!isMobile}
        />
      ))}
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
          placeholder={`Mono typeface\n\n${unicodes.length} characters × 7 fonts\n\nStored on Ethereum\n\nAvailable to any smart contract for free, forever`}
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
        Fonts need to be stored on-chain before they're available to other
        contracts.
        <br />
        <br />
        <b>
          A font can be stored by minting its NFT, which just costs the gas for
          storage.
        </b>
        <br />
        <br />
        Out of 7,957 total NFTs, only these 7 have pure colors.
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
          have super special sharp corners.
        </div>
        <NftDemo />
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", paddingTop: 100 }}>
        <h1 style={{ textAlign: "center" }}>7,957 colors</h1>
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
          zIndex: 20,
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

      <div style={{ textAlign: "center" }}>
        <a href="/CapsulesTypeface.zip" download="CapsulesTypeface">
           Download
        </a>
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
