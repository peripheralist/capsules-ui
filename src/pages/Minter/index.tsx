import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useState } from "react";

import Button from "../../components/Button";
import Capsule from "../../components/Capsule";
import TextEditor from "../../components/TextEditor";
import { colorStringToBytes } from "../../constants/colors";
import { isMobile } from "../../constants/isMobile";
import { mintPrice } from "../../constants/mintPrice";
import { CapsulesContext } from "../../contexts/capsulesContext";
import { EditingContext } from "../../contexts/editingContext";
import { NetworkContext } from "../../contexts/networkContext";
import { WalletContext } from "../../contexts/walletContext";
import { useIsOwner } from "../../hooks/isOwner";
import useSubgraphQuery from "../../hooks/SubgraphQuery";
import { textToBytesText } from "../../utils/text";
import TabBar, { Tab } from "./TabBar";

const tabBarHeight = Math.max(window.innerHeight * 0.1, 60);

type TabKey = "edit" | "mint";

export default function Minter() {
  const { text, setText, color, setColor, weight, setWeight } =
    useContext(EditingContext);
  const { connectedWallet, selectWallet } = useContext(NetworkContext);
  const { paused } = useContext(CapsulesContext);
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

  const giftRecipients = useSubgraphQuery({
    entity: "giftRecipient",
    keys: ["giftCount"],
    where: connectedWallet
      ? [
          {
            key: "id",
            value: connectedWallet.toLowerCase(),
          },
        ]
      : [],
  }) as {
    data?: {
      giftRecipients?: { giftCount: number }[];
    };
  };

  const giftCount = giftRecipients.data?.giftRecipients?.[0]?.giftCount || 0;

  const isOwner = useIsOwner();

  const mint = useCallback(() => {
    if (!contracts || !transactor || !color) return;

    setLoadingTx(true);

    const bytesText = textToBytesText(text);

    transactor(
      contracts.CapsuleToken,
      "mint",
      [colorStringToBytes(color), { weight, style: "normal" }, bytesText],
      {
        value: mintPrice,
        onDone: () => setLoadingTx(false),
        txTitle: `Mint ${color}`,
      }
    );
  }, [contracts, transactor, color, text, weight]);

  const mintGift = useCallback(() => {
    if (!contracts || !transactor || !color) return;

    setLoadingTx(true);

    const bytesText = textToBytesText(text);

    transactor(
      contracts.CapsuleToken,
      "mintGift",
      [colorStringToBytes(color), { weight, style: "normal" }, bytesText],
      {
        onDone: () => setLoadingTx(false),
        txTitle: `Mint ${color}`,
      }
    );
  }, [contracts, transactor, color, text, weight]);

  const mintAsOwner = useCallback(() => {
    if (!contracts || !transactor || !color) return;

    setLoadingTx(true);

    const bytesText = textToBytesText(text);

    transactor(
      contracts.CapsuleToken,
      "mintAsOwner",
      [
        connectedWallet,
        colorStringToBytes(color),
        { weight, style: "normal" },
        bytesText,
      ],
      {
        onDone: () => setLoadingTx(false),
        txTitle: `Mint ${color}`,
      }
    );
  }, [connectedWallet, contracts, transactor, color, text, weight]);

  // const scrollSpectrumContainer = useCallback(() => {
  //   const x = Math.max(spectrumSize - window.innerWidth, 0) / -2
  //   document.getElementById(spectrumContainerId)?.scrollBy(200, 200);
  // }, [spectrumSize, window.innerWidth]);

  return (
    <div
      style={{
        height: "100vh",
        paddingTop: "3rem",
        paddingBottom: tabBarHeight,
        boxSizing: "border-box",
      }}
    >
      {selectedTab === "edit" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: isMobile ? "initial" : "center",
            overflow: isMobile ? "auto" : undefined,
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
                <div style={{ width: 320, textAlign: "center" }}>
                  ↑ Leave text empty to use a default image
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

          {isOwner ? (
            <Button
              text="Mint as Owner"
              size="large"
              onClick={mintAsOwner}
              style={{ margin: "0 auto", color: "white" }}
              loading={loadingTx ? "Transaction pending..." : false}
            />
          ) : !!giftCount ? (
            <Button
              isDisabled={paused}
              text={`♥ Mint Gift ♥ (${giftCount} left)`}
              size="large"
              onClick={mintGift}
              style={{ margin: "0 auto", color: "white" }}
              loading={loadingTx ? "Transaction pending..." : false}
            />
          ) : (
            <Button
              isDisabled={paused}
              text={
                paused
                  ? "Minting paused"
                  : connectedWallet
                  ? `Mint Capsule (Ξ${formatEther(mintPrice)})`
                  : "Connect wallet"
              }
              size="large"
              onClick={connectedWallet ? mint : selectWallet}
              style={{ margin: "0 auto", color: "white" }}
              loading={loadingTx ? "Transaction pending..." : false}
            />
          )}
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
