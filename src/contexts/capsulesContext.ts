import { createContext } from "react";

export const CapsulesContext: React.Context<{
  paused?: boolean;
  unmintedColors?: string[];
  mintedColors?: string[];
  mintedSupply?: number;
}> = createContext({});
