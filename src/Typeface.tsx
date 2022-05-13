import Button from "./components/Button";
import { fonts } from "./fonts/fonts";
import { Weight } from "./models/weight";
import { isMobile } from "./constants/isMobile";

export default function Typeface() {
  const weights = Object.keys(fonts).map((key) => parseInt(key) as Weight);

  const Elem = (weight: number, minted?: boolean) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: isMobile ? "50vh" : "100%",
      }}
    >
      <div>Weight</div>
      <h1 style={{ fontWeight: weight }}>{weight}</h1>
      {minted ? <Button text="Minted" isDisabled /> : <Button text="Mint" />}
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <h1>Fonts</h1>
        <br />
        Each of the 7 Capsules fonts must be stored on Ethereum before it can be
        used.{" "}
        <b>
          Anyone who pays gas to store a font will receive a Capsule NFT with
          one of 7 pure colors.
        </b>
        <br />
        <br />
        Once the data for a font has been stored, it's available to any smart
        contract for free via the <b>Typeface solidity interface:</b>
        <br />
        <div style={{ textAlign: "center" }}>
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
  |  ITypeface capsulesType;
  |
  |  Font regular = Font({
  |    weight: 400, 
  |    style: "normal"
  |  });
  |
  |  bytes memory src =
  |    capsulesType.fontSrc(regular);`}
          </div>
        </div>
        <br />
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="light"
        >
          CapsulesTypeface mainnet
        </a>
        <br />
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="light"
        >
          CapsulesTypeface rinkeby
        </a>
        <br />
        <a
          href="https://"
          target="_blank"
          rel="noopener noreferrer"
          className="light"
        >
          Typeface solidity interface
        </a>
        <br />
        <br />
        You can also{" "}
        <a href="https://" target="_blank" rel="noopener noreferrer">
          download the typeface
        </a>{" "}
        for free.
        <br />
        <br />
        <br />
        <h2>Mint #ffffff</h2>
        <br />
      </div>
      <div style={{ paddingTop: 50, paddingBottom: 100 }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-evenly",
          }}
        >
          {weights.map((weight) => Elem(weight, false))}
        </div>
      </div>
    </div>
  );
}
