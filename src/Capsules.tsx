import { BigNumber } from "ethers";
import { useContext } from "react";

import Capsule from "./components/Capsule";
import { WalletContext } from "./contexts/walletContext";
import useContractReader from "./hooks/ContractReader";
import useSubgraphQuery from "./hooks/SubgraphQuery";
import { Text } from "./models/text";
import { Weight } from "./models/weight";
import { bytesToColorString } from "./utils";

export default function Capsules({
  owner,
}: {
  owner: string | null | undefined;
}) {
  const { contracts } = useContext(WalletContext);
  const supply = useContractReader<BigNumber>({
    contract: contracts?.CapsulesToken,
    functionName: "totalSupply",
  });

  const capsules = useSubgraphQuery({
    entity: "capsule",
    first: 25,
    keys: ["owner", "text", "fontWeight", "color", "id", "locked"],
    orderBy: "mintedAt",
    orderDirection: "desc",
    where: owner
      ? [
          {
            key: "owner",
            value: owner,
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
    <div>
      <h1 style={{ textAlign: "center" }}>
        {supply?.toString()} Capsules Minted
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {capsules.data?.capsules?.map((c) => (
          <div key={c.id} style={{ flex: 1 }}>
            <Capsule
              height={140}
              text={c.text}
              weight={c.fontWeight}
              color={bytesToColorString(c.color)}
              locked={c.locked}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
