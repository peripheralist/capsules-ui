import { useCallback, useContext, useState } from "react";

import Button from "../components/Button";
import { CapsulesContext } from "../contexts/capsulesContext";
import { WalletContext } from "../contexts/walletContext";

export default function Pause() {
  const { paused } = useContext(CapsulesContext);
  const { contracts, transactor } = useContext(WalletContext);
  const [loadingTx, setLoadingTx] = useState<boolean>();

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
