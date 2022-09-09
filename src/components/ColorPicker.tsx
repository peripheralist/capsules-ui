import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { hexToRgb, RESERVED_COLORS, rgbToHex } from "../constants/colors";
import { isMobile } from "../constants/isMobile";
import { CapsulesContext } from "../contexts/capsulesContext";
import { RGB } from "../models/rgb";
import Spectrum from "../Spectrum";

const screenSize = isMobile ? window.innerWidth : window.innerHeight;

const spectrumScaleMultiplier = (scale: number) =>
  (isMobile ? 0.9 : 1.05) * (1 + scale) ** (isMobile ? 4 : 2);

export default function ColorPicker({
  color,
  onDone,
}: {
  color: string | undefined;
  onDone: (color: string | undefined) => void;
}) {
  const [_color, setColor] = useState<string>();
  const { mintedColors } = useContext(CapsulesContext);
  const [mode, setMode] = useState<"spectrum" | "code">("spectrum");
  const [spectrumScale, setSpectrumScale] = useState<number>(0);
  const [rgb, setRgb] = useState<RGB>();

  const allByteValues = useMemo(() => {
    const vals = [];
    for (let i = 0; i <= 255; i += 5) {
      vals.push(i);
    }
    return vals;
  }, []);

  useEffect(() => {
    if (mode !== "code" || !rgb) return;
    setTimeout(() => {
      document.getElementById("r" + rgb.r)?.scrollIntoView();
    }, 0);
    setTimeout(() => {
      document.getElementById("g" + rgb.g)?.scrollIntoView();
    }, 100);
    setTimeout(() => {
      document.getElementById("b" + rgb.b)?.scrollIntoView();
    }, 200);
  }, [rgb, mode]);

  const spectrumSize = screenSize * spectrumScaleMultiplier(spectrumScale);

  useEffect(() => {
    setColor(color);
  }, [color]);

  useEffect(() => {
    if (!_color?.length) return;
    setRgb(hexToRgb(_color));
  }, [_color]);

  const byteScroller = useCallback(
    (opt: "r" | "g" | "b") => {
      if (!rgb || !mintedColors) return null;

      // True if only 1 RGB byte == FF
      const lockFF = Object.values(rgb).filter((v) => v === 255).length === 1;

      return (
        <div
          className="hidden-scrollbar"
          style={{
            maxHeight: 300,
            overflow: "scroll",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            fontSize: "2rem",
          }}
        >
          {(rgb[opt] === 255 && lockFF ? [255] : allByteValues).map((val) => {
            const hexValue = rgbToHex({ ...rgb, [opt]: val });
            const key = opt + val;
            const disabled = [...mintedColors, ...RESERVED_COLORS]?.includes(
              hexValue
            );
            return (
              <div
                id={key}
                key={key}
                style={{
                  fontWeight: disabled ? 100 : rgb[opt] === val ? 700 : 300,
                  cursor: disabled ? "default" : "crosshair",
                  color: hexValue,
                  opacity: disabled ? 0.4 : 1,
                  userSelect: "none",
                }}
                onClick={disabled ? undefined : () => setColor(hexValue)}
              >
                {val.toString(16).padStart(2, "0")}
              </div>
            );
          })}
        </div>
      );
    },
    [rgb, allByteValues, mintedColors]
  );

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          top: 0,
          left: 0,
          right: 0,
          padding: isMobile ? "2rem" : "2rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setMode("spectrum")}
          >
            {mode === "spectrum" ? "" : ""} Spectrum
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => setMode("code")}>
            {mode === "code" ? "" : ""} Code
          </div>
        </div>

        {isMobile ? (
          <div
            style={{
              display: "inline-flex",
              gap: "2rem",
              fontSize: "3rem",
              fontWeight: 600,
              lineHeight: "3rem",
            }}
          >
            <div onClick={() => onDone(color)}>×</div>
            <div onClick={() => onDone(_color)}>✓</div>
          </div>
        ) : (
          <div>
            <div
              style={{ cursor: "pointer", fontWeight: 600 }}
              onClick={() => onDone(_color)}
            >
              ✓ Save
            </div>
            <div
              style={{ cursor: "pointer", fontWeight: 600 }}
              onClick={() => onDone(color)}
            >
              × Cancel
            </div>
          </div>
        )}
      </div>

      {mode === "spectrum" && (
        <div
          style={{
            height: "100%",
            maxHeight: "100%",
            width: "100%",
            maxWidth: "100%",
            overflow: "auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              paddingLeft: "5%",
              paddingRight: "5%",
              boxSizing: "border-box",
              paddingTop: isMobile ? "30vh" : "5%",
              height: spectrumSize * 0.866,
              width: spectrumSize,
            }}
          >
            <Spectrum
              color={_color}
              onSelectColor={setColor}
              inactiveColors={[...RESERVED_COLORS, ...(mintedColors ?? [])]}
            />
          </div>
        </div>
      )}

      {mode === "spectrum" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 30,
            textAlign: "center",
          }}
        >
          {isMobile ? (
            <div
              style={{
                display: "inline-flex",
                justifyContent: "space-between",
                width: 120,
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
      )}

      {mode === "code" && rgb && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: isMobile ? "flex-end" : "center",
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <div style={{ padding: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  marginTop: isMobile ? "2rem" : "3rem",
                  fontSize: "3rem",
                  color: _color,
                  width: 0,
                  marginLeft: "-2rem",
                  marginRight: "2rem",
                }}
              >
                #
              </div>

              <div>
                <div style={{ height: isMobile ? "2rem" : "3rem" }}>R</div>
                <div style={{ color: _color, fontSize: "3rem" }}>
                  {_color?.substring(1, 3)}
                </div>
                {byteScroller("r")}
              </div>
              <div>
                <div style={{ height: isMobile ? "2rem" : "3rem" }}>G</div>
                <div style={{ color: _color, fontSize: "3rem" }}>
                  {_color?.substring(3, 5)}
                </div>
                {byteScroller("g")}
              </div>
              <div>
                <div style={{ height: isMobile ? "2rem" : "3rem" }}>B</div>
                <div style={{ color: _color, fontSize: "3rem" }}>
                  {_color?.substring(5)}
                </div>
                {byteScroller("b")}
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <span>Color needs at least one "ff" value</span>
          </div>
        </div>
      )}
    </div>
  );
}
