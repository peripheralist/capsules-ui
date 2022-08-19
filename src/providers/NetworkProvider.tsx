import { Web3Provider } from "@ethersproject/providers";
import { API, Subscriptions, Wallet } from "bnc-onboard/dist/src/interfaces";

import { useCallback, useEffect, useState } from "react";
import { readNetwork } from "../constants/networks";
import { NetworkContext } from "../contexts/networkContext";
import { ChildElems } from "../models/childElems";
import { initOnboard } from "../utils/onboard";

const KEY_SELECTED_WALLET = "selectedWallet";

export default function NetworkProvider({
  children,
}: {
  children: ChildElems;
}) {
  const [signingProvider, setSigningProvider] = useState<Web3Provider>();
  const [connectedWallet, setConnectedWallet] = useState<string>();
  const [onboard, setOnboard] = useState<API>();

  const resetWallet = useCallback(() => {
    onboard?.walletReset();
    setSigningProvider(undefined);
    window && window.localStorage.setItem(KEY_SELECTED_WALLET, "");
  }, [onboard]);

  const onSelectWallet = useCallback(async () => {
    resetWallet();

    // Open select wallet modal.
    const selectedWallet = await onboard?.walletSelect();

    // User quit modal.
    if (!selectedWallet) {
      return;
    }

    // Wait for wallet selection initialization
    await onboard?.walletCheck();
  }, [onboard, resetWallet]);

  // Initialize Onboard
  useEffect(() => {
    if (onboard) return;

    const onSwitchWallet = async (newWallet: Wallet) => {
      if (newWallet.provider) {
        // Reset the account when a new wallet is connected, as it will be resolved by the provider.
        setConnectedWallet(undefined);
        window &&
          window.localStorage.setItem(
            KEY_SELECTED_WALLET,
            newWallet.name || ""
          );
        setSigningProvider(new Web3Provider(newWallet.provider));
      } else {
        resetWallet();
      }
    };

    const onSwitchNetwork = (chainId: number) => {
      if (chainId) {
        setSigningProvider((p) =>
          p ? new Web3Provider(p.provider, chainId) : undefined
        );
      } else {
        setSigningProvider(undefined);
      }
    };

    const config: Subscriptions = {
      address: setConnectedWallet,
      wallet: onSwitchWallet,
      network: onSwitchNetwork,
    };

    setOnboard(initOnboard(config, true));
  }, [onboard, resetWallet]);

  // Reconnect Wallet
  useEffect(() => {
    const previouslySelectedWallet =
      window && window.localStorage.getItem(KEY_SELECTED_WALLET);
    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  const usingCorrectNetwork =
    signingProvider?.network?.chainId === readNetwork.chainId;

  return (
    <NetworkContext.Provider
      value={{
        signingProvider: usingCorrectNetwork ? signingProvider : undefined,
        connectedWallet,
        selectWallet: onSelectWallet,
        onLogOut: resetWallet,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
