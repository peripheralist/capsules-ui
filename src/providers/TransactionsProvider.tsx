import { TransactionResponse } from "@ethersproject/providers";
import { useCallback, useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";
import { readProvider } from "../constants/readProvider";

import {
  TransactionRecord,
  TransactionsContext,
  TxStatus,
} from "../contexts/transactionsContext";
import { ChildElems } from "../models/childElems";

const KEY_TRANSACTIONS = "transactions";

const POLL_INTERVAL_MILLIS = 15 * 1000; // 15 sec

// Arbitrary time to give folks a sense of tx history
// (manually removed txs won't persist)
const TX_HISTORY_TIME_SECS = 10 * 60; // 10 min

const nowSeconds = () => new Date().valueOf() / 1000;

const getLocalStorageTxRecords = () =>
  JSON.parse(
    localStorage.getItem(KEY_TRANSACTIONS) || "[]"
  ) as TransactionRecord[];

// Only persist failed/pending txs, and txs within history window
const txShouldPersistOnRefresh = (tx: TransactionRecord) =>
  tx.status !== TxStatus.success ||
  nowSeconds() - TX_HISTORY_TIME_SECS < tx.timestamp;

export default function TransactionsStateProvider({
  children,
}: {
  children: ChildElems;
}) {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [poller, setPoller] = useState<NodeJS.Timer>();

  // Sets TransactionRecords in both localStorage and state
  // Ensures localStorage is always up to date, so we can persist good data on refresh
  const _setTransactions = useCallback((txs: TransactionRecord[]) => {
    localStorage.setItem(KEY_TRANSACTIONS, JSON.stringify(txs));
    setTransactions(txs);
  }, []);

  // Set poller to periodically refresh transactions
  useEffect(() => {
    async function refreshTransactions() {
      const txs = getLocalStorageTxRecords().filter(txShouldPersistOnRefresh);

      // Only refresh pending txs
      if (!txs.some((tx) => tx.status === TxStatus.pending)) return;

      _setTransactions(
        await Promise.all(
          txs.map(async (txRecord) => {
            // We only care to refresh the pending txs
            if (!txRecord.tx.hash || txRecord.status !== TxStatus.pending) {
              return txRecord;
            }

            // If no response yet, get response
            const response = (txRecord.tx as TransactionResponse).wait
              ? (txRecord.tx as TransactionResponse)
              : await readProvider.getTransaction(txRecord.tx.hash);

            let status = TxStatus.pending;

            try {
              await response.wait();

              // Tx has been mined
              status = TxStatus.success;
            } catch (_) {
              // Handle error thrown by ethers provider when a transaction fails
              status = TxStatus.failed;
            }

            return {
              ...txRecord,
              tx: response,
              status,
            };
          })
        )
      );
    }

    // Settle down, only 1 poller at a time
    if (poller) return;

    // Single initial refresh before setting interval
    refreshTransactions();

    const _poller = setInterval(() => {
      refreshTransactions();
    }, POLL_INTERVAL_MILLIS);

    setPoller(_poller);

    // Clean up after yourself
    return () => clearInterval(_poller);
  }, [poller, _setTransactions]);

  const addTransaction = useCallback(
    (title: string, tx: TransactionResponse) => {
      _setTransactions([
        ...transactions,
        {
          // We use millis timestamp for id bcuz tx.hash may be undefined
          // UI couldn't create 2 txs at the same millisecond ...right?
          id: new Date().valueOf(),
          title,
          tx,
          timestamp: nowSeconds(),
          status: TxStatus.pending,
        },
      ]);
    },
    [transactions, _setTransactions]
  );

  const removeTransaction = useCallback(
    (id: number) =>
      _setTransactions(transactions.filter((record) => record.id !== id)),
    [transactions, _setTransactions]
  );

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
