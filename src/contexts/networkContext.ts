import { Web3Provider } from "@ethersproject/providers";

import { NetworkName } from "../models/networkName";
import { createContext } from "react";

export const NetworkContext: React.Context<{
  signingProvider?: Web3Provider;
  signerNetwork?: NetworkName;
  connectedWallet?: string | null;
  selectWallet?: (callback?: (success: boolean) => void) => Promise<void>;
  onLogOut?: () => void;
}> = createContext({});
