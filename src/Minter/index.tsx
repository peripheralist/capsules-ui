import { useCallback, useEffect, useState } from "react";
import Capsule from "../Capsule";
import Button from "../components/Button";
import { isMobile } from "../constants/isMobile";

import { Lines } from "../models/lines";
import Spectrum from "../Spectrum";
import TextEditor from "../TextEditor";
import { defaultLines } from "../utils";
import TabBar, { Tab } from "./TabBar";

const screenSize = isMobile ? window.innerWidth : window.innerHeight;

export default function Minter({ useClaim }: { useClaim?: boolean }) {
  const [spectrumScale, setSpectrumScale] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<Tab>("color");
  const [color, setColor] = useState<string>();
  const [lines, setLines] = useState<Lines>([]);

  const spectrumScaleMultiplier =
    (isMobile ? 0.9 : 0.75) * (1 + spectrumScale) ** (isMobile ? 4 : 2);

  const spectrumSize = screenSize * spectrumScaleMultiplier;

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

  return (
    <div>
      {selectedTab === "color" && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: "90vh",
              width: "100vw",
              overflow: "auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                paddingTop: "5%",
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
              bottom: 10,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
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
          </div>
        </div>
      )}

      {selectedTab === "text" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 50,
            height: screenSize,
            width: screenSize,
          }}
        >
          <TextEditor lines={lines} setLines={setLines} />

          <Capsule text={lines} color={color} size={360} />
        </div>
      )}

      {selectedTab === "mint" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 50,
            height: screenSize,
            width: screenSize,
          }}
        >
          <Capsule text={lines} color={color} size={360} />

          {useClaim ? (
            <Button text="Claim" onClick={claim} style={{ margin: "0 auto" }} />
          ) : (
            <Button
              text="Mint (0.1 ETH)"
              onClick={mint}
              style={{ margin: "0 auto" }}
            />
          )}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 10,
          width: "100vw",
          textAlign: "center",
          background: "black",
        }}
      >
        <TabBar
          color={color}
          selectedTab={selectedTab}
          onClickTab={setSelectedTab}
          disabledTabs={color ? undefined : ["mint", "text"]}
        />
      </div>
    </div>
  );
}
