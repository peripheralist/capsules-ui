import { spectrumMintColors } from "./constants/elements/spectrumMintColors";
import { isMobile } from "./constants/isMobile";
import { useFonts } from "./hooks/fonts";

export default function Info() {
  const fonts = useFonts();

  return (
    <div>
      <h1 style={{ fontSize: isMobile ? "3rem" : "4rem" }}>Capsules</h1>
      <div style={{ textAlign: "center" }}>
        A mono typeface in 7 font weights, supporting all basic Latin letters,
        numbers, and punctuation.
        <br />
        <br />
        Stored on Ethereum and free to use by any contract on the blockchain.
        <br />
        <br />
        <a href="/#/typeface" rel="noopener noreferrer">
          Unlock a font weight
        </a>{" "}
        to make it available to everyone, and mint 1 of 7 NFTs
        <br />
        <br />
        <div style={{ width: 200, display: "inline-block" }}>
          {fonts.map((f) => (
            <>
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "3rem",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: f.weight,
                  }}
                >
                  {f.weight}
                </span>
                <span style={{ fontWeight: f.unlocked ? 600 : 200 }}>
                  {f.unlocked ? "unlocked" : "locked"}
                </span>
              </div>
            </>
          ))}
        </div>
      </div>
      <br />
      <br />
      <h2>Capsule NFTs</h2>
      <div style={{ textAlign: "center" }}>
        7,965 non-fungible tokens showcasing the Capsules typeface. Each one
        has:
      </div>
      <br />
      <ul className="dashed">
        <li>
          <b>128 text characters</b> rendered as an on-chain SVG in the Capsules
          typeface. The owner can change the text any time.
        </li>
        <li>
          <b>One of 7 font weights</b>
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
      Pure white <b>(#ffffff)</b> can be minted up to 9 times to anyone who{" "}
      <a href="/#/typeface" rel="noopener noreferrer">
        unlocks a font
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
