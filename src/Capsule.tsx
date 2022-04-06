import { Lines } from "./models/lines";
import { CSSProperties, useMemo } from "react";
import { defaultLines } from "./utils";
import { maxLineLength } from "./constants/lines";
import { fontCapsulesRegular } from "./fonts/base64/Capsules-Regular";

export default function Capsule({
  text,
  color,
  width,
  height,
  preserveAspectRatio,
  id,
  owner,
}: {
  text: Lines;
  color: string | undefined;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  preserveAspectRatio?: React.SVGAttributes<SVGElement>["preserveAspectRatio"];
  id?: number;
  owner?: string | null;
}) {
  const x = 10;
  const y = 48;
  const r = 1.5;
  const border = 0;

  const _color = color ?? "#fff";

  const dots1x12: string = useMemo(() => {
    let str = "";
    for (let i = 0; i < 12; i++) {
      str += `<circle cx="2" cy="${4 * i + 2}" r="${r}"></circle>`;
    }
    return str;
  }, []);

  const dots5x12: string = useMemo(() => {
    let str = "";
    for (let i = 0; i < 5; i++) {
      str += `<use xlink:href="#dots1x12" transform="translate(${
        4 * i
      } 0)"></use>`;
    }
    return str;
  }, []);

  const _text = text.every((l) => !l.length)
    ? defaultLines(color, id ?? 0, owner ?? undefined)
    : text;

  const lineWidth: number = useMemo(
    () =>
      Math.min(
        _text.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0),
        maxLineLength
      ),
    [_text]
  );

  const rowId = "row" + lineWidth;

  const _width = lineWidth * 6 + 5;
  const _height = _text.length * 12 + 2;

  const row: string = useMemo(() => {
    let str = "";
    // 1 for each char
    let offset = 0;
    for (let i = 0; i < lineWidth; i++) {
      str += `<use xlink:href="#dots5x12" transform="translate(${offset} 0)"></use>`;
      offset += 20;
    }
    // 1 between each char, and on edges
    for (let i = 0; i < lineWidth + 5; i++) {
      str += `<use xlink:href="#dots1x12" transform="translate(${
        4 * i + offset
      } 0)"></use>`;
    }
    return str;
  }, [lineWidth]);

  const dots: string = useMemo(() => {
    // Top edge
    let str = "";

    for (let i = 0; i < _text.length; i++) {
      str += `<use xlink:href="#${rowId}" transform="translate(0 ${
        y * i
      })"></use>`;
    }

    // Bottom edge
    for (let i = 0; i < _width; i++) {
      str += `<circle cx="${4 * i + 2}" cy="${
        _text.length * y + 2
      }"  r="${r}"></circle>`;
    }
    for (let i = 0; i < _width; i++) {
      str += `<circle cx="${4 * i + 2}" cy="${
        _text.length * y + 6
      }"  r="${r}"></circle>`;
    }

    return str;
  }, [_text.length, rowId, _width]);

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${_width * 4 + border * 2} ${_height * 4 + border * 2}`}
        preserveAspectRatio={preserveAspectRatio ?? "xMidYMid meet"}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <g id="dots1x12" dangerouslySetInnerHTML={{ __html: dots1x12 }}></g>
          <g id="dots5x12" dangerouslySetInnerHTML={{ __html: dots5x12 }}></g>
          <g id={rowId} dangerouslySetInnerHTML={{ __html: row }}></g>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="#000"></rect>
        <g
          fill={_color}
          opacity="0.25"
          dangerouslySetInnerHTML={{ __html: dots }}
          transform={`translate(${border} ${border})`}
        ></g>

        <g fill={_color} transform={`translate(${x + border} ${44 + border})`}>
          {_text.map((line, i) => (
            <text y={y * i} className="capsule" key={i}>
              {line.substring(0, maxLineLength)}
            </text>
          ))}
        </g>

        <style>
          {`.capsule {
            font-family: Capsule;
            font-size: 40px;
            white-space: pre;
          }
          
          #edition {
            font-size: 12.5px;
          }

          @font-face {
            font-family: 'Capsule';
            font-style: normal;
            font-weight: normal;
            src: url(${fontSrc})
          }`}
        </style>
      </svg>
    </div>
  );
}

const fontSrc =
  "data:font/truetype;charset=utf-8;base64," + fontCapsulesRegular;
