import Capsule from "./components/Capsule";
import useContractReader from "./hooks/ContractReader";
import useSubgraphQuery from "./hooks/SubgraphQuery";
import { Text } from "./models/text";
import { Weight } from "./models/weight";
import { bytesToColorString } from "./utils/index";
import { useContext } from "react";
import { WalletContext } from "./contexts/walletContext";
import { BigNumber } from "ethers";

export default function Capsules() {
  const { contracts } = useContext(WalletContext);
  const supply = useContractReader<BigNumber>({
    contract: contracts?.CapsulesToken,
    functionName: "totalSupply",
  });

  const capsules = useSubgraphQuery({
    entity: "capsule",
    first: 25,
    keys: ["owner", "text", "fontWeight", "color", "id"],
    orderBy: "mintedAt",
    orderDirection: "desc",
  }) as {
    data?: {
      capsules?: {
        id: string;
        color: string;
        owner: string;
        fontWeight: Weight;
        text: Text;
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
          <div key={c.id}>
            <Capsule
              height={140}
              text={c.text}
              weight={c.fontWeight}
              color={bytesToColorString(c.color)}
              locked={Math.random() > 0.5}
              square={Math.random() > 0.5}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
