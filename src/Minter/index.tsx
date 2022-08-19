import { formatEther } from "ethers/lib/utils";
import { useCallback, useContext, useMemo, useState } from "react";

import Capsule from "../components/Capsule";
import Button from "../components/Button";
import { reservedColors } from "../constants/colors";
import { isMobile } from "../constants/isMobile";
import { mintPrice } from "../constants/mintPrice";
import { NetworkContext } from "../contexts/networkContext";
import { WalletContext } from "../contexts/walletContext";
import { Text } from "../models/text";
import { Weight } from "../models/weight";
import Spectrum from "../Spectrum";
import TextEditor from "../components/TextEditor";
import NFTs from "./NFTs";
import TabBar, { Tab } from "./TabBar";
import {
  colorStringToBytes,
  isEmptyBytesText,
  textToBytesText,
} from "../utils";
import { useMintedColors } from "../hooks/mintedColors";

const screenSize = isMobile ? window.innerWidth : window.innerHeight;
const spectrumContainerId = "spectrum-container";
const tabBarHeight = Math.max(window.innerHeight * 0.1, 60);
const bodyHeight = window.innerHeight - tabBarHeight;

type TabKey = "info" | "connect" | "color" | "mint" | "text";

export default function Minter() {
  const { connectedWallet, selectWallet } = useContext(NetworkContext);
  const { transactor, contracts } = useContext(WalletContext);
  const [spectrumScale, setSpectrumScale] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<TabKey>("color");
  const [color, setColor] = useState<string>();
  const [text, setText] = useState<Text>([]);
  const [weight, setWeight] = useState<Weight>(400);
  const [loadingTx, setLoadingTx] = useState<boolean>();

  const mintedColors = useMintedColors();

  const spectrumScaleMultiplier =
    (isMobile ? 0.9 : 0.75) * (1 + spectrumScale) ** (isMobile ? 4 : 2);

  const spectrumSize = screenSize * spectrumScaleMultiplier;

  const tabs = useMemo(() => {
    const _tabs: Tab<TabKey>[] = [];
    // const _tabs: Tab<TabKey>[] = [{ key: "info", title: "Capsules" }];

    // _tabs.push(
    //   ...[
    //     {
    //       key: "color" as const,
    //       title: "1. " + (color ?? "Color"),
    //       color,
    //     },
    //     { key: "text" as const, title: "2. Text" },
    //     { key: "mint" as const, title: "3. Mint" },
    //   ]
    // );

    if (!connectedWallet) {
      _tabs.push({ key: "connect" as const, title: "" });
      setSelectedTab("connect");
    } else {
      _tabs.push(
        ...[
          {
            key: "color" as const,
            title: "1. " + (color ?? "Color"),
            color,
          },
          { key: "text" as const, title: "2. Text" },
          { key: "mint" as const, title: "3. Mint" },
        ]
      );
      setSelectedTab("color");
    }

    return _tabs;
  }, [connectedWallet, color]);

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
      }
    );
  }, [contracts, transactor, color, text, weight]);

  // const scrollSpectrumContainer = useCallback(() => {
  //   const x = Math.max(spectrumSize - window.innerWidth, 0) / -2
  //   document.getElementById(spectrumContainerId)?.scrollBy(200, 200);
  // }, [spectrumSize, window.innerWidth]);

  return (
    <div>
      {selectedTab === "info" && (
        <div
          style={{
            margin: "0 auto",
            maxWidth: 540,
            padding: 20,
            paddingBottom: tabBarHeight + 40,
          }}
        >
          <NFTs />
          <br />
          <br />
          <Button
            text="Mint a Capsule"
            style={{ width: "100%", color: "#0ff" }}
            onClick={() => setSelectedTab("color")}
          />
        </div>
      )}

      {selectedTab === "connect" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            paddingBottom: tabBarHeight + 40,
            height: bodyHeight,
          }}
        >
          <Button
            text="Connect your wallet"
            onClick={() =>
              selectWallet?.((success) => {
                if (success) setSelectedTab("color");
              })
            }
          />
        </div>
      )}

      {selectedTab === "color" && (
        <div
          style={{
            position: "relative",
            height: bodyHeight,
            width: "100%",
          }}
        >
          <div
            id={spectrumContainerId}
            style={{
              height: "100%",
              width: "100%",
              overflow: "auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: isMobile ? "30%" : "5%",
                height: spectrumSize,
                width: spectrumSize,
              }}
            >
              <Spectrum
                color={color}
                onSelectColor={setColor}
                inactiveColors={[...reservedColors, ...mintedColors]}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: tabBarHeight * 0.5,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            {isMobile ? (
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  width: 120,
                  background: "#000",
                  padding: 15,
                }}
              >
                <div
                  onClick={() => setSpectrumScale((s) => Math.max(s - 0.2, 0))}
                >
                  -
                </div>
                <div>{Math.round(spectrumScale * 100)}%</div>
                <div
                  onClick={() => setSpectrumScale((s) => Math.min(s + 0.2, 1))}
                >
                  +
                </div>
              </div>
            ) : (
              <input
                style={{ width: 200 }}
                value={spectrumScale}
                type="range"
                min={0}
                step={0.01}
                max={1}
                onInput={(e) =>
                  setSpectrumScale(parseFloat((e.target as any).value))
                }
              />
            )}
          </div>
        </div>
      )}

      {selectedTab === "text" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: isMobile ? "initial" : "center",
            overflow: "auto",
            height: bodyHeight,
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
            <TextEditor
              text={text}
              setText={setText}
              color={color}
              weight={weight}
              setWeight={setWeight}
              autofocus
            />

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
            height: bodyHeight,
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <Capsule text={text} color={color} width={320} square />

          <Button
            text={`Mint Capsule (Ξ${formatEther(mintPrice)})`}
            size="large"
            onClick={mint}
            style={{ margin: "0 auto" }}
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
          disabledTabs={color ? undefined : ["mint", "text"]}
        />
      </div>
    </div>
  );
}
