import { CSSProperties } from "react";

export default function ColorHeader({
  text,
  style,
}: {
  text: string;
  style?: CSSProperties;
}) {
  const opacity = 1;

  const mixBlendMode: CSSProperties["mixBlendMode"] = "screen";

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        fontWeight: 400,
        padding: '0.1rem', // Padding avoids text wrapping. Hard to explain.
        ...style,
      }}
    >
      {/* magenta */}
      <div
        style={{
          position: "absolute",
          // top: "-3%",
          top: "-.1rem",
          // left: ".3%",
          left: ".05rem",
          color: "#ff00ff",
          opacity,
          mixBlendMode,
        }}
      >
        {text}
      </div>
      {/* blue */}
      {/* <div
        style={{
          position: "absolute",
          left: ".1rem",
          color: "#0000ff",
        }}
      >
        {text}
      </div> */}
      {/* cyan */}
      <div
        style={{
          position: "absolute",
          // top: "3%",
          top: ".1rem",
          // left: ".3%",
          left: ".1rem",
          color: "#00ffff",
          opacity,
          mixBlendMode,
        }}
      >
        {text}
      </div>
      {/* green */}
      {/* <div
        style={{
          position: "absolute",
          top: ".1rem",
          left: "-.05rem",
          color: "#00ff00",
        }}
      >
        {text}
      </div> */}
      {/* yellow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-.1rem",
          // left: "-.3%",
          color: "#ffff00",
          opacity,
          mixBlendMode,
        }}
      >
        {text}
      </div>
      {/* red */}
      {/* <div
        style={{
          position: "absolute",
          top: "-.1rem",
          left: "-.05rem",
          color: "#ff0000",
        }}
      >
        {text}
      </div> */}
      {/* <div
        style={{
          position: "absolute",
        }}
      >
        {text}
      </div> */}
      <div style={{ visibility: "hidden" }}>{text}</div>
    </div>
  );
}
