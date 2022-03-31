import { CSSProperties, useMemo } from "react";

export default function Button({
  text,
  href,
  onClick,
  size,
  style,
}: {
  text: string;
  href?: string;
  onClick?: VoidFunction;
  size?: "large" | "small";
  style?: CSSProperties;
}) {
  const defaultStyle: CSSProperties = {
    display: "block",
    fontSize: "1.5rem",
    textAlign: "center",
    cursor: "pointer",
    paddingTop: 10,
    paddingBottom: 10,
  };

  const child = useMemo(
    () => (
      <>
        {/* <div style={{ fontSize: size === "small" ? "0.6rem" : "0.8rem" }}>
          ———————————————————————————————————————————
        </div> */}
        <div
          style={{
            fontSize: size === "small" ? "1.2rem" : "1.6rem",
            textTransform: "uppercase",
          }}
        >
          {text}
        </div>
        {/* <div style={{ fontSize: size === "small" ? "0.6rem" : "0.8rem" }}>
          ———————————————————————————————————————————
        </div> */}
      </>
    ),
    [text]
  );

  if (href) {
    return (
      <a href={href} style={{ ...defaultStyle, ...style }}>
        {child}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} style={{ ...defaultStyle, ...style }}>
        {child}
      </button>
    );
  }

  return null;
}
