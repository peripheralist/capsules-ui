import { createContext } from "react";

export const CapsulesContext: React.Context<{
  unmintedColors?: string[];
  mintedColors?: string[];
  mintedSupply?: number;
}> = createContext({});
