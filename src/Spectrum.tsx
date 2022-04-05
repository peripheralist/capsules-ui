import { useCallback, useMemo } from "react";

import { auctionColors } from "./constants/auctionColors";
import { isMobile } from "./constants/isMobile";
import { RGB } from "./models/rgb";
import { rgbToHex } from "./utils";

export default function Spectrum({
  onSelectColor,
  color,
}: {
  onSelectColor: (color: string) => void;
  color: string | undefined;
}) {
  const rows1 = useMemo(() => {
    let _rows: RGB[][] = [];

    for (let g = 0; g < 255; g += 5) {
      let _row: RGB[] = [];

      for (let r = 255; r > 0; r -= 5) {
        for (let b = 0; b < 255; b += 5) {
          if (r === 255 || b === 255 || g === 255) _row.push({ r, g, b });
        }
      }

      _rows.push(_row);
    }

    return _rows;
  }, []);

  const rows2 = useMemo(() => {
    let _rows: RGB[][] = [];

    for (let g = 0; g < 255; g += 5) {
      let _row: RGB[] = [];

      for (let b = 255; b >= 0; b -= 5) {
        for (let r = 0; r <= 255; r += 5) {
          if (r === 255 || b === 255 || g === 255) _row.push({ r, g, b });
        }
      }

      _rows.push(_row.reverse().slice(51));
    }

    return _rows;
  }, []);

  const rows3 = useMemo(() => {
    let _rows: RGB[][] = [];

    for (let r = 255; r >= 0; r -= 5) {
      let _row: RGB[] = [];

      for (let g = 255; g >= 0; g -= 5) {
        for (let b = 0; b <= 255; b += 5) {
          if (r === 255 || b === 255 || g === 255) _row.push({ r, g, b });
        }
      }

      _rows.push(_row.slice(0, 51));
    }

    return _rows;
  }, []);

  const row = useMemo(() => {
    let _row: { r: number; g: number; b: number }[] = [];
    for (let r = 255; r >= 0; r -= 5) {
      _row.push({ r, g: 255, b: 255 });
    }
    return _row;
  }, []);

  // const allHexes = useMemo(() => {
  //   const all = [...rows1, ...rows2, ...rows3, row].flatMap((r) =>
  //     r.flatMap((rgb) => rgbToHex(rgb))
  //   );

  //   console.log("all", {
  //     red: all.filter((c) => hueForColor(c) === "red").length,
  //     pink: all.filter((c) => hueForColor(c) === "pink").length,
  //     blue: all.filter((c) => hueForColor(c) === "blue").length,
  //     cyan: all.filter((c) => hueForColor(c) === "cyan").length,
  //     green: all.filter((c) => hueForColor(c) === "green").length,
  //     yellow: all.filter((c) => hueForColor(c) === "yellow").length,
  //     white: all.filter((c) => hueForColor(c) === "white").length,
  //   });
  // }, []);

  // function isValidHex(x: BigNumber): boolean {
  //   const str = utils.hexZeroPad(x.toHexString(), 6).split("0x")[1];
  //   const parts = [str.slice(0, 2), str.slice(2, 4), str.slice(4)];

  //   if (
  //     parts.every((p) => BigNumber.from("0x" + p).lt(255)) ||
  //     parts.some(
  //       (p) =>
  //         !BigNumber.from("0x" + p)
  //           .mod(5)
  //           .isZero()
  //     )
  //   ) {
  //     return false;
  //   }

  //   return true;
  // }

  // useEffect(() => {
  //   console.log("asdf", allHexes.length, allHexes.sort());
  // }, []);

  const className = useCallback(
    (c: RGB) =>
      `${auctionColors.includes(rgbToHex(c)) ? "x" : ""} ${
        color === rgbToHex(c) ? "active" : ""
      }`,
    [color]
  );

  const circleProps: (c: RGB) => React.SVGProps<SVGCircleElement> = useCallback(
    (c: RGB) => ({
      fill: rgbToHex(c),
      className: className(c),
      ...(auctionColors.includes(rgbToHex(c))
        ? {
            r: 1,
            opacity: 0.75,
          }
        : {
            r: 1.5,
            opacity: 1,
            onClick: () => onSelectColor(rgbToHex(c)),
          }),
    }),
    [className, onSelectColor]
  );

  const Svg = useMemo(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 365"
        style={{ cursor: "crosshair" }}
      >
        <style>
          {`
          ${isMobile ? "" : "circle:not(.x):hover, "}circle.active {
            opacity: 1;
            r: 3.5px;
            strokeWidth: 0px;
          }`}
        </style>

        <g transform="translate(2 4)">
          <g transform="translate(102 0)">
            {rows1.map((r, y) =>
              r.map((c, x) => (
                <circle
                  cx={x * 4 - y * 2}
                  cy={y * 3.5}
                  key={rgbToHex(c)}
                  {...circleProps(c)}
                />
              ))
            )}
          </g>

          <g transform="translate(306 0)">
            {rows2.map((r, y) =>
              r.map((c, x) => (
                <circle
                  cx={x * 2 - y * 2}
                  cy={(y + x) * 3.5}
                  key={rgbToHex(c)}
                  {...circleProps(c)}
                />
              ))
            )}
          </g>

          <g transform="translate(204 178.5)">
            {row.map((c, i) => (
              <circle
                cx={i * 2}
                cy={i * 3.5}
                key={rgbToHex(c)}
                {...circleProps(c)}
              />
            ))}
          </g>

          <g transform="translate(0 178.5)">
            {rows3.map((r, y) =>
              r.map((c, x) => (
                <circle
                  cx={x * 4 + y * 2}
                  cy={y * 3.5}
                  key={rgbToHex(c)}
                  {...circleProps(c)}
                />
              ))
            )}
          </g>
        </g>
      </svg>
    ),
    [row, rows1, rows2, rows3, circleProps]
  );

  return Svg;
}
