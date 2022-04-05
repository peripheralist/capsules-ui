import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { hexlify } from "@ethersproject/bytes";
import { Contract } from "@ethersproject/contracts";
import { Deferrable } from "@ethersproject/properties";
import { TransactionRequest } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useCallback, useContext } from "react";

import { NetworkContext } from "../contexts/networkContext";

export type TransactorOptions = {
  value?: BigNumberish;
  onDone?: VoidFunction;
};

export type Transactor = (
  contract: Contract,
  functionName: string,
  args: any[],
  options?: TransactorOptions
) => Promise<boolean>;

export type TransactorInstance<T> = (
  args: T,
  txOpts?: Omit<TransactorOptions, "value">
) => ReturnType<Transactor>;

// Check user has their wallet connected. If not, show select wallet prompt
const checkWalletConnected = (
  selectWallet: VoidFunction,
  connectedWallet?: string | null
) => {
  if (!connectedWallet && selectWallet) {
    selectWallet();
  }
};

// wrapper around BlockNative's Notify.js
// https://docs.blocknative.com/notify
export function useTransactor({
  gasPrice,
}: {
  gasPrice?: BigNumber;
}): Transactor | undefined {
  const {
    signingProvider: provider,
    selectWallet,
    connectedWallet,
  } = useContext(NetworkContext);

  return useCallback(
    async (
      contract: Contract,
      functionName: string,
      args: any[],
      options?: TransactorOptions
    ) => {
      if (!selectWallet) return false;

      if (!provider) {
        selectWallet();
        if (options?.onDone) options.onDone();
        return false;
      }

      checkWalletConnected(selectWallet, connectedWallet);

      if (!provider) return false;

      const signer = provider.getSigner();

      const network = await provider.getNetwork();

      let etherscanNetwork = "";
      if (network.name && network.chainId > 1) {
        etherscanNetwork = network.name + ".";
      }

      let etherscanTxUrl = "https://" + etherscanNetwork + "etherscan.io/tx/";
      if (network.chainId === 100) {
        etherscanTxUrl = "https://blockscout.com/poa/xdai/tx/";
      }

      const tx: Deferrable<TransactionRequest> =
        options?.value !== undefined
          ? contract[functionName](...args, { value: options.value })
          : contract[functionName](...args);

      const reportArgs = Object.values(contract.interface.functions)
        .find((f) => f.name === functionName)
        ?.inputs.reduce(
          (acc, input, i) => ({
            ...acc,
            [input.name]: args[i],
          }),
          {}
        );

      console.info(
        "🧃 Calling " + functionName + "() with args:",
        reportArgs,
        tx
      );

      try {
        let result;

        if (tx instanceof Promise) {
          console.info("AWAITING TX", tx);
          result = await tx;
        } else {
          console.info("RUNNING TX", tx);

          if (!tx.gasPrice) tx.gasPrice = gasPrice ?? parseUnits("4.1", "gwei");

          if (!tx.gasLimit) tx.gasLimit = hexlify(120000);

          result = await signer.sendTransaction(tx);
          await result.wait();
        }
        console.info("RESULT:", result);

        // if it is a valid Notify.js network, use that, if not, just send a default notification
        const isNotifyNetwork =
          [1, 3, 4, 5, 42, 100].indexOf(network.chainId) >= 0;

        options?.onDone && options.onDone();

        return true;
      } catch (e) {
        const message = (e as Error).message;

        console.error("Transaction Error:", message);

        let description: string;

        try {
          let json = message.split("(error=")[1];
          json = json.split(", method=")[0];
          description = JSON.parse(json).message || message;
        } catch (_) {
          description = message;
        }

        options?.onDone && options.onDone();

        return false;
      }
    },
    [selectWallet, provider, gasPrice, connectedWallet]
  );
}
