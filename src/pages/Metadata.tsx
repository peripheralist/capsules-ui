import { useCallback, useContext, useState } from "react";

import Button from "../components/Button";
import { WalletContext } from "../contexts/walletContext";

export default function Metadata() {
  const { contracts, transactor } = useContext(WalletContext);
  const [address, setAddress] = useState<string>();
  const [loadingTx, setLoadingTx] = useState<boolean>();

  const setMetadata = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(contracts.CapsuleToken, "setCapsuleMetadata", [address], {
      onDone: () => setLoadingTx(false),
    });
  }, [transactor, contracts, address]);

  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      <input type="text" onChange={(e) => setAddress(e.target.value)} />
      <Button
        size="small"
        text="Set metadata"
        onClick={setMetadata}
        loading={loadingTx ? "Waiting..." : false}
      />
    </div>
  );
}
