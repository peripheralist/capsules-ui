import { BigNumber, utils } from "ethers";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import FormattedAddress from "../components/FormattedAddress";
import SVGURIRenderer from "../components/SVGURIRenderer";
import { isMobile } from "../constants/isMobile";
import { WalletContext } from "../contexts/walletContext";
import useContractReader from "../hooks/ContractReader";
import useSubgraphQuery from "../hooks/SubgraphQuery";
import { Capsule as CapsuleType } from "../models/Capsule";

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
    keys: ["id", "svg"],
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
      capsules?: CapsuleType[];
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <h1
        style={{
          textAlign: "center",
          paddingTop: isMobile ? 50 : 0,
          fontWeight: 600,
        }}
      >
        {_wallet ? (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            ☀☀☀ <FormattedAddress address={_wallet} /> ☀☀☀
          </span>
        ) : (
          `${supply?.toString() ?? "--"} Capsules Minted`
        )}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          padding: isMobile ? "0 0 5rem 0" : "5rem",
        }}
      >
        {capsules.data?.capsules?.length ? (
          capsules.data.capsules.map((c) => (
            <a key={c.id} href={`/#/c/${c.id}`}>
              <SVGURIRenderer
                uri={c.svg}
                style={{
                  fontWeight: "initial",
                  cursor: "pointer",
                  height: isMobile ? undefined : "10rem",
                  width: isMobile ? "90vw" : undefined,
                }}
              />
              {/* <div>
              <Capsule
                height={isMobile ? undefined : "10rem"}
                width={isMobile ? "90vw" : undefined}
                text={c.text}
                weight={c.fontWeight}
                color={bytesToColorString(c.color)}
                locked={c.locked}
                style={{ fontWeight: "initial", cursor: "pointer" }}
              />
            </div> */}
            </a>
          ))
        ) : _wallet ? (
          <div
            style={{
              padding: "2rem",
              margin: "0 auto",
              fontWeight: 200,
              fontSize: "1.4rem",
            }}
          >
            0 Capsules owned by <FormattedAddress address={_wallet} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
