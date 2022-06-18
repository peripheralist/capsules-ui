import { charGroups } from "../constants/orderedUnicodes";
import { useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";
import { Weight } from "../models/weight";

export default function Loading({ weight }: { weight?: Weight }) {
  const [interval, _setInterval] = useState<NodeJS.Timer>();
  const [char, setChar] = useState<number>();

  const chars = [
    ...charGroups.arrows,
    ...charGroups.math,
    ...charGroups.custom,
    ...charGroups.others,
  ];

  useEffect(() => {
    _setInterval(
      setInterval(() => {
        setChar(chars[Math.floor(Math.random() * chars.length)]);
      }, 150)
    );

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  if (!char) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        fontWeight: weight,
      }}
      dangerouslySetInnerHTML={{ __html: "&#" + char + ";" }}
    ></div>
  );
}
