import { BigNumber, utils } from "ethers";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import FormattedAddress from "../components/FormattedAddress";
import Spinner from "../components/Spinner";
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
    contract: contracts?.CapsuleToken,
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

  const _capsules = capsules.data?.capsules;

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
      {_capsules ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            padding: isMobile ? "0 0 5rem 0" : "5rem",
          }}
        >
          {_capsules.length ? (
            _capsules.map((c) => (
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
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "3rem",
            fontSize: "3rem",
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}
