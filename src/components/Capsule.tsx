import { CSSProperties, useMemo } from "react";

import { maxLineLength } from "../constants/text";
import { FONTS } from "../fonts/fonts";
import { Text } from "../models/text";
import { Weight } from "../models/weight";
import { bytesToColorString, defaultText, isEmptyText } from "../utils";

export default function Capsule({
  text,
  color,
  weight,
  width,
  height,
  preserveAspectRatio,
  locked,
  square,
}: {
  text: Text;
  color: string | undefined;
  weight?: Weight;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  preserveAspectRatio?: React.SVGAttributes<SVGElement>["preserveAspectRatio"];
  locked?: boolean;
  square?: boolean;
}) {
  if (isEmptyText(text)) text = defaultText(color);

  const canvasPaddingXDots = 3;
  const charWidthDots = 5;
  const charHeightDots = 12;
  const gridSize = 4;
  const marginXDots = 3;
  const lineHeight = 48;
  const r = 1.5;

  const _color = color?.startsWith("0x")
    ? bytesToColorString(color)
    : color ?? "#fff";

  const dots1x12: string = useMemo(() => {
    let str = "";
    for (let x = 0; x < 12; x++) {
      str += `<circle cx="${gridSize / 2}" cy="${
        gridSize * x + gridSize / 2
      }" r="${r}"></circle>`;
    }
    return str;
  }, []);

  const longestLine: number = useMemo(
    () =>
      Math.min(
        text.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0),
        maxLineLength
      ),
    [text]
  );

  const rowId = (locked ? "rowL" : "row") + longestLine;
  const textRowId = "textRow" + longestLine;

  const textAreaWidthDots =
    longestLine * charWidthDots + (longestLine - 1) + canvasPaddingXDots * 2;
  const textAreaHeightDots = text.length * charHeightDots + 2;
  const canvasSizeDots = Math.max(textAreaWidthDots, textAreaHeightDots) + 2;

  // Dot height row of dots
  const rowDots: string = useMemo(() => {
    let str = "";
    // Cut off start and end dots
    for (
      let i = locked ? 1 : 0;
      i < textAreaWidthDots - (locked ? 1 : 0);
      i++
    ) {
      str += `<circle cx="${gridSize * i + gridSize / 2}" cy="${
        gridSize / 2
      }" r="${r}"></circle>`;
    }
    return str;
  }, [textAreaWidthDots, locked]);

  // Text height row of dots
  const textRowDots: string = useMemo(() => {
    let str = "";

    for (let i = 0; i < textAreaWidthDots; i++) {
      str += `<use xlink:href="#dots1x12" transform="translate(${
        i * gridSize
      } 0)"></use>`;
    }

    return str;
  }, [textAreaWidthDots]);

  const dots: string = useMemo(() => {
    // Top edge
    let str = `<use xlink:href="#${rowId}"></use>`;

    for (let y = 0; y < text.length; y++) {
      str += `<use xlink:href="#${textRowId}" transform="translate(0 ${
        lineHeight * y + gridSize
      })"></use>`;
    }

    // Bottom edge
    str += `<use xlink:href="#${rowId}" transform="translate(0 ${
      (textAreaHeightDots - 1) * gridSize
    })"></use>`;

    return str;
  }, [text.length, rowId, textRowId, textAreaHeightDots]);

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <svg
        viewBox={`0 0 ${
          (square ? canvasSizeDots : textAreaWidthDots) * gridSize
        } ${(square ? canvasSizeDots : textAreaHeightDots) * gridSize}`}
        preserveAspectRatio={preserveAspectRatio ?? "xMidYMid meet"}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <g id="dots1x12" dangerouslySetInnerHTML={{ __html: dots1x12 }}></g>
          <g id={rowId} dangerouslySetInnerHTML={{ __html: rowDots }}></g>
          <g
            id={textRowId}
            dangerouslySetInnerHTML={{ __html: textRowDots }}
          ></g>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="#000"></rect>
        <g
          fill={_color}
          opacity={0.2}
          dangerouslySetInnerHTML={{ __html: dots }}
          transform={
            square
              ? `translate(${
                  ((canvasSizeDots - textAreaWidthDots) / 2) * gridSize
                } ${((canvasSizeDots - textAreaHeightDots) / 2) * gridSize})`
              : undefined
          }
        />
        <g
          fill={_color}
          transform={
            square
              ? `translate(${
                  (marginXDots -
                    0.5 +
                    (canvasSizeDots - textAreaWidthDots) / 2) *
                  gridSize
                } ${
                  44 + ((canvasSizeDots - textAreaHeightDots) / 2) * gridSize
                })`
              : `translate(${(marginXDots - 0.5) * gridSize} 44)`
          }
        >
          {text.map((line, i) => (
            <text y={lineHeight * i} className="capsule" key={i}>
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

@font-face {
  font-family: 'Capsule';
  font-style: normal;
  font-weight: normal;
  src: url(data:font/truetype;charset=utf-8;base64,${FONTS[weight ?? 400]})
}`}
        </style>
      </svg>
    </div>
  );
}
