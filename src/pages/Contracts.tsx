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
          CapsulesTypeface
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
          href="https://github.com/asdf"
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
          CapsuleToken
        </a>
        : Capsules NFT contract.
        <br />
        <br />
        <a
          href="https://etherscan.io/asdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          CapsulesMetadata
        </a>
        : Generates metadata for Capsule NFTs. (Can be upgraded)
        <br />
        <br />
        <a
          href="https://etherscan.io/asdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          DefaultCapsuleRenderer
        </a>
        : Renders images for Capsule NFTs. (Can be upgraded). Capsule owners may
        choose any renderer for a Capsule.
      </div>
    </div>
  );
}
