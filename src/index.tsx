import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import NetworkProvider from "./providers/NetworkProvider";
import WalletProvider from "./providers/WalletProvider";
import reportWebVitals from "./reportWebVitals";
import ReactQueryProvider from "./providers/ReactQueryProvider";

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <NetworkProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </NetworkProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
