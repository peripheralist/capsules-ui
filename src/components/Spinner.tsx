import { CSSProperties, useEffect, useMemo, useState } from "react";

const CHARSETS = {
  orbitalR: ["", "", "", ""],
  orbitalL: ["", "", "", ""],
  // hourglass: ["", "", "", ""],
  hourglass: ["", "", "", "⋈"],
  bars: ["☰", "", "", ""],
  lineR: ["|", "/", "—", "\\"],
  lineL: ["|", "\\", "—", "/"],
};

type SpinnerType = keyof typeof CHARSETS;

const INTERVALS: Record<SpinnerType, number> = {
  orbitalR: 190,
  orbitalL: 190,
  hourglass: 250,
  bars: 250,
  lineR: 150,
  lineL: 150,
};

export default function Spinner({
  type = "orbitalR",
  style,
}: {
  type?: SpinnerType;
  style?: CSSProperties;
}) {
  const [charIdx, setCharIdx] = useState<number>(0);

  const charOpts = useMemo(() => CHARSETS[type], [type]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharIdx((idx) => (idx + 1) % charOpts.length);
    }, INTERVALS[type]);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [charOpts, type]);

  return <div style={style}>{charOpts[charIdx]}</div>;
}
