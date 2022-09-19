import { useCallback, useContext, useState } from "react";

import Button from "../components/Button";
import { WalletContext } from "../contexts/walletContext";

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

  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      <div>
        <textarea
          style={{ border: "1px solid white" }}
          rows={10}
          onChange={(e) =>
            setAddresses(e.target.value.split(",").map((x) => x.trim()))
          }
        />
        <textarea
          style={{ border: "1px solid white" }}
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
    </div>
  );
}
