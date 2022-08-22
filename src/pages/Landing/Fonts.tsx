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
        "setFontSrc",
        [{ weight, style: "normal" }, Buffer.from(FONTS[weight])],
        {
          onDone: (tx) => setLoadingTxForWeight(undefined),
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
          <div style={{ fontWeight: 600, color }}>{color}</div>
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
        <div style={{ fontWeight: 600, color }}>{color}</div>
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
          maxWidth: isMobile ? "90vw" : 400,
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
