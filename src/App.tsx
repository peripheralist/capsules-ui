import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Capsule from "./Capsule";
import { isMobile } from "./constants";
import Mint from "./Mint";
import Typeface from "./Typeface";

const size = isMobile ? 300 : 400;

export default function App() {
  return (
    <div
      style={{
        maxWidth: isMobile ? 320 : 400,
        margin: "0 auto",
        paddingBottom: 100,
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: ``,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          marginTop: "20vh",
        }}
      >
        <Capsule
          size={size}
          scheme="cyan"
          note={[
            "   CAPSULES",
            "",
            "",
            "",
            "> 10,000 NFTs",
            "> 105 chars",
            "> 4 colors",
          ]}
        />
        <Capsule
          size={size}
          scheme="pink"
          note={[
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
          size={size}
          scheme="yellow"
          note={[
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
          size={size}
          scheme="white"
          note={[
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
      <a
        href="/#/mint"
        style={{
          display: "block",
          fontSize: "1.5rem",
          marginTop: 100,
          textAlign: "center",
          width: "100%",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <div style={{ fontSize: "0.8rem" }}>
          ———————————————————————————————————————————
        </div>
        <div style={{ fontSize: "1.6rem" }}>MINT A CAPSULE</div>
        <div style={{ fontSize: "0.8rem" }}>
          ———————————————————————————————————————————
        </div>
      </a>
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
      <HashRouter>
        <Switch>
          <Route path="/mint" component={Mint} />
          <Route path="/typeface" component={Typeface} />
        </Switch>
      </HashRouter>
    </div>
  );
}
