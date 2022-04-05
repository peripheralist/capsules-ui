import { Lines } from "./models/lines";
import { CSSProperties, useMemo } from "react";
import { defaultLines } from "./utils";

export default function Capsule({
  text,
  color,
  size,
  id,
}: {
  text: Lines;
  color: string | undefined;
  size: CSSProperties["width"];
  id?: number;
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
    ? defaultLines(color, id ?? 0)
    : text;

  const lineWidth: number = useMemo(
    () =>
      _text.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0),
    [_text]
  );

  const rowId = "row" + lineWidth;

  const width = lineWidth * 6 + 5;
  const height = _text.length * 12 + 2;

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
    for (let i = 0; i < width; i++) {
      str += `<circle cx="${4 * i + 2}" cy="${
        _text.length * y + 2
      }"  r="${r}"></circle>`;
    }
    for (let i = 0; i < width; i++) {
      str += `<circle cx="${4 * i + 2}" cy="${
        _text.length * y + 6
      }"  r="${r}"></circle>`;
    }

    return str;
  }, [_text.length, rowId, width]);

  return (
    <div
      style={{
        width: size,
        height: size,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${width * 4 + border * 2} ${height * 4 + border * 2}`}
        preserveAspectRatio="xMidYMid meet"
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
              {line}
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
  "data:font/truetype;charset=utf-8;base64,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";
