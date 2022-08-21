import { BigNumber, utils } from "ethers";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import Capsule from "../components/Capsule";
import FormattedAddress from "../components/FormattedAddress";
import { WalletContext } from "../contexts/walletContext";
import useContractReader from "../hooks/ContractReader";
import useSubgraphQuery from "../hooks/SubgraphQuery";
import { Text } from "../models/text";
import { Weight } from "../models/weight";
import { bytesToColorString } from "../utils";

export default function Capsules() {
  const { contracts } = useContext(WalletContext);

  const { wallet } = useParams<{ wallet: string }>();

  const _wallet = wallet && utils.isAddress(wallet) ? wallet : undefined;

  const supply = useContractReader<BigNumber>({
    contract: contracts?.CapsulesToken,
    functionName: _wallet ? undefined : "totalSupply",
  });

  const capsules = useSubgraphQuery({
    entity: "capsule",
    first: 25,
    keys: ["owner", "text", "fontWeight", "color", "id", "locked"],
    orderBy: "mintedAt",
    orderDirection: "desc",
    where: _wallet
      ? [
          {
            key: "owner",
            value: _wallet.toLowerCase(),
          },
        ]
      : [],
  }) as {
    data?: {
      capsules?: {
        id: string;
        color: string;
        owner: string;
        fontWeight: Weight;
        text: Text;
        locked: boolean;
      }[];
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>
        {_wallet ? (
          <span>
            Owned by <FormattedAddress address={_wallet} />
          </span>
        ) : (
          `${supply?.toString() ?? "--"} Capsules Minted`
        )}
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {capsules.data?.capsules?.map((c) => (
          <a key={c.id} href={`/#/edit/${c.id}`}>
            <div>
              <Capsule
                height={"10rem"}
                text={c.text}
                weight={c.fontWeight}
                color={bytesToColorString(c.color)}
                locked={c.locked}
                style={{ fontWeight: "initial", cursor: "pointer" }}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
