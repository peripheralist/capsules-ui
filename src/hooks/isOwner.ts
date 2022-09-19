import { useContext } from "react";
import { CapsulesContext } from "../contexts/capsulesContext";
import { NetworkContext } from "../contexts/networkContext";

export function useIsOwner() {
  const { connectedWallet } = useContext(NetworkContext);
  const { owner } = useContext(CapsulesContext);

  return !!(
    owner &&
    connectedWallet &&
    connectedWallet.toLowerCase() === owner.toLowerCase()
  );
}
