export default function Contracts() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 30 }}>
      <h1>Contracts</h1>
      <div>
        <a
          href="https://etherscan.io/asdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Capsules Typeface
        </a>
        : CapsulesTypeface contract
        <br />
        <br />
        To read on-chain fonts:
        <br />
        <div
          style={{
            display: "inline-block",
            fontSize: "0.9rem",
            fontWeight: "bold",
            whiteSpace: "pre",
            color: "#FFDC5A",
            padding: "1rem",
            textAlign: "left",
          }}
        >
          {`|  ITypeface typeface = ITypeface(address);
|
|  ITypeface.Font font = Font({
|    weight: 400, 
|    style: "normal"
|  });
|
|  bytes source = typeface.sourceOf(font);`}
        </div>
        <br />
        <br />
        <a
          href="https://github.com/peripheralist/typeface"
          target="_blank"
          rel="noopener noreferrer"
        >
          Typeface
        </a>
        : Abstract Typeface contract used by CapsulesTypeface.
        <br />
        <br />
        <a
          href="https://etherscan.io/asdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Capsule Token
        </a>
        : Capsule NFT contract.
        <br />
        <br />
        <a
          href="https://etherscan.io/asdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Capsule Metadata
        </a>
        : Generates metadata for Capsule NFTs. (Can be upgraded)
        <br />
        <br />
        <a
          href="https://etherscan.io/asdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Capsule Renderer
        </a>
        : Renders images for Capsule NFTs. (Can be upgraded)
      </div>
    </div>
  );
}
