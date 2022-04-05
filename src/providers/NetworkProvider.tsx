import { Web3Provider } from "@ethersproject/providers";
import { API, Subscriptions, Wallet } from "bnc-onboard/dist/src/interfaces";
import { useCallback, useEffect, useState } from "react";

import { NETWORKS, readNetwork } from "../constants/networks";
import { NetworkContext } from "../contexts/networkContext";
import { ChildElems } from "../models/childElems";
import { NetworkName } from "../models/networkName";
import { initOnboard } from "../utils/onboard";

const KEY_SELECTED_WALLET = "selectedWallet";

export default function NetworkProvider({
  children,
}: {
  children: ChildElems;
}) {
  const [signingProvider, setSigningProvider] = useState<Web3Provider>();
  const [network, setNetwork] = useState<NetworkName>();
  const [account, setAccount] = useState<string>();
  const [onboard, setOnboard] = useState<API>();

  const resetWallet = useCallback(() => {
    onboard?.walletReset();
    setSigningProvider(undefined);
    window.localStorage.setItem(KEY_SELECTED_WALLET, "");
  }, [onboard]);

  const selectWallet = async (callback?: (success: boolean) => void) => {
    resetWallet();

    // Open select wallet modal.
    const selectedWallet = await onboard?.walletSelect();

    // User quit modal.
    if (!selectedWallet) {
      callback?.(false);
      return;
    }

    // Wait for wallet selection initialization
    await onboard?.walletCheck();

    callback?.(true);
  };

  const logOut = async () => {
    resetWallet();
  };

  // Initialize Network
  useEffect(() => {
    if (onboard) return;

    const selectWallet = async (newWallet: Wallet) => {
      if (newWallet.provider) {
        // Reset the account when a new wallet is connected, as it will be resolved by the provider.
        setAccount(undefined);
        window.localStorage.setItem(KEY_SELECTED_WALLET, newWallet.name || "");
        setSigningProvider(new Web3Provider(newWallet.provider));
      } else {
        resetWallet();
      }
    };
    const config: Subscriptions = {
      address: setAccount,
      wallet: selectWallet,
    };
    setOnboard(initOnboard(config, true));
  }, [onboard, resetWallet]);

  // On darkmode changed
  useEffect(() => {
    if (onboard) {
      onboard.config({ darkMode: true });
    }
  }, [onboard]);

  // Refresh Network
  useEffect(() => {
    async function getNetwork() {
      await signingProvider?.ready;

      const network = signingProvider?.network?.chainId
        ? NETWORKS[signingProvider.network.chainId]
        : undefined;

      setNetwork(network?.name);
    }
    getNetwork();
  }, [signingProvider]);

  // Reconnect Wallet
  useEffect(() => {
    const previouslySelectedWallet =
      window.localStorage.getItem(KEY_SELECTED_WALLET);
    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  return (
    <NetworkContext.Provider
      value={{
        signerNetwork: network,
        signingProvider:
          signingProvider && network === readNetwork.name && account
            ? signingProvider
            : undefined,
        connectedWallet: account ?? null,
        selectWallet,
        onLogOut: logOut,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
