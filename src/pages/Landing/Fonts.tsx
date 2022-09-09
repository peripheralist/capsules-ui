import { useCallback, useContext, useState } from "react";
import Button from "../../components/Button";
import FormattedAddress from "../../components/FormattedAddress";
import { isMobile } from "../../constants/isMobile";
import { WalletContext } from "../../contexts/walletContext";
import { FONTS } from "../../fonts/fonts";
import { useFonts } from "../../hooks/fonts";
import { Weight } from "../../models/weight";

export default function Fonts() {
  const { transactor, contracts } = useContext(WalletContext);

  const [loadingTxForWeight, setLoadingTxForWeight] = useState<Weight>();

  const _fonts = useFonts();

  const unlockFont = useCallback(
    (weight: Weight) => {
      if (!contracts || !transactor) return;

      setLoadingTxForWeight(weight);

      transactor(
        contracts.CapsulesTypeface,
        "setSource",
        [{ weight, style: "normal" }, Buffer.from(FONTS[weight])],
        {
          onDone: (tx) => setLoadingTxForWeight(undefined),
          txTitle: `Unlock font ${weight}`,
        }
      );
    },
    [contracts, transactor]
  );

  const FontElem = (weight: Weight, color: string, minter?: string | null) =>
    isMobile ? (
      <div
        key={weight}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <div>
          <h1 style={{ fontWeight: weight, margin: 0 }}>{weight}</h1>
          <div style={{ fontWeight: 500, color, lineHeight: 0.9 }}>
            CAPSULE
            <br />
            {color}
          </div>
        </div>

        <div>
          {minter ? (
            <div style={{ textAlign: "center", color, fontWeight: 700 }}>
              <div>♥ minted ♥</div>
              <FormattedAddress address={minter} />
            </div>
          ) : (
            <Button
              style={{ color: "#fff" }}
              text="Mint"
              onClick={() => unlockFont(weight)}
              loading={loadingTxForWeight === weight}
            />
          )}
        </div>
      </div>
    ) : (
      <div
        key={weight}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <h1 style={{ fontWeight: weight }}>{weight}</h1>
        <div
          style={{
            fontWeight: 500,
            color,
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          {/* ᴍɪɴᴛs
          <br /> */}
          CAPSULE
          <br />
          {color}
        </div>
        <br />
        {minter ? (
          <div style={{ textAlign: "center", color, fontWeight: 700 }}>
            <div>♥ minted ♥</div>
            <FormattedAddress address={minter} />
          </div>
        ) : (
          <Button
            style={{ color: "#fff" }}
            text="Mint"
            onClick={() => unlockFont(weight)}
            loading={loadingTxForWeight === weight}
          />
        )}
      </div>
    );

  return (
    <div>
      <div
        style={{
          maxWidth: isMobile ? "90vw" : 600,
          margin: "0 auto",
          paddingTop: 100,
          paddingBottom: 50,
          fontWeight: 500,
          fontSize: "1.4rem",
          textAlign: "center",
        }}
      >
        Fonts need to be stored on-chain before they're available to other
        contracts.
        <br />
        <br />
        <b>
          Anyone can store a font by minting its Capsule NFT, which only costs
          gas.
        </b>
        {/* <br />
        <br />
        These are the only 7 Capsules with pure colors. */}
      </div>

      <h1 style={{ textAlign: "center" }}>FONTS</h1>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-evenly",
          margin: "0 auto",
        }}
      >
        {_fonts?.map((f) => FontElem(f.weight, f.color, f.minter))}
      </div>
    </div>
  );
}
