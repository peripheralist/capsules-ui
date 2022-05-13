import { constants } from "ethers";

import Button from "./components/Button";
import { spectrumAuctionColors } from "./constants/elements/spectrumAuctionColors";
import { isMobile } from "./constants/isMobile";
import { useFonts } from "./hooks/fonts";

export default function Typeface() {
  const fonts = useFonts();

  const Elem = (weight: number, color: string, minted?: boolean) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: isMobile ? "50vh" : "100%",
      }}
    >
      <h1 style={{ fontWeight: weight, color }}>{weight}</h1>
      <div style={{ color }}>{color}</div>
      <br />
      {minted ? <Button text="Minted" isDisabled /> : <Button text="Mint" />}
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          maxWidth: 1000,
          margin: "0 auto",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <h1>Fonts</h1>
          The 7 Capsules fonts must be stored in the contract before they can be
          used.
          <br />
          <br />
          <b>
            Anyone who pays gas to store a font will receive a Capsule NFT with
            one of the 7 pure Capsule colors.
          </b>
        </div>
        <div
          style={{ flex: 1 }}
          dangerouslySetInnerHTML={{ __html: spectrumAuctionColors }}
        ></div>
      </div>
      <div style={{ paddingTop: 50, paddingBottom: 50 }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-evenly",
          }}
        >
          {fonts.map((f) =>
            Elem(f.weight, f.color, f.unlocked !== constants.AddressZero)
          )}
        </div>
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <br />
        <br />
        Once a font has been stored, it's available to any smart contract for
        free via the <b>ITypeface solidity interface:</b>
        <br />
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: "0.9rem",
              fontWeight: "bold",
              whiteSpace: "pre",
              color: "#888",
              padding: "1rem",
              textAlign: "left",
            }}
          >
            {`
  |  ITypeface capsules;
  |
  |  Font memory font = Font({
  |    weight: 400, 
  |    style: "normal"
  |  });
  |
  |  bytes memory src =
  |    capsules.fontSrc(font);`}
          </div>
        </div>
        <br />
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="light"
        >
          CapsulesTypeface mainnet
        </a>
        <br />
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="light"
        >
          CapsulesTypeface rinkeby
        </a>
        <br />
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="light"
        >
          ITypeface solidity interface
        </a>
        <br />
        <br />
        You can also{" "}
        <a href="https://" target="_blank" rel="noopener noreferrer">
          download the typeface
        </a>{" "}
        for free.
        <br />
        <br />
      </div>
    </div>
  );
}
