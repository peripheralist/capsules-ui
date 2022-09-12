import { useCallback, useContext, useState } from "react";

import Button from "../components/Button";
import { WalletContext } from "../contexts/walletContext";
import useContractReader from "../hooks/ContractReader";

export default function Pause() {
  const { contracts, transactor } = useContext(WalletContext);
  const [loadingTx, setLoadingTx] = useState<boolean>();

  const paused = useContractReader<boolean>({
    contract: contracts?.CapsuleToken,
    functionName: "paused",
  });

  const pause = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(contracts.CapsuleToken, "pause", [], {
      onDone: () => setLoadingTx(false),
    });
  }, [transactor, contracts]);

  const unpause = useCallback(() => {
    if (!transactor || !contracts) return;

    transactor(contracts.CapsuleToken, "unpause", []);
  }, [transactor, contracts]);

  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      <Button
        size="small"
        text={paused ? "Unpause" : "Pause"}
        onClick={paused ? unpause : pause}
        loading={paused === undefined ? true : loadingTx ? "Waiting..." : false}
      />
    </div>
  );
}
