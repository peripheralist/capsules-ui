import { CSSProperties, useEffect, useMemo, useState } from "react";
import { clearInterval, setInterval } from "timers";

export default function Button({
  text,
  href,
  onClick,
  size,
  style,
  isDisabled,
  underline,
  loading,
}: {
  text: string;
  href?: string;
  onClick?: VoidFunction;
  size?: "large" | "medium" | "small";
  style?: CSSProperties;
  isDisabled?: boolean;
  underline?: boolean;
  loading?: string | boolean;
}) {
  const [loadingCharStartIndex, setLoadingCharStartIndex] = useState<number>(0);

  const defaultLoadingText = "...";

  const fontSize = useMemo(() => {
    switch (size) {
      case "small":
        return "1rem";
      case "large":
        return "1.7rem";
      case "medium":
      default:
        return "1.3rem";
    }
  }, [size]);

  const _text: string = useMemo(() => {
    if (loading) {
      return typeof loading === "string" ? loading : defaultLoadingText;
    }
    if (href) {
      // return text + " →";
      return text + " ▶";
    }
    return text;
  }, [text, href, loading]);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setLoadingCharStartIndex((idx) => (idx + 1) % _text.length);
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [loading, _text]);

  const underlineStr = useMemo(() => {
    if (!underline) return null;

    let _underline = "";
    for (let i = 0; i < _text.length; i++) {
      _underline += "_";
    }

    return _underline;
  }, [_text, underline]);

  const child = useMemo(
    () =>
      loading ? (
        <div>
          {_text.split("").map((char, i) => (
            <span
              key={char + i}
              style={{
                fontWeight:
                  [700, 600, 500, 400, 300, 200, 100][
                    (loadingCharStartIndex - i) % _text.length
                  ] || 100,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ) : (
        <div>{_text}</div>
      ),
    [_text, loading, loadingCharStartIndex]
  );

  const defaultStyle: CSSProperties = {
    position: underline ? "relative" : "unset",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    cursor: isDisabled ? "default" : "pointer",
    opacity: isDisabled ? 0.5 : 1,
    textTransform: "uppercase",
    fontSize,
    color: "#fff",
  };

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
