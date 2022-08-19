import { useCallback, useContext, useState } from "react";

import Button from "./components/Button";
import FormattedAddress from "./components/FormattedAddress";
import { spectrumAuctionColors } from "./constants/elements/spectrumAuctionColors";
import { isMobile } from "./constants/isMobile";
import { WalletContext } from "./contexts/walletContext";
import { FONTS } from "./fonts/fonts";
import { useFonts } from "./hooks/fonts";
import { Weight } from "./models/weight";

export default function Typeface() {
  const { transactor, contracts } = useContext(WalletContext);
  const [loadingTxForWeight, setLoadingTxForWeight] = useState<Weight>();

  const _fonts = useFonts();

  const Elem = (weight: Weight, color: string, minter?: string | null) => (
    <div
      key={weight}
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
      {minter ? (
        <div style={{ textAlign: "center" }}>
          <div>Minted by</div>
          <FormattedAddress address={minter} />
        </div>
      ) : (
        <Button
          text="Mint"
          onClick={() => unlockFont(weight)}
          loading={loadingTxForWeight === weight}
        />
      )}
    </div>
  );

  const unlockFont = useCallback(
    (weight: Weight) => {
      if (!contracts || !transactor) return;

      setLoadingTxForWeight(weight);

      transactor(
        contracts.CapsulesTypeface,
        "setFontSrc",
        [{ weight, style: "normal" }, Buffer.from(FONTS[weight])],
        {
          onDone: (tx) => setLoadingTxForWeight(undefined),
        }
      );
    },
    [contracts, transactor]
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
          The 7 Capsules fonts must be stored on-chain before they can be used.
          <br />
          <br />
          <b>
            Anyone who pays gas to store a font will receive one of 7 pure-color
            Capsule NFTs. Pure colors can only be minted by unlocking a font.
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
          {_fonts?.map((f) => Elem(f.weight, f.color, f.minter))}
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
          CapsulesTypeface contract
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
        {/* You can also{" "}
        <a href="https://" target="_blank" rel="noopener noreferrer">
          download the typeface
        </a>{" "}
        for free. */}
        <br />
        <br />
      </div>
    </div>
  );
}
