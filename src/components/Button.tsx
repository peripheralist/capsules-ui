import { CSSProperties, useMemo } from "react";

export default function Button({
  text,
  href,
  onClick,
  size,
  style,
  isDisabled,
  underline,
}: {
  text: string;
  href?: string;
  onClick?: VoidFunction;
  size?: "large" | "medium" | "small";
  style?: CSSProperties;
  isDisabled?: boolean;
  underline?: boolean;
}) {
  const fontSize = useMemo(() => {
    switch (size) {
      case "small":
        return "1rem";
      case "large":
        return "1.4rem";
      case "medium":
      default:
        return "1.2rem";
    }
  }, [size]);

  const underlineStr = useMemo(() => {
    if (!underline) return null;

    let _underline = "";
    for (let i = 0; i < text.length; i++) {
      _underline += "_";
    }

    return _underline;
  }, [text, underline]);

  const defaultStyle: CSSProperties = {
    position: underline ? "relative" : "unset",
    display: "block",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    cursor: isDisabled ? "default" : "pointer",
    opacity: isDisabled ? 0.5 : 1,
    textTransform: "uppercase",
    fontSize,
    color: "#fff",
  };

  const child = useMemo(() => <div>⮕ {text}</div>, [text]);

  if (href) {
    return (
      <a href={href} style={{ ...defaultStyle, ...style }}>
        {child}

        {underline && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            {underlineStr}
          </div>
        )}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={{ ...defaultStyle, ...style }}>
      {child}

      {underline && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
          {underlineStr}
        </div>
      )}
    </button>
  );
}
