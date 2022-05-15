import { Contract } from "@ethersproject/contracts";

export enum ContractName {
  CapsulesToken = "CapsulesToken",
  CapsulesTypeface = "CapsulesTypeface",
}

export type Contracts = Record<ContractName, Contract>;
