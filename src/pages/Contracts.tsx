export default function Contracts() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 30 }}>
      <h1>Contracts</h1>
      <div>
        <a
          href="https://etherscan.io/address/0xA77b7D93E79f1E6B4f77FaB29d9ef85733A3D44A"
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
          href="https://etherscan.io/address/0xABF3e9F15a4529bf1769EAB968250c9243A8E7C1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Capsule Token
        </a>
        : Capsule NFT contract.
        <br />
        <br />
        <a
          href="https://etherscan.io/address/0x172685fe3bE6432d025b07403646c48210f03451"
          target="_blank"
          rel="noopener noreferrer"
        >
          Capsule Metadata
        </a>
        : Generates metadata for Capsule NFTs. (Can be upgraded)
        <br />
        <br />
        <a
          href="https://etherscan.io/address/0x74A12DFDA6DF193AEdbb7cd609E6343ED0C2cE12"
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
