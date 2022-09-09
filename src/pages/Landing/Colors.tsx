import ColorHeader from "../../components/ColorHeader";
import { spectrumAuctionColors } from "../../constants/elements/spectrumAuctionColors";
import { spectrumMintColors } from "../../constants/elements/spectrumMintColors";
import { isMobile } from "../../constants/isMobile";

export default function Colors() {
  return (
    <div
      style={{
        maxWidth: isMobile ? "96vw" : 960,
        margin: "0 auto",
        paddingTop: 100,
      }}
    >
      <h1
        style={{
          lineHeight: 6 / 10,
          fontWeight: 500,
          textAlign: "center",
          fontSize: isMobile ? "3rem" : "6rem",
        }}
      >
        <ColorHeader text="7957 Colors" style={{ margin: 0 }} />
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "end",
          gap: 100,
        }}
      >
        <div style={{ minWidth: 320, flex: 1 }}>
          <b>7 pure colors</b> can only be minted by storing a Capsules font,
          which just costs gas
          <br />
          <br />
          <br />
          <div
            dangerouslySetInnerHTML={{ __html: spectrumAuctionColors }}
          ></div>
        </div>

        <div style={{ minWidth: 320, flex: 1 }}>
          <b>7,950 colors</b> can be minted for Ξ0.01
          <br />
          <br />
          <br />
          <div dangerouslySetInnerHTML={{ __html: spectrumMintColors }}></div>
        </div>
      </div>
    </div>
  );
}
