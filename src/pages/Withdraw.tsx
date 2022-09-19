import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useEffect, useState } from "react";

import Button from "../components/Button";
import { readProvider } from "../constants/readProvider";
import { WalletContext } from "../contexts/walletContext";
import useContractReader from "../hooks/ContractReader";

export default function Withdraw() {
  const { contracts, transactor } = useContext(WalletContext);
  const [loadingTx, setLoadingTx] = useState<boolean>();
  const [balance, setBalance] = useState<BigNumber>();

  useEffect(() => {
    if (!contracts) return;

    readProvider.getBalance(contracts.CapsuleToken.address).then(setBalance);
  }, [contracts]);

  const withdraw = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(contracts.CapsuleToken, "withdraw", [], {
      onDone: () => setLoadingTx(false),
    });
  }, [transactor, contracts]);

  const feeReceiver = useContractReader<string>({
    contract: contracts?.CapsuleToken,
    functionName: "feeReceiver",
  });

  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      <Button
        size="small"
        text={
          "Withdraw Ξ" +
          (balance ? formatEther(balance) : "--") +
          " to " +
          (feeReceiver ?? "--")
        }
        onClick={withdraw}
        loading={loadingTx ? "Waiting..." : false}
        isDisabled={balance?.isZero()}
      />
      <br />
      {balance?.isZero() && "No balance to withdraw"}
    </div>
  );
}
