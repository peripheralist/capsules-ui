import { BigNumber } from "@ethersproject/bignumber";
import { useContractLoader } from "../hooks/ContractLoader";
import { useGasPriceQuery } from "../hooks/GasPrice";
import { useTransactor } from "../hooks/Transactor";
import { ChildElems } from "../models/childElems";
import { WalletContext } from "../contexts/walletContext";

export default function WalletProvider({ children }: { children: ChildElems }) {
  const contracts = useContractLoader();

  const { data: gasPrice } = useGasPriceQuery("average");

  const transactor = useTransactor({
    gasPrice: gasPrice ? BigNumber.from(gasPrice) : undefined,
  });

  return (
    <WalletContext.Provider
      value={{
        contracts,
        transactor,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
