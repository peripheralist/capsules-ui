import { CSSProperties, useEffect, useState } from "react";
import { isMobile } from "../constants/isMobile";
import { charGroups } from "../constants/orderedUnicodes";
import { unicodeNames } from "../fonts/unicode";
import GlyphElem from "./GlyphElem";
import Modal from "./Modal";

export default function GlyphPicker({
  onClickGlyph,
}: {
  onClickGlyph?: {
    onClick?: (glyph: string) => void;
    copy?: boolean;
    close?: boolean;
  };
}) {
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
        ...charGroups.smallCaps,
        ...charGroups.digits,
        ...charGroups.punctuationSymbols,
        ...charGroups.math,
        ...charGroups.geometry,
        ...charGroups.currencies,
        ...charGroups.specials,
        ...charGroups.arrows,
        ...charGroups.custom,
        ...charGroups.others,
      ]);
  }, [searchText]);

  const gap: CSSProperties["padding"] = isMobile ? "1rem" : "2rem";

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={() => setModalVisible(true)}>
        [☺]
      </div>

      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        centered
        shaded
      >
        <div
          style={{
            background: "black",
            width: "36rem",
            maxWidth: "96vw",
            boxSizing: "border-box",
            height: "80vh",
            maxHeight: 600,
            overflow: "auto",
            margin: "0 auto",
            padding: gap,
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
              marginBottom: gap,
              fontSize: "1.25rem",
            }}
            placeholder="Search glyphs"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25rem",
              justifyContent: "center",
              fontWeight: 400,
            }}
          >
            {results.map((x) => (
              <GlyphElem
                key={x}
                style={{
                  fontSize: isMobile ? "1rem" : "2rem",
                  width: isMobile ? "1.5rem" : "3rem",
                }}
                charCode={x}
                includeCode={!!searchText || !isMobile}
                copyOnClick={onClickGlyph?.copy}
                onClickGlyph={(glyph) => {
                  onClickGlyph?.onClick?.(glyph);

                  if (onClickGlyph?.close) {
                    setTimeout(
                      () => {
                        setModalVisible(false);
                      },
                      isMobile ? 750 : 500
                    );
                  }
                }}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
