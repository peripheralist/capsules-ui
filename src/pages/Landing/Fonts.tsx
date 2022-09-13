import { useCallback, useContext, useState } from "react";
import Button from "../../components/Button";
import FormattedAddress from "../../components/FormattedAddress";
import { isMobile } from "../../constants/isMobile";
import { CapsulesContext } from "../../contexts/capsulesContext";
import { WalletContext } from "../../contexts/walletContext";
import { FONTS } from "../../fonts/fonts";
import { useFonts } from "../../hooks/fonts";
import { Weight } from "../../models/weight";
import { toSmallCaps } from "../../utils/text";

export default function Fonts() {
  const { transactor, contracts } = useContext(WalletContext);
  const { paused } = useContext(CapsulesContext);

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
          txTitle: `Store font ${weight}`,
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
          alignItems: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          gap: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontWeight: weight, margin: 0 }}>{weight}</h1>
        </div>

        <div
          style={{
            fontWeight: 500,
            color,
            lineHeight: 0.9,
            flex: 1,
          }}
        >
          CAPSULE
          <br />
          {color}
        </div>

        <div style={{ textAlign: "center", flex: 1 }}>
          {minter ? (
            <div style={{ color, fontWeight: 700 }}>
              <div>♥ stored ♥</div>
              <FormattedAddress address={minter} />
            </div>
          ) : (
            <Button
              text="Store"
              isDisabled={paused}
              onClick={minter ? undefined : () => unlockFont(weight)}
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
          cursor: minter ? "default" : "pointer",
        }}
        onClick={minter || paused ? undefined : () => unlockFont(weight)}
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
          ᴍɪɴᴛs
          <br />
          CAPSULE
          <br />
          {color}
        </div>
        <br />
        {minter ? (
          <div style={{ textAlign: "center", color, fontWeight: 700 }}>
            <div>♥ stored ♥</div>
            <FormattedAddress address={minter} />
          </div>
        ) : (
          <Button
            text="STORE"
            isDisabled={paused}
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
          paddingTop: isMobile ? 50 : 100,
          paddingBottom: 50,
          fontWeight: 500,
          fontSize: isMobile ? "1rem" : "1.4rem",
          textAlign: "center",
        }}
      >
        Fonts need to be stored on-chain before they're available to other
        contracts.
        <br />
        <br />
        <b>
          Storing a font just costs gas, and will mint 1 of 7 pure-color Capsule
          NFTs for free.
          {/* Anyone can store a font by minting its Capsule NFT, which only costs
          gas. */}
        </b>
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
      {paused && (
        <div
          style={{
            marginTop: "2rem",
            fontSize: "1.5rem",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {toSmallCaps("⌛ Opening soon ⌛")}
        </div>
      )}
    </div>
  );
}
