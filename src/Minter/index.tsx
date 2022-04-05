import { useCallback, useEffect, useState } from "react";
import Capsule from "../Capsule";
import Button from "../components/Button";
import { isMobile } from "../constants/isMobile";
import Info from "../Info";

import { Lines } from "../models/lines";
import Spectrum from "../Spectrum";
import TextEditor from "../TextEditor";
import { defaultLines } from "../utils";
import TabBar from "./TabBar";

const screenSize = isMobile ? window.innerWidth : window.innerHeight;
const spectrumContainerId = "spectrum-container";
const tabBarHeight = Math.max(window.innerHeight * 0.1, 60);
const bodyHeight = window.innerHeight - tabBarHeight;

export default function Minter({ useClaim }: { useClaim?: boolean }) {
  const [spectrumScale, setSpectrumScale] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<
    "info" | "color" | "mint" | "text"
  >("info");
  const [color, setColor] = useState<string>();
  const [lines, setLines] = useState<Lines>([]);

  const spectrumScaleMultiplier =
    (isMobile ? 0.9 : 0.75) * (1 + spectrumScale) ** (isMobile ? 4 : 2);

  const spectrumSize = screenSize * spectrumScaleMultiplier;

  useEffect(() => {
    setLines(defaultLines(color, 0));
  }, [color]);

  useEffect(() => {
    setLines(defaultLines(color, 0));
  }, [color]);

  const mint = useCallback(() => {
    // Only send `text` param if text != defaultLines
    console.log("MINT");
  }, []);

  const claim = useCallback(() => {
    // Only send `text` param if text != defaultLines
    console.log("CLAIM");
  }, []);

  // const scrollSpectrumContainer = useCallback(() => {
  //   const x = Math.max(spectrumSize - window.innerWidth, 0) / -2
  //   document.getElementById(spectrumContainerId)?.scrollBy(200, 200);
  // }, [spectrumSize, window.innerWidth]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {selectedTab === "info" && (
        <div
          style={{
            margin: "0 auto",
            maxWidth: 480,
            padding: 20,
            paddingBottom: tabBarHeight + 40,
          }}
        >
          <Info />
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
              <Spectrum color={color} onSelectColor={setColor} />
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
              flexWrap: "wrap-reverse",
              gap: isMobile ? 30 : 50,
              minHeight: isMobile ? 750 : 0,
            }}
          >
            <TextEditor lines={lines} setLines={setLines} />

            <div style={{ padding: isMobile ? 10 : 0 }}>
              <Capsule text={lines} color={color} size={320} />
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
          <Capsule text={lines} color={color} size={320} />

          {useClaim ? (
            <Button
              text="Claim Capsule"
              size="large"
              onClick={claim}
              style={{ margin: "0 auto" }}
            />
          ) : (
            <Button
              text="Mint Capsule (0.1 ETH)"
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
          tabs={[
            { key: "info", title: "Capsules" },
            { key: "color", title: "1. " + (color ?? "Color"), color },
            { key: "text", title: "2. Text" },
            { key: "mint", title: "3. Mint" },
          ]}
          selectedTab={selectedTab}
          onClickTab={setSelectedTab}
          disabledTabs={color ? undefined : ["mint", "text"]}
        />
      </div>
    </div>
  );
}
