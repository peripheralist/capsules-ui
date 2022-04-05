export default function Info() {
  return (
    <div>
      <h1>Capsules</h1>
      {/* <Capsule
        text={["7,957 NFTs on", "Ethereum"]}
        height={80}
        color={"white"}
        preserveAspectRatio="xMinYMid meet"
      />
      <br />
      <Capsule
        text={["105 editable", "text characters"]}
        height={80}
        color={"white"}
        preserveAspectRatio="xMinYMid meet"
      /> */}

      <section id="capsules">
        7,957 NFTs on Ethereum
        <br />
        <br />
        <h3>Each Capsule has:</h3>
        <b>105 text characters</b> that can be changed by the owner at any time,
        for a fee. Text is rendered as an SVG image on-chain.
        <br />
        <br />
        <b>1 of 7,957 colors</b>
        <br />
        <br />
        <b>1 of 7 Hues:</b>
        <ul className="dashed">
          <li>Red, blue, green (1,351)</li>
          <li>Pink, cyan, yellow (1,301)</li>
          <li>White (1)</li>
        </ul>
        <br />
        <b>1 vote</b> for Delegate
        <br />
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          Capsules Token contract
        </a>
      </section>

      <section id="minting">
        <h2>Minting:</h2>
        7,950 colors can be minted for 0.1 ETH each, with 7 colors reserved for
        Auction. Up to 30 Capsules may be minted for free by wallet addresses on
        a reserve list. 50% of all funds paid to mint will be locked in the
        Treasury.
      </section>

      <section id="auction">
        <h2>Auction:</h2>7 colors are reserved to be auctioned:
        <br />
        <br />
        <span style={{ color: "#FF0000" }}>#FF0000</span>,{" "}
        <span style={{ color: "#FFFF00" }}>#FFFF00</span>,{" "}
        <span style={{ color: "#00FF00" }}>#00FF00</span>,{" "}
        <span style={{ color: "#00FFFF" }}>#00FFFF</span>,{" "}
        <span style={{ color: "#0000FF" }}>#0000FF</span>,{" "}
        <span style={{ color: "#FF00FF" }}>#FF00FF</span>,{" "}
        <span style={{ color: "#FFFFFF" }}>#FFFFFF</span>
        <br />
        <br />
        The Auction can only be started by the Delegate, who can only be elected
        after the initial mint has completed. Once started, each color will be
        auctioned sequentially, with each auction lasting 24 hours.
        <br />
        <br />
        100% of all Auction revenue will be locked in the Capsules contract.
        <br />
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          Auction House contract
        </a>
      </section>

      <section id="delegate">
        <h2>Delegate:</h2>
        Whichever wallet or contract address has {">"}50% of votes is the
        current Delegate.
        <br />
        <br />
        <b>The Delegate can:</b>
        <ul className="dashed">
          <li>Withdraw funds from the Treasury</li>
          <li>
            Set the fee amount for changing a Capsule's text, which is paid to
            the Treasury
          </li>
          <li>Begin/pause the Auction</li>
        </ul>
      </section>

      <section id="treasury">
        <h2>Treasury:</h2>
        Funds are stored in the Capsules contract balance, and can only be
        withdrawn by the Delegate.
        <br />
        <br />
        <b>The Treasury is funded by:</b>
        <ul className="dashed">
          <li>50% of revenue from the initial mint</li>
          <li>100% of revenue from the Auction</li>
          <li>All fees paid to edit Capsule texts, forever</li>
          <li>Any ETH sent to the Capsules contract</li>
        </ul>
      </section>

      <section id="typeface">
        <h2>Typeface:</h2>
        Capsule images render SVG text in the Capsules Typeface: a mono typeface
        stored on-chain in 9 weights using the Typeface solidity interface.
        <br />
        <br />
        It can also be downloaded in{" "}
        <a href="https://" target="_blank" rel="noopener noreferrer">
          individual weights
        </a>{" "}
        or{" "}
        <a href="https://" target="_blank" rel="noopener noreferrer">
          variable weight
        </a>{" "}
        for free.
        <br />
        <br />
        <a href="https://" target="_blank" rel="noopener noreferrer">
          Capsules Typeface contract
        </a>
      </section>
    </div>
  );
}
