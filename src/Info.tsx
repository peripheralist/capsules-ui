import { spectrumMintColors } from "./constants/elements/spectrumMintColors";
import { isMobile } from "./constants/isMobile";

export default function Info() {
  return (
    <div>
      <h1 style={{ fontSize: isMobile ? "3rem" : "4rem" }}>Capsules</h1>
      <div style={{ textAlign: "center" }}>
        A mono typeface supporting all 95 basic Latin letters, numbers, and
        punctuation.
        <br />
        <br />
        <b>Stored on-chain in 9 weights.</b>
      </div>
      <br />
      <br />
      <h2>Capsule NFTs</h2>
      <div style={{ textAlign: "center" }}>7,965 tokens. Each one has:</div>
      <br />
      <ul className="dashed">
        <li>
          <b>128 text characters</b> rendered on-chain in the Capsules typeface.
          Text can be changed by the owner at any time.
        </li>
        <li>
          <b>One of 9 font weights</b>
        </li>
        <li>
          <b>One of 7,957 colors</b>
        </li>
      </ul>
      <br />
      <div dangerouslySetInnerHTML={{ __html: spectrumMintColors }}></div>
      <br />
      <br />
      <b>7,956 colors</b> can be minted only once.
      <br />
      <br />
      The color <b>#ffffff</b> (white), can be minted up to 9 times, once to
      each wallet that{" "}
      <a href="/#/typeface" rel="noopener noreferrer">
        unlocks a Capsules font weight
      </a>
      .
      <br />
      <br />
      <a href="https://" target="_blank" rel="noopener noreferrer">
        Capsules Typeface contract
      </a>
      <br />
      <br />
      <a href="https://" target="_blank" rel="noopener noreferrer">
        Capsules NFT contract
      </a>
    </div>
  );
}
