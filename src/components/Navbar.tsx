import { useContext } from "react";
import { NetworkContext } from "../contexts/networkContext";
import useSubgraphQuery from "../hooks/SubgraphQuery";
import FormattedAddress from "./FormattedAddress";

export default function Navbar() {
  const { connectedWallet, selectWallet } = useContext(NetworkContext);

  const Link = (text: string, path: string) => (
    <a href={"/#/" + path} style={{ color: "white", fontWeight: 300 }} className="hov-fat">
      {text}
    </a>
  );

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

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: ".5rem",
        fontWeight: 300,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          {Link("[⌂]", "")}
          {/* {Link("[⌂]", "")} */}
          {Link("Mint", "mint")}
          {Link("Minted", "minted")}
          {Link("Contracts", "contracts")}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          {connectedWallet &&
            Link(
              `${capsules.data?.capsules?.length ?? "--"} Capsules`,
              "minted/" + connectedWallet
            )}
          {connectedWallet && (
            <FormattedAddress address={connectedWallet} align="right" />
          )}
          {connectedWallet && <div style={{ cursor: "pointer" }}>X</div>}
          {!connectedWallet && selectWallet && (
            <div style={{ cursor: "pointer" }} onClick={() => selectWallet()}>
              Connect
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
