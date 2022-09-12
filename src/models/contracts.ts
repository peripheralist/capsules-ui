import { Contract } from "@ethersproject/contracts";

export enum ContractName {
  CapsuleToken = "CapsuleToken",
  CapsulesTypeface = "CapsulesTypeface",
}

export type Contracts = Record<ContractName, Contract>;
