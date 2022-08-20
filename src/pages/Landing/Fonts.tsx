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

  const FontElem = (weight: Weight, color: string, minter?: string | null) => (
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
          maxWidth: 960,
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
