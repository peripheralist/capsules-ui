import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useState } from "react";

import Button from "../../components/Button";
import Capsule from "../../components/Capsule";
import TextEditor from "../../components/TextEditor";
import { colorStringToBytes } from "../../constants/colors";
import { isMobile } from "../../constants/isMobile";
import { mintPrice } from "../../constants/mintPrice";
import { EditingContext } from "../../contexts/editingContext";
import { NetworkContext } from "../../contexts/networkContext";
import { WalletContext } from "../../contexts/walletContext";
import { isEmptyBytesText, textToBytesText } from "../../utils/text";
import TabBar, { Tab } from "./TabBar";

const tabBarHeight = Math.max(window.innerHeight * 0.1, 60);

type TabKey = "edit" | "mint";

export default function Minter() {
  const { text, setText, color, setColor, weight, setWeight } =
    useContext(EditingContext);
  const { connectedWallet, selectWallet } = useContext(NetworkContext);
  const { transactor, contracts } = useContext(WalletContext);
  const [selectedTab, setSelectedTab] = useState<TabKey>("edit");
  const [loadingTx, setLoadingTx] = useState<boolean>();

  const tabs: Tab<TabKey>[] = [
    {
      key: "edit",
      title: "1. Edit",
      color,
    },
    { key: "mint", title: "2. Mint" },
  ];

  const mint = useCallback(() => {
    if (!contracts || !transactor || !color) return;

    setLoadingTx(true);

    const bytesText = textToBytesText(text);

    transactor(
      contracts.CapsulesToken,
      isEmptyBytesText(bytesText) ? "mint" : "mintWithText",
      isEmptyBytesText(bytesText)
        ? [colorStringToBytes(color), weight]
        : [colorStringToBytes(color), weight, bytesText],
      {
        value: mintPrice,
        onDone: () => setLoadingTx(false),
        txTitle: `Mint ${color}`,
      }
    );
  }, [contracts, transactor, color, text, weight]);

  // const scrollSpectrumContainer = useCallback(() => {
  //   const x = Math.max(spectrumSize - window.innerWidth, 0) / -2
  //   document.getElementById(spectrumContainerId)?.scrollBy(200, 200);
  // }, [spectrumSize, window.innerWidth]);

  if (!connectedWallet) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          height: "90vh",
        }}
      >
        <Button
          style={{ color: "white" }}
          text="Connect your wallet"
          onClick={() =>
            selectWallet?.((success) => {
              if (success) setSelectedTab("edit");
            })
          }
        />
      </div>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      {selectedTab === "edit" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: isMobile ? "initial" : "center",
            overflow: "auto",
            height: "100%",
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap-reverse",
              gap: isMobile ? 30 : 50,
              minHeight: isMobile ? 750 : 0,
            }}
          >
            {setText && setWeight && (
              <TextEditor
                text={text}
                setText={setText}
                color={color}
                setColor={setColor}
                weight={weight}
                setWeight={setWeight}
                autofocus
              />
            )}

            <div style={{ padding: isMobile ? 10 : 0 }}>
              <Capsule
                text={text}
                color={color}
                width={320}
                weight={weight}
                square
              />
              {!text.length && (
                <div style={{ width: 320 }}>
                  ↑ Leave text empty to use the default image
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "mint" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "initial" : "center",
            justifyContent: "center",
            gap: 50,
            height: "100%",
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <Capsule text={text} color={color} width={320} square />

          <Button
            text={`Mint Capsule (Ξ${formatEther(mintPrice)})`}
            size="large"
            onClick={mint}
            style={{ margin: "0 auto", color: "white" }}
            loading={loadingTx ? "Transaction pending..." : false}
          />
        </div>
      )}

      <div
        style={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
          left: 0,
          right: 0,
          background: "black",
          height: tabBarHeight,
        }}
      >
        <TabBar
          tabs={tabs}
          selectedTab={selectedTab}
          onClickTab={setSelectedTab}
          disabledTabs={color ? undefined : ["edit", "mint"]}
        />
      </div>
    </div>
  );
}
