import { Contract, EventFilter } from "@ethersproject/contracts";
import { useCallback, useContext, useEffect, useState } from "react";

import { WalletContext } from "../contexts/walletContext";
import { ContractName, Contracts } from "../models/contracts";

export type ContractUpdateOn = {
  contract?: ContractConfig;
  eventName?: string;
  topics?: EventFilter["topics"];
}[];

export type ContractConfig = ContractName | Contract | undefined;

export default function useContractReader<V>({
  contract,
  functionName,
  args,
  updateOn,
  formatter,
  callback,
  valueDidChange,
}: {
  contract?: ContractConfig;
  functionName?: string;
  args?: unknown[] | null;
  updateOn?: ContractUpdateOn;
  formatter?: (val?: any) => V | undefined;
  callback?: (val?: V) => void;
  valueDidChange?: (oldVal?: V, newVal?: V) => boolean;
}): V | undefined {
  const [value, setValue] = useState<V | undefined>();

  const { contracts } = useContext(WalletContext);

  const _formatter = useCallback(
    (val: any) => (formatter ? formatter(val) : val),
    [formatter]
  );
  const _callback = useCallback(
    (val: any) => (callback ? callback(val) : val),
    [callback]
  );
  const _valueDidChange = useCallback(
    (a?: any, b?: any) => (valueDidChange ? valueDidChange(a, b) : a !== b),
    [valueDidChange]
  );

  useEffect(() => {
    async function getValue() {
      const readContract = contractToRead(contract, contracts);

      if (!readContract || !functionName || args === null) return;

      try {
        console.info("📚 Read >", functionName);

        const result = await readContract[functionName](...(args ?? []));

        const newValue = _formatter(result);

        if (_valueDidChange(value, newValue)) {
          console.info(
            "📗 New >",
            functionName,
            { args },
            { newValue },
            { contract: readContract.address }
          );
          setValue(newValue);
          _callback(newValue);
        }
      } catch (err) {
        console.error(
          "📕 Read error >",
          functionName,
          { args },
          { err },
          { contract: readContract.address },
          contracts
        );

        setValue(_formatter(undefined));
        _callback(_formatter(undefined));
      }
    }

    getValue();

    const listener = (x: any) => getValue();

    let subscriptions: {
      contract: Contract;
      filter: EventFilter;
    }[] = [];

    if (updateOn?.length) {
      try {
        // Subscribe listener to updateOn events
        updateOn.forEach((u) => {
          const _contract = contractToRead(u.contract, contracts);

          if (!u.eventName || !_contract) return;

          const filter = _contract.filters[u.eventName](...(u.topics ?? []));
          _contract?.on(filter, listener);
          subscriptions.push({
            contract: _contract,
            filter,
          });
        });
      } catch (error) {
        console.info("Read contract >", {
          functionName,
          error,
        });
      }
    }

    return () =>
      subscriptions.forEach((s) => s.contract.off(s.filter, listener));
  }, [
    contract,
    contracts,
    functionName,
    updateOn,
    args,
    _formatter,
    _callback,
    _valueDidChange,
  ]);

  return value;
}

function contractToRead(
  contractConfig?: ContractConfig,
  contracts?: Contracts
): Contract | undefined {
  if (!contractConfig) return;

  if (typeof contractConfig === "string") {
    return contracts ? contracts[contractConfig] : undefined;
  } else return contractConfig;
}
