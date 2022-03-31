import { Lines } from "./models/lines";
import { CSSProperties, useMemo } from "react";

export default function Capsule({
  text,
  color,
  size,
}: {
  text: Lines;
  color: string | undefined;
  size: CSSProperties["width"];
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

  const lineWidth: number = useMemo(
    () =>
      text.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0),
    [text]
  );

  const rowId = "row" + lineWidth;

  const width = lineWidth * 6 + 5;
  const height = text.length * 12 + 2;

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

    for (let i = 0; i < text.length; i++) {
      str += `<use xlink:href="#${rowId}" transform="translate(0 ${
        y * i
      })"></use>`;
    }

    // Bottom edge
    for (let i = 0; i < width; i++) {
      str += `<circle cx="${4 * i + 2}" cy="${
        text.length * y + 2
      }"  r="${r}"></circle>`;
    }
    for (let i = 0; i < width; i++) {
      str += `<circle cx="${4 * i + 2}" cy="${
        text.length * y + 6
      }"  r="${r}"></circle>`;
    }

    return str;
  }, [text.length, rowId, width]);

  return (
    <div style={{ width: size }}>
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
          {text.map((line, i) => (
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
            src: url(${fontSrc})
          }`}
        </style>
      </svg>
    </div>
  );
}

const fontSrc =
  "data:font/truetype;charset=utf-8;base64,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";
