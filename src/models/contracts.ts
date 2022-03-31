import { Contract } from "@ethersproject/contracts";

export enum ContractName {
  CapsulesToken = "CapsulesToken",
  CapsulesAuctionHouse = "CapsulesAuctionHouse",
}

export type Contracts = Record<ContractName, Contract>;
