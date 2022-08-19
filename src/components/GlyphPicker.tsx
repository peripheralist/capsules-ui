import { useEffect, useState } from "react";
import { charGroups } from "../constants/orderedUnicodes";
import { unicodeNames } from "../fonts/unicode";
import GlyphElem from "./GlyphElem";

export default function GlyphPicker() {
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [searchText, setSearchText] = useState<string>();
  const [results, setResults] = useState<number[]>([]);

  useEffect(() => {
    if (searchText?.length) {
      setResults(
        Object.entries(unicodeNames)
          .filter(([k, v]) =>
            v.toLowerCase().includes((searchText ?? "").toLowerCase())
          )
          .map(([k, v]) => parseInt(k, 16))
      );
    } else
      setResults([
        ...charGroups.uppercase,
        ...charGroups.lowercase,
        ...charGroups.digits,
        ...charGroups.punctuationSymbols,
        ...charGroups.math,
        ...charGroups.currencies,
        ...charGroups.arrows,
        ...charGroups.custom,
        ...charGroups.others,
      ]);
  }, [searchText]);

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={() => setModalVisible(true)}>
        [@]
      </div>

      {modalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                background: "black",
                width: "31.5rem",
                maxWidth: "90vw",
                height: 480,
                overflow: "auto",
                zIndex: 1,
                margin: "0 auto",
                padding: "2rem",
                border: "1px solid white",
              }}
            >
              <input
                autoFocus
                style={{
                  border: "1px solid white",
                  padding: "1rem",
                  width: "100%",
                  boxSizing: "border-box",
                  marginBottom: "2rem",
                  fontSize: "1.25rem",
                }}
                placeholder="Search glyphs"
                onChange={(e) => setSearchText(e.target.value)}
              />

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {results.map((x) => (
                  <GlyphElem charCode={x} />
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#00000044",
            }}
            onClick={() => setModalVisible(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
