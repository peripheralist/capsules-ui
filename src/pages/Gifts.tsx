import { useCallback, useContext, useState } from "react";

import Button from "../components/Button";
import FormattedAddress from "../components/FormattedAddress";
import { WalletContext } from "../contexts/walletContext";
import { useIsOwner } from "../hooks/isOwner";
import useSubgraphQuery from "../hooks/SubgraphQuery";

export default function Gifts() {
  const [addresses, setAddresses] = useState<string[]>();
  const [counts, setCounts] = useState<number[]>();
  const { contracts, transactor } = useContext(WalletContext);
  const [loadingTx, setLoadingTx] = useState<boolean>();

  const setGifts = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(contracts.CapsuleToken, "setGiftCounts", [addresses, counts], {
      onDone: () => setLoadingTx(false),
    });
  }, [transactor, contracts, addresses, counts]);

  const giftRecipients = useSubgraphQuery({
    entity: "giftRecipient",
    keys: ["giftCount", "id"],
  }) as {
    data?: {
      giftRecipients?: { id: string; giftCount: number }[];
    };
  };

  const isOwner = useIsOwner();

  if (!isOwner) return null;

  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      <div>
        <textarea
          style={{ border: "1px solid white" }}
          placeholder="addresses (comma separated)"
          rows={10}
          onChange={(e) =>
            setAddresses(e.target.value.split(",").map((x) => x.trim()))
          }
        />
        <textarea
          style={{ border: "1px solid white" }}
          placeholder="counts (comma separated)"
          rows={10}
          onChange={(e) =>
            setCounts(e.target.value.split(",").map((x) => parseInt(x.trim())))
          }
        />
      </div>
      <Button
        size="small"
        text={"Set gifts"}
        onClick={setGifts}
        loading={loadingTx ? "Waiting..." : false}
      />
      <br />
      <br />
      <br />
      <div style={{ maxWidth: 300, margin: "0 auto" }}>
        {giftRecipients.data?.giftRecipients?.map((r) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
            key={r.id}
          >
            <span style={{ display: "flex" }}>
              <FormattedAddress address={r.id} />:
            </span>
            {r.giftCount}
          </div>
        ))}
      </div>
    </div>
  );
}
