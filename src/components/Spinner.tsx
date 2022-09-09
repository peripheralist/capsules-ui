import { CSSProperties, useEffect, useMemo, useState } from "react";

export default function Spinner({ style }: { style?: CSSProperties }) {
  const [charIdx, setCharIdx] = useState<number>(0);

  // const charOpts = useMemo(() => ["", "☰", "", ""], []); // lines
  // const charOpts = useMemo(() => ["", "", "", ""], []); // corners
  const charOpts = useMemo(() => ["", "", "", ""], []); // orbital

  useEffect(() => {
    const interval = setInterval(() => {
      setCharIdx((idx) => (idx + 1) % charOpts.length);
    }, 190);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [charOpts]);

  return <div style={style}>{charOpts[charIdx]}</div>;
}
