import { CSSProperties, useContext, useState } from "react";
import { isMobile } from "../constants/isMobile";
import { NetworkContext } from "../contexts/networkContext";
import { useMintedColors } from "../hooks/mintedColors";
import useSubgraphQuery from "../hooks/SubgraphQuery";
import FormattedAddress from "./FormattedAddress";
import Modal from "./Modal";

export default function Navbar() {
  const { connectedWallet, selectWallet } = useContext(NetworkContext);

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>();

  const padding: CSSProperties["padding"] = "1rem";

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

  const mintedColors = useMintedColors();

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
        }}
      >
        <span>{text}</span>
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
        display: "flex",
        justifyContent: "space-between",
        zIndex: 10,
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

      <div style={{ display: "flex" }}>
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
            {capsules.data?.capsules?.length ?? "--"} Owned
          </a>
        )}

        {connectedWallet && (
          <div style={{ padding }}>
            <FormattedAddress address={connectedWallet} align="right" />
          </div>
        )}
        {connectedWallet && (
          <div className="hov-fat" style={{ cursor: "pointer", padding }}>
            X
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

      <Modal visible={menuIsOpen} onClose={() => setMenuIsOpen(false)}>
        <menu
          style={{
            width: isMobile ? "100vw" : 240,
            maxHeight: "80vh",
            overflow: "auto",
            background: "#000",
            margin: 0,
            padding: 0,
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
              style={{ cursor: "crosshair", padding: "1rem" }}
              onClick={() => setMenuIsOpen(false)}
            >
              [×]
            </div>
            {Link("⌂ Intro", "")}
            {Link(
              `# Minted${
                mintedColors.length ? ` (${mintedColors.length})` : ""
              }`,
              "minted"
            )}
            {Link("⚡ Mint", "mint")}
            {/* {Link(" Contracts", "contracts")} */}
            {Link(" Contracts", "contracts")}
          </div>
        </menu>
      </Modal>
    </div>
  );
}
