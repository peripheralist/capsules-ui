import { CSSProperties, useContext } from "react";
import { readNetwork } from "../constants/networks";
import {
  timestampForTxLog,
  TxHistoryContext,
  TxStatus,
} from "../contexts/txHistoryContext";
import { NetworkName } from "../models/networkName";
import { formatHistoricalDate } from "../utils/date";
import Spinner from "./Spinner";

export default function Transactions({ style }: { style?: CSSProperties }) {
  const { transactions, removeTransaction } = useContext(TxHistoryContext);

  const TxStatusElem = (status: TxStatus) => {
    switch (status) {
      case TxStatus.pending:
        return <Spinner />;
      case TxStatus.success:
        return <div style={{ color: "#00ff00" }}>✓</div>;
      case TxStatus.failed:
        return <div style={{ color: "#ff0000" }}>☹</div>;
    }
  };

  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: 240,
      }}
    >
      {transactions?.length ? (
        transactions
          .sort((a, b) =>
            timestampForTxLog(a) > timestampForTxLog(b) ? -1 : 1
          )
          .map((tx) => (
            <div
              key={tx.tx.hash}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "0.5rem 1rem",
                border: "1px solid #ffffff20",
                background: "#000",
                boxSizing: "border-box",
              }}
            >
              <a
                style={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  color: "white",
                }}
                href={`https://${readNetwork.name}${
                  readNetwork.name !== NetworkName.mainnet ? "." : ""
                }etherscan.io/tx/${tx.tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {TxStatusElem(tx.status)}{" "}
                <span style={{ fontSize: "0.8rem" }}>{tx.title}</span>{" "}
                <span style={{ fontSize: "0.8rem", fontWeight: 300 }}>
                  {formatHistoricalDate(timestampForTxLog(tx) * 1000)}
                </span>
              </a>

              <span
                style={{ cursor: "crosshair" }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTransaction?.(tx.id);
                }}
              >
                ×
              </span>
            </div>
          ))
      ) : (
        <div style={{ fontWeight: 600 }}>No tx history</div>
      )}
    </div>
  );
}
