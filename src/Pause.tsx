import { useCallback, useContext, useState } from "react";

import Button from "./components/Button";
import Loading from "./components/Loading";
import { WalletContext } from "./contexts/walletContext";
import useContractReader from "./hooks/ContractReader";

export default function Pause() {
  const { contracts, transactor } = useContext(WalletContext);
  const [loadingTx, setLoadingTx] = useState<boolean>();

  const paused = useContractReader<boolean>({
    contract: contracts?.CapsulesToken,
    functionName: "paused",
  });

  const pause = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(contracts.CapsulesToken, "pause", [], {
      onDone: () => setLoadingTx(false),
    });
  }, [transactor, contracts]);

  const unpause = useCallback(() => {
    if (!transactor || !contracts) return;

    transactor(contracts.CapsulesToken, "unpause", []);
  }, [transactor, contracts]);

  return (
    <div style={{ padding: 20 }}>
      <Button
        text={paused ? "Unpause" : "Pause"}
        onClick={paused ? unpause : pause}
        loading={paused === undefined ? true : loadingTx ? "Waiting..." : false}
      />
    </div>
  );
}