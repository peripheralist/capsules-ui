import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { useContext, useEffect, useState } from "react";

import { readNetwork } from "../constants/networks";
import { readProvider } from "../constants/readProvider";
import { NetworkContext } from "../contexts/networkContext";
import { ContractName, Contracts } from "../models/contracts";
import { NetworkName } from "../models/networkName";

export function useContractLoader() {
  const [contracts, setContracts] = useState<Contracts>();

  const { signingProvider } = useContext(NetworkContext);

  useEffect(() => {
    async function loadContracts() {
      try {
        const network = readNetwork.name;

        // Contracts can be used read-only without a signer, but require a signer to create transactions.
        const signerOrProvider = signingProvider?.getSigner() ?? readProvider;

        const newContracts = Object.values(ContractName).reduce(
          (accumulator, contractName) => ({
            ...accumulator,
            [contractName]: loadContract(
              contractName,
              network,
              signerOrProvider
            ),
          }),
          {} as Contracts
        );

        setContracts(newContracts);
      } catch (e) {
        console.error("CONTRACT LOADER ERROR:", e);
      }
    }

    loadContracts();
  }, [signingProvider, setContracts]);

  return contracts;
}

const loadContract = (
  contractName: ContractName,
  network: NetworkName,
  signerOrProvider: JsonRpcSigner | JsonRpcProvider
) => {
  const json = require(`../constants/contracts/${network}/${contractName}.json`);
  return new Contract(json.address, json.abi, signerOrProvider);
};
