import { BigNumber, utils } from "ethers";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CapsulePreview from "../components/CapsulePreview";

import FormattedAddress from "../components/FormattedAddress";
import Spinner from "../components/Spinner";
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
    first: 1000,
    keys: ["id", "svg", "lastEdited", "owner", "color", "text"],
    orderBy: "lastEdited",
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

  const col1: CapsuleType[] = [];
  const col2: CapsuleType[] = [];
  const col3: CapsuleType[] = [];

  _capsules?.forEach((c, i) => {
    if (i % 3 === 0) {
      col3.push(c);
    } else if (i % 2 === 0) {
      col2.push(c);
    } else {
      col1.push(c);
    }
  });

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
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
            padding: isMobile ? "5rem 0 5rem 0" : "5rem 0 5rem 0",
            width: isMobile ? "90vw" : "32rem",
            margin: "0 auto",
          }}
        >
          {_capsules.length ? (
            _capsules.map((c) => (
              <a key={c.id} href={`/#/c/${c.id}`}>
                <CapsulePreview
                  uri={c.svg}
                  color={c.color}
                  owner={c.owner}
                  lastEditedTimestamp={c.lastEdited * 1000}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                  imgStyle={{
                    fontWeight: "initial",
                    cursor: "pointer",
                    // maxHeight: isMobile
                    //   ? undefined
                    //   : // : trimText(parseBytesText(c.text)).length > 4
                    //     // ? "14rem"
                    //     "12rem",
                  }}
                />
                {/* <SVGURIRenderer
                  uri={c.svg}
                  style={{
                    fontWeight: "initial",
                    cursor: "pointer",
                    height: isMobile ? undefined : "10rem",
                    width: isMobile ? "90vw" : undefined,
                  }}
                /> */}
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
