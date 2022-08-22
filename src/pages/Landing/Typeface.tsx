import GlyphElem from "../../components/GlyphElem";
import WeightSelector from "../../components/WeightSelector";
import { isMobile } from "../../constants/isMobile";
import { charGroups } from "../../constants/orderedUnicodes";

export default function Typeface({
  weight,
  setWeight,
}: {
  weight: number;
  setWeight: (w: number) => void;
}) {
  const GlyphSection = (chars: number[]) => (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: isMobile ? "0.5rem" : "1rem",
      }}
    >
      {chars.map((x) => (
        <GlyphElem
          key={x}
          charCode={x}
          style={{
            fontSize: isMobile ? "1rem" : "3rem",
            width: isMobile ? "1.5rem" : "5rem",
            fontWeight: weight,
          }}
          includeCode={!isMobile}
        />
      ))}
    </div>
  );

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Capsules Typeface</h1>

      <div
        style={{
          position: "sticky",
          zIndex: 20,
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          background: "#000",
          paddingBottom: 20,
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <WeightSelector selectedWeight={weight} onSelectWeight={setWeight} />
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <a href="/CapsulesTypeface.zip" download="CapsulesTypeface">
           Download
        </a>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "3rem" : "6rem",
          margin: "0 auto",
          paddingTop: 50,
          paddingBottom: 50,
        }}
      >
        {GlyphSection(charGroups.uppercase)}
        {GlyphSection(charGroups.lowercase)}
        {GlyphSection(charGroups.specials)}
        {GlyphSection(charGroups.digits)}
        {GlyphSection(charGroups.punctuationSymbols)}
        {GlyphSection(charGroups.math)}
        {GlyphSection(charGroups.currencies)}
        {GlyphSection(charGroups.arrows)}
        {GlyphSection(charGroups.custom)}
        {GlyphSection(charGroups.others)}
      </div>
    </div>
  );
}
