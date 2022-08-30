import { CSSProperties, useContext, useEffect, useState } from "react";

import { isMobile } from "../constants/isMobile";
import { CapsulesContext } from "../contexts/capsulesContext";
import { NetworkContext } from "../contexts/networkContext";
import { TxHistoryContext, TxStatus } from "../contexts/txHistoryContext";
import useSubgraphQuery from "../hooks/SubgraphQuery";
import FormattedAddress from "./FormattedAddress";
import Modal from "./Modal";
import Transactions from "./Transactions";

export default function Navbar() {
  const { mintedSupply } = useContext(CapsulesContext);
  const { connectedWallet, selectWallet, onLogOut } =
    useContext(NetworkContext);
  const { transactions } = useContext(TxHistoryContext);

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>();
  const [txsOpen, setTxsOpen] = useState<boolean>();

  useEffect(() => {
    // Auto open tx menu if any txs are pending/failed or <2 min old
    if (
      transactions?.some(
        (tx) =>
          tx.status !== TxStatus.success ||
          tx.createdAt >= new Date().valueOf() - 120
      )
    ) {
      setTxsOpen(true);
    }
  }, [transactions]);

  const padding: CSSProperties["padding"] = "1rem 0.5rem";

  const capsules = useSubgraphQuery({
    entity: "capsule",
    keys: ["id"],
    where: connectedWallet
      ? [
          {
            key: "owner",
            value: connectedWallet.toLowerCase(),
          },
        ]
      : [],
  }) as {
    data?: {
      capsules?: { id: string }[];
    };
  };

  const hash = window.location.hash.split("#/")[1];

  const Link = (text: string, path: string) => (
    <a href={"/#/" + path}>
      <div
        className="hov-fat"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          fontWeight: hash === path ? 700 : 400,
          padding,
          boxSizing: "border-box",
          whiteSpace: "pre",
        }}
      >
        <span style={{ flex: 1 }}>{text}</span>
        {hash === path ? "" : ">"}
      </div>
    </a>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          zIndex: 10,
          padding: "0 0.5rem",
        }}
      >
        <div
          className="hov-fat"
          style={{
            cursor: "crosshair",
            width: isMobile ? undefined : 240,
            padding,
          }}
          onClick={() => setMenuIsOpen(true)}
        >
          [☰]
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.5rem",
          }}
        >
          {connectedWallet && (
            <a
              href={"/#/minted/" + connectedWallet}
              style={{
                color: "white",
                fontWeight: 400,
                padding,
              }}
              className="hov-fat"
            >
              [C] {capsules.data?.capsules?.length ?? "--"}
            </a>
          )}
          {connectedWallet && (
            <div
              className="hov-fat"
              style={{ cursor: "crosshair", padding, userSelect: "none" }}
              onClick={() => setTxsOpen(!txsOpen)}
            >
              {/* <span style={{ fontWeight: 600 }}></span>{" "} */}
              {/* [{txsOpen ? "×" : "⚡"}] */}[{txsOpen ? "⌃" : "⚡"}]{" "}
              {transactions?.length ?? "0"}
              {/* {txsOpen ? " -" : " +"} */}
              {/* {txsOpen ? " ⌄" : " ˃"} */}
            </div>
          )}
          {connectedWallet && (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                padding: "0 0.5rem",
              }}
            >
              <FormattedAddress address={connectedWallet} align="right" />
              <div
                className="hov-fat"
                style={{ cursor: "pointer", padding }}
                onClick={onLogOut}
              >
                X
              </div>
            </div>
          )}
          {!connectedWallet && selectWallet && (
            <div
              style={{ cursor: "pointer", padding }}
              onClick={() => selectWallet()}
            >
              Connect
            </div>
          )}
        </div>
      </div>

      {txsOpen && (
        <Transactions
          style={{
            position: "absolute",
            top: "100%",
            right: "1rem",
            zIndex: 1,
            textAlign: "center",
          }}
        />
      )}

      <Modal visible={menuIsOpen} onClose={() => setMenuIsOpen(false)}>
        <menu
          style={{
            display: "inline-block",
            width: isMobile ? "100vw" : 240,
            maxHeight: "80vh",
            overflow: "auto",
            background: "#000",
            margin: 0,
            padding: 0,
            paddingLeft: "0.5rem",
          }}
          onClick={() => setMenuIsOpen(false)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="hov-fat"
              style={{ cursor: "crosshair", padding }}
              onClick={() => setMenuIsOpen(false)}
            >
              {/* [×] */}
              [⌃]
            </div>
            {Link("[⌂] Intro", "")}
            {Link(
              `[#] Minted${mintedSupply ? ` (${mintedSupply})` : ""}`,
              "minted"
            )}
            {Link("[⚡] Mint", "mint")}
            {Link("[@] Typeface", "typeface")}
            {Link("[] Contracts", "contracts")}
          </div>
        </menu>
      </Modal>
    </div>
  );
}
