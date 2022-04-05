import Capsule from "./Capsule";
import Button from "./components/Button";
import { isMobile } from "./constants/isMobile";

export default function Landing() {
  const gap = isMobile ? 30 : 40;
  const size = isMobile ? window.innerWidth - gap : 400;

  return (
    <div>
      <div
        style={{
          maxWidth: size,
          margin: "0 auto",
          paddingBottom: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap,
            marginTop: "20vh",
          }}
        >
          <Capsule
            width={size}
            color="#00ffff"
            text={[
              "   CAPSULES",
              "",
              "",
              "",
              "",
              "> 7,957 colors",
              "> 105 chars",
            ]}
          />
          <Capsule
            width={size}
            color="#ff00ff"
            text={[
              "Capsule =",
              " ~ on-chain ~",
              "SVG text image",
              "",
              "Owner can edit",
              "any time for a",
              "fee of 0.01 ETH",
            ]}
          />
          <Capsule
            width={size}
            color="#ffff00"
            text={[
              " 50% ETH from",
              "   minting",
              "      +",
              " All ETH paid",
              "   in edits",
              "",
              ">>> Locked <<<",
            ]}
          />
          <Capsule
            width={size}
            color="white"
            text={[
              "",
              "...but can be",
              "withdrawn when",
              ">50% agree",
              "where it goes",
              "",
              "             ;)",
            ]}
          />
        </div>
        <Button
          href="/#/mint"
          text="MINT A CAPSULE"
          style={{ marginTop: 100, width: "100%" }}
        />
        <div style={{ marginTop: 100 }}>
          <h3>Releasing funds</h3>
          <p>
            Every Capsule owner may choose a <b>recipient</b> wallet address for
            their token. If at least 50% of Capsules have a matching{" "}
            <b>recipient</b> address, any funds locked in the contract can be
            withdrawn to it.
          </p>
          <br />
          <h3>Typeface</h3>
          <p>
            Capsule SVG images render text in the custom{" "}
            <a href="/#/typeface">Capsule typeface</a>, which is stored entirely
            on-chain.
          </p>
        </div>
        <div style={{ marginTop: 100 }}>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
