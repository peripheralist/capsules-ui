import { useEffect, useState } from "react";
import { isMobile } from "../constants/isMobile";
import { charGroups } from "../constants/orderedUnicodes";
import { unicodeNames } from "../fonts/unicode";
import GlyphElem from "./GlyphElem";
import Modal from "./Modal";

export default function GlyphPicker({
  onClickGlyph,
}: {
  onClickGlyph?: (char: string) => boolean | void;
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
            width: "32rem",
            maxWidth: "90vw",
            boxSizing: "border-box",
            height: "80vh",
            maxHeight: 600,
            overflow: "auto",
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

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            {results.map((x) => (
              <GlyphElem
                key={x}
                charCode={x}
                onClickGlyph={(glyph) => {
                  setTimeout(
                    () => {
                      setModalVisible(false);
                    },
                    isMobile ? 500 : 250
                  );

                  return onClickGlyph?.(glyph) ?? false;
                }}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
