import { Contracts } from "../models/contracts";
import { createContext } from "react";

import { Transactor } from "../hooks/Transactor";

export const WalletContext: React.Context<{
  contracts?: Contracts;
  transactor?: Transactor;
}> = createContext({});
