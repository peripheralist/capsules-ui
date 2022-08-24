import { CSSProperties, useEffect, useMemo, useState } from "react";

export default function Spinner({ style }: { style?: CSSProperties }) {
  const [charIdx, setCharIdx] = useState<number>(0);
  const [interval, _setInterval] = useState<NodeJS.Timer>();

  const charOpts = useMemo(() => ["", "☰", "", ""], []);
  // const charOpts = useMemo(() => ["", "", "", ""], []);

  useEffect(() => {
    if (interval) return;

    _setInterval(
      setInterval(() => {
        setCharIdx((idx) => (idx + 1) % charOpts.length);
      }, 250)
    );

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [interval, charOpts]);

  return <div style={style}>{charOpts[charIdx]}</div>;
}
