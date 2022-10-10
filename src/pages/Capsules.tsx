import { BigNumber, utils } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CapsulePreview from "../components/CapsulePreview";
import FormattedAddress from "../components/FormattedAddress";
import Spinner from "../components/Spinner";
import { isMobile } from "../constants/isMobile";
import { WalletContext } from "../contexts/walletContext";
import useContractReader from "../hooks/ContractReader";
import { Capsule as CapsuleType } from "../models/Capsule";
import { querySubgraph } from "../utils/graph";

type SortBy = "minted" | "edited";
type Layout = "list" | "grid";

const PAGE_SIZE = 30;

export default function Capsules() {
  const [loading, setLoading] = useState<boolean>();
  const [capsules, setCapsules] = useState<CapsuleType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortBy>("edited");
  const [layout, setLayout] = useState<Layout>("list");
  const { contracts } = useContext(WalletContext);

  const { wallet } = useParams<{ wallet: string }>();

  const _wallet = wallet && utils.isAddress(wallet) ? wallet : undefined;

  const supply = useContractReader<BigNumber>({
    contract: contracts?.CapsuleToken,
    functionName: _wallet ? undefined : "totalSupply",
  });

  const _setSortBy = useCallback((s: SortBy) => {
    setCapsules([]);
    setPageNumber(0);
    setSortBy(s);
  }, []);

  useEffect(() => {
    async function loadMore() {
      const _capsules = await querySubgraph<CapsuleType, "capsules">({
        entity: "capsule",
        first: PAGE_SIZE,
        skip: pageNumber * PAGE_SIZE,
        keys: ["id", "svg", "lastEdited", "owner", "color", "text", "mintedAt"],
        orderBy: sortBy === "edited" ? "lastEdited" : "mintedAt",
        orderDirection: "desc",
        where: _wallet
          ? [
              {
                key: "owner",
                value: _wallet.toLowerCase(),
              },
            ]
          : [],
      });

      console.log({ _capsules });

      if (!_capsules?.capsules) setCapsules([]);
      else setCapsules((c) => [...c, ..._capsules.capsules]);

      setLoading(false);
    }

    setLoading(true);
    loadMore();
  }, [pageNumber, sortBy, _wallet]);

  function nextPage() {
    if (loading) return;
    setPageNumber((n) => n + 1);
    console.log("next page", pageNumber);
  }

  return (
    <div
      style={{
        padding: "2rem",
        paddingBottom: "4rem",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      onScroll={(e) => {
        if (
          capsules.length % PAGE_SIZE !== 0 ||
          capsules.length === supply?.toNumber()
        ) {
          return;
        }

        const t = e.currentTarget;
        if (t.scrollHeight - t.offsetHeight < t.scrollTop + 200) nextPage();
      }}
    >
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
          justifyContent: "space-between",
          alignItems: "baseline",
          maxWidth: isMobile ? "90vw" : "30rem",
          margin: "0 auto",
          fontSize: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          
          <div
            style={{
              fontWeight: sortBy === "edited" ? 600 : 300,
              cursor: "crosshair",
              fontVariant: "small-caps",
            }}
            onClick={() => _setSortBy("edited")}
          >
            edited
          </div>
          <div
            style={{
              fontWeight: sortBy === "minted" ? 600 : 300,
              cursor: "crosshair",
              fontVariant: "small-caps",
            }}
            onClick={() => _setSortBy("minted")}
          >
            minted
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <div
            style={{
              fontWeight: layout === "list" ? 600 : 300,
              cursor: "crosshair",
            }}
            onClick={() => setLayout("list")}
          >
            ☰
          </div>
          <div
            style={{
              fontWeight: layout === "grid" ? 600 : 300,
              cursor: "crosshair",
            }}
            onClick={() => setLayout("grid")}
          >
            
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem 0",
          maxWidth: "90vw",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          ...(layout === "list"
            ? {
                flexDirection: "column",
              }
            : {
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "baseline",
              }),
        }}
      >
        {capsules.map((c) => (
          <CapsulePreview
            style={
              layout === "list"
                ? {
                    width: isMobile ? "90vw" : "30rem",
                  }
                : {
                    width: "16rem",
                  }
            }
            id={c.id}
            key={c.id}
            href={`/#/c/${c.id}`}
            uri={c.svg}
            color={c.color}
            owner={c.owner}
            lastEditedTimestamp={
              (sortBy === "edited" ? c.lastEdited : c.mintedAt) * 1000
            }
            imgStyle={{
              fontWeight: "initial",
              cursor: "pointer",
            }}
          />
        ))}
        {_wallet && !loading && !capsules.length && (
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
        )}
      </div>

      {loading && (
        <Spinner
          style={{
            fontSize: "3rem",
            margin: "0 auto",
            textAlign: "center",
            lineHeight: 1,
          }}
        />
      )}
    </div>
  );
}
