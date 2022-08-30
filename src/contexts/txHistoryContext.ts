import { createContext } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Transaction } from "ethers";

export enum TxStatus {
  pending = "PENDING",
  success = "SUCCESS",
  failed = "FAILED",
}

export type TransactionLog = {
  id: number
  tx: Transaction | TransactionResponse;
  title: string;
  status: TxStatus;
  createdAt: number;
};

// Prefer using tx.timestamp if tx has been mined. Otherwise use createdAt timestamp
export const timestampForTxLog = (txLog: TransactionLog) =>
  (txLog.tx as TransactionResponse).timestamp ?? txLog.createdAt

export const TxHistoryContext: React.Context<{
  transactions?: TransactionLog[];
  addTransaction?: (title: string, tx: TransactionResponse) => void;
  removeTransaction?: (id: number) => void;
}> = createContext({});
