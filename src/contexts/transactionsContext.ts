import { createContext } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Transaction } from "ethers";

export enum TxStatus {
  pending = "PENDING",
  success = "SUCCESS",
  failed = "FAILED",
}

export type TransactionRecord = {
  id: number
  tx: Transaction | TransactionResponse;
  title: string;
  status: TxStatus;
  timestamp: number;
};

export const TransactionsContext: React.Context<{
  transactions?: TransactionRecord[];
  addTransaction?: (title: string, tx: TransactionResponse) => void;
  removeTransaction?: (id: number) => void;
}> = createContext({});
