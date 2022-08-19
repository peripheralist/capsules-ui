import { BigNumber } from "ethers";
import { useContext } from "react";

import Capsule from "./components/Capsule";
import FormattedAddress from "./components/FormattedAddress";
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
    functionName: owner ? undefined : "totalSupply",
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
            value: owner.toLowerCase(),
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
        {owner ? (
          <span>
            Owned by <FormattedAddress address={owner} />
          </span>
        ) : (
          `${supply?.toString() ?? "--"} Capsules Minted`
        )}
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
