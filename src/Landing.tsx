import { constants } from "ethers";

import Button from "./components/Button";
import { isMobile } from "./constants/isMobile";
import { useFonts } from "./hooks/fonts";
import { fonts } from "./fonts/fonts";

export default function Landing() {
  const fonts = useFonts();

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 900, marginTop: "30vh" }}>
        <h1 style={{ fontSize: isMobile ? "3rem" : "8rem" }}>Capsules</h1>
        <div
          style={{
            fontSize: "5rem",
            lineHeight: 5 * 1.1825 + "rem",
            fontWeight: 500,
          }}
        >
          A mono typeface in seven font weights
          <br />
          <br />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {fonts.map((f) => (
              <span
                style={{
                  fontWeight: f.weight,
                  fontSize: "7rem",
                  whiteSpace: "pre",
                  width: 200,
                }}
              >
                {f.weight}
              </span>
            ))}
          </div>
          <br />
          <br />
          Available to all Ethereum smart contracts for free
          <br />
          <br />
          <a
            href="https://"
            target="_blank"
            rel="noopener noreferrer"
            className="light"
            style={{ fontSize: "3rem" }}
          >
            CapsulesTypeface contract
          </a>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        Fonts are locked until they've been stored on-chain. Anyone who pays gas
        to store a font will also earn one of the 7{" "}
        <a href="/#/mint" rel="noopener noreferrer">
          pure-color Capsule NFTs
        </a>
        .
        <br />
        <br />
        <div style={{ display: "inline-block" }}>
          <div style={{ fontWeight: 200 }}>------------------------------</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "uppercase",
              fontWeight: 200,
            }}
          >
            <span>Font</span>
            <span>Unlocked</span>
          </div>
          <div style={{ fontWeight: 200 }}>------------------------------</div>
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
                    fontSize: "1.5rem",
                    fontWeight: f.weight,
                    color: f.color,
                  }}
                >
                  {f.weight}
                </span>
                <span
                  style={{
                    fontWeight:
                      f.unlocked === constants.AddressZero ? 200 : 500,
                  }}
                >
                  {f.unlocked === constants.AddressZero ? "--" : f.unlocked}
                </span>
              </div>
            </>
          ))}
          <div style={{ fontWeight: 200 }}>------------------------------</div>
        </div>
        <Button text="Unlock a font" href="/#/fonts" />
        <Button text="Mint a Capsule NFT" href="/#/mint" />
        <Button text="Typeface" href="/#/glyphs" />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
