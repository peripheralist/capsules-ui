import { spectrumMintColors } from "./constants/elements/spectrumMintColors";
import { spectrumAuctionColors } from "./constants/elements/spectrumAuctionColors";

export default function Info() {
  return (
    <div>
      <h1>Capsules</h1>

      <section id="capsules">
        <b>7,957 NFTs on Ethereum</b>
        <br />
        <br />
        <b>Each Capsule has...</b>
        <br />
        <br />
        <b>128 text characters</b> that can be changed by the owner at any time,
        for a fee. The text is rendered as an image on-chain.
        <br />
        <br />
        <b>One of 7,957 colors</b>
        {/* , each from <b>one of 7 hues:</b>
        <ul className="dashed">
          <li>Red, blue, green (1,351 colors)</li>
          <li>Pink, cyan, yellow (1,301 colors)</li>
          <li>White (1 color)</li>
        </ul> */}
        <br />
        <br />
        <b>One vote</b> for Delegate
        <br />
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          Capsules Token contract
        </a>
      </section>

      <section id="mint">
        <h2>Mint</h2>
        <b>7,950 colors</b> are available to mint for 0.1 ETH each. 30 of those
        colors may be minted for free by wallets on a reserve list.
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: spectrumMintColors }}></div>
        <br />
        <br />
        50% of all ETH paid to Mint will be locked in the Treasury.
      </section>

      <section id="auction">
        <h2>Auction</h2>
        <b>7 colors</b> are reserved for auction and can't be minted:
        <br />
        <br />
        <div dangerouslySetInnerHTML={{ __html: spectrumAuctionColors }}></div>
        {/* <span style={{ color: "#FF0000" }}>#FF0000</span>,{" "}
        <span style={{ color: "#FFFF00" }}>#FFFF00</span>,{" "}
        <span style={{ color: "#00FF00" }}>#00FF00</span>,{" "}
        <span style={{ color: "#00FFFF" }}>#00FFFF</span>,{" "}
        <span style={{ color: "#0000FF" }}>#0000FF</span>,{" "}
        <span style={{ color: "#FF00FF" }}>#FF00FF</span>,{" "}
        <span style={{ color: "#FFFFFF" }}>#FFFFFF</span> */}
        <br />
        <br />
        The Auction can <b>only be started by the Delegate</b>, who can only be
        elected <b>after the initial mint has completed</b>. Once started, each
        color will be auctioned sequentially, with each auction lasting 24
        hours.
        <br />
        <br />
        100% of revenue from the Auction will be locked in the Treasury.
        <br />
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          Auction House contract
        </a>
      </section>

      <section id="delegate">
        <h2>Delegate</h2>
        The Delegate can:
        <ul className="dashed">
          <li>
            <b>Withdraw funds</b> from the Treasury
          </li>
          <li>
            <b>Set the fee amount</b> for changing a Capsule's text, which is
            paid to the Treasury
          </li>
          <li>
            <b>Begin/pause the Auction</b>
          </li>
        </ul>
        <br />
        Selecting a Delegate will require Capsule owners to work together:{" "}
        <b>
          whichever wallet or contract address has {">"}50% of votes is the
          current Delegate
        </b>
        . Each Capsule's vote can be changed by its owner at any time, and is
        reset when the token is transferred.
      </section>

      <section id="treasury">
        <h2>Treasury</h2>
        Funds are stored in the Capsules contract balance, and can only be
        withdrawn by the Delegate.
        <br />
        <br />
        The Treasury is funded by:
        <ul className="dashed">
          <li>
            50% of <b>Mint revenue</b>
          </li>
          <li>
            100% of <b>Auction revenue</b>
          </li>
          <li>
            All <b>fees paid to edit Capsule text</b>, forever
          </li>
          <li>Any other ETH sent to the Capsules contract</li>
        </ul>
      </section>

      <section id="typeface">
        <h2>Typeface</h2>
        Capsule images render SVG text in the Capsules Typeface: a mono typeface
        that supports all 95 basic Latin characters. The typeface is stored
        on-chain in 9 weights using the <b>Typeface solidity interface</b>.
        <br />
        <br />
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            whiteSpace: "pre",
            color: "#888",
            padding: "1rem",
          }}
        >
          {`|  ITypeface capsulesType;
|
|  Font memory regular = Font({
|    weight: 400, 
|    style: "normal"
|  });
|
|  bytes memory src =
|    capsulesType.fontSrc(regular);`}
        </div>
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          Capsules Typeface contract
        </a>
        <br />
        <br />
        You can also{" "}
        <a href="https://" target="_blank" rel="noopener noreferrer">
          download the typeface
        </a>{" "}
        for free.
      </section>
    </div>
  );
}
