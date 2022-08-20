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
        To read Capsules Typeface fonts on-chain:
        <div
          style={{
            display: "inline-block",
            fontSize: "0.9rem",
            fontWeight: "bold",
            whiteSpace: "pre",
            color: "#888",
            padding: "1rem",
            textAlign: "left",
          }}
        >
          {`
|  address capsulesTypeface = 0xasdf;
|
|  ITypeface capsules = ITypeface(capsulesTypeface);
|
|  ITypeface.Font font = Font({
|    weight: 400, 
|    style: "normal"
|  });
|
|  bytes src = capsules.sourceOf(font);`}
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
          CapsulesToken
        </a>
        : Capsules NFT contract.
        <br />
        <br />
        <a
          href="https://etherscan.io/asdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          CapsulesRenderer
        </a>
        : Renders images for Capsule NFTs. Can be upgraded.
      </div>
    </div>
  );
}
