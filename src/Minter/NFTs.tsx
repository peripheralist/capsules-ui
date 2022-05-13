import { spectrumAuctionColors } from "../constants/elements/spectrumAuctionColors";
import { spectrumMintColors } from "../constants/elements/spectrumMintColors";
import { isMobile } from "../constants/isMobile";

export default function NFTs() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: isMobile ? "3rem" : "4rem" }}>Capsule NFTs</h1>
      <b>7,957 non-fungible tokens on Ethereum</b>
      <br />
      <br />
      Each has:
      <br />
      <br />
      <b>128</b> text characters
      <br />
      <b>1 of 7</b> font weights
      <br />
      <b>1 of 7,957</b> colors
      <br />
      <br />
      A Capsule's text and font can be changed any time by the owner. Colors can
      be minted only once and can't be changed.
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: spectrumMintColors }}></div>
      <br />
      <br />
      <b>7 pure colors</b> are reserved, and can only be minted by{" "}
      <a href="/#/fonts" rel="noopener noreferrer">
        unlocking a font
      </a>
      .
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: spectrumAuctionColors }}></div>
      <br />
      <br />
      <a
        href="https://"
        target="_blank"
        rel="noopener noreferrer"
        className="light"
      >
        Capsules NFT contract
      </a>
    </div>
  );
}
