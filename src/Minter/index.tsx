import { useCallback, useContext, useMemo, useState } from "react";

import Capsule from "../Capsule";
import Button from "../components/Button";
import { auctionColors } from "../constants/colors";
import { isMobile } from "../constants/isMobile";
import { NetworkContext } from "../contexts/networkContext";
import { Text } from "../models/text";
import { Weight } from "../models/weight";
import Spectrum from "../Spectrum";
import TextEditor from "../TextEditor";
import NFTs from "./NFTs";
import TabBar, { Tab } from "./TabBar";

const screenSize = isMobile ? window.innerWidth : window.innerHeight;
const spectrumContainerId = "spectrum-container";
const tabBarHeight = Math.max(window.innerHeight * 0.1, 60);
const bodyHeight = window.innerHeight - tabBarHeight;

type TabKey = "info" | "connect" | "color" | "mint" | "text";

export default function Minter({ useClaim }: { useClaim?: boolean }) {
  const { connectedWallet, selectWallet } = useContext(NetworkContext);
  const [spectrumScale, setSpectrumScale] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<TabKey>("info");
  const [color, setColor] = useState<string>();
  const [text, setText] = useState<Text>([]);
  const [weight, setWeight] = useState<Weight>(400);

  const spectrumScaleMultiplier =
    (isMobile ? 0.9 : 0.75) * (1 + spectrumScale) ** (isMobile ? 4 : 2);

  const spectrumSize = screenSize * spectrumScaleMultiplier;

  const tabs = useMemo(() => {
    const _tabs: Tab<TabKey>[] = [{ key: "info", title: "Capsules" }];

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

    // if (connectedWallet === null) {
    //   _tabs.push({ key: "connect" as const, title: "Mint" });
    // } else if (connectedWallet) {
    //   _tabs.push(
    //     ...[
    //       {
    //         key: "color" as const,
    //         title: "1. " + (color ?? "Color"),
    //         color,
    //       },
    //       { key: "text" as const, title: "2. Text" },
    //       { key: "mint" as const, title: "3. Mint" },
    //     ]
    //   );
    // }

    return _tabs;
  }, [connectedWallet, color]);

  const mint = useCallback(() => {
    // Only send `text` param if text != defaultText
    console.log("MINT");
  }, []);

  const claim = useCallback(() => {
    // Only send `text` param if text != defaultText
    console.log("CLAIM");
  }, []);

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
            maxWidth: 480,
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
                inactiveColors={auctionColors}
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
            />

            <div style={{ padding: isMobile ? 10 : 0 }}>
              <Capsule
                text={text}
                color={color}
                width={320}
                owner={connectedWallet}
                weight={weight}
              />
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
          <Capsule text={text} color={color} width={320} />

          {useClaim ? (
            <Button
              text="Claim Capsule"
              size="large"
              onClick={claim}
              style={{ margin: "0 auto" }}
            />
          ) : (
            <Button
              text="Mint Capsule (0.02 ETH)"
              size="large"
              onClick={mint}
              style={{ margin: "0 auto" }}
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
          disabledTabs={color ? undefined : ["mint", "text"]}
        />
      </div>
    </div>
  );
}
