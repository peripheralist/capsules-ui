import { createContext } from "react";

export const CapsulesContext: React.Context<{
  paused?: boolean;
  owner?: string;
  unmintedColors?: string[];
  mintedColors?: string[];
  mintedSupply?: number;
}> = createContext({});
