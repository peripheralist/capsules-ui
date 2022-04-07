import { Text } from "./models/text";
import { CSSProperties, useMemo } from "react";
import { defaultText, isEmptyText } from "./utils";
import { maxLineLength } from "./constants/text";
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
  text: Text;
  color: string | undefined;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  preserveAspectRatio?: React.SVGAttributes<SVGElement>["preserveAspectRatio"];
  id?: number;
  owner?: string | null;
}) {
  const canvasPaddingXDots = 3;
  const charWidthDots = 5;
  const charHeightDots = 12;
  const gridSize = 4;
  const marginXDots = 3;
  const lineHeight = 48;
  const r = 1.5;

  const _color = color ?? "#fff";

  const dots1x12: string = useMemo(() => {
    let str = "";
    for (let x = 0; x < 12; x++) {
      str += `<circle cx="${gridSize / 2}" cy="${
        gridSize * x + gridSize / 2
      }" r="${r}"></circle>`;
    }
    return str;
  }, []);

  const _text = isEmptyText(text)
    ? defaultText(color, id ?? 0, owner ?? undefined)
    : text;

  const longestLine: number = useMemo(
    () =>
      Math.min(
        _text.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0),
        maxLineLength
      ),
    [_text]
  );

  const rowId = "row" + longestLine;
  const textRowId = "textRow" + longestLine;

  const canvasWidthDots =
    longestLine * charWidthDots + (longestLine - 1) + canvasPaddingXDots * 2;
  const canvasHeightDots = _text.length * charHeightDots + 2;

  // Dot height row of dots
  const rowDots: string = useMemo(() => {
    let str = "";
    for (let i = 0; i < canvasWidthDots; i++) {
      str += `<circle cx="${gridSize * i + gridSize / 2}" cy="${
        gridSize / 2
      }" r="${r}"></circle>`;
    }
    return str;
  }, [canvasWidthDots]);

  // Text height row of dots
  const textRowDots: string = useMemo(() => {
    let str = "";

    for (let i = 0; i < canvasWidthDots; i++) {
      str += `<use xlink:href="#dots1x12" transform="translate(${
        i * gridSize
      } 0)"></use>`;
    }

    return str;
  }, [longestLine]);

  const dots: string = useMemo(() => {
    // Top edge
    let str = `<use xlink:href="#${rowId}"></use>`;

    for (let y = 0; y < _text.length; y++) {
      str += `<use xlink:href="#${textRowId}" transform="translate(0 ${
        lineHeight * y + gridSize
      })"></use>`;
    }

    // Bottom edge
    str += `<use xlink:href="#${rowId}" transform="translate(0 ${
      (canvasHeightDots - 1) * gridSize
    })"></use>`;

    return str;
  }, [_text.length, rowId, canvasHeightDots]);

  return (
    <div
      style={{
        width,
        height: height ?? width,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${canvasWidthDots * gridSize} ${
          canvasHeightDots * gridSize
        }`}
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
          opacity="0.25"
          dangerouslySetInnerHTML={{ __html: dots }}
        ></g>

        <g
          fill={_color}
          transform={`translate(${(marginXDots - 0.5) * gridSize} 44)`}
        >
          {_text.map((line, i) => (
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
            src: url(${fontSrc})
          }`}
        </style>
      </svg>
    </div>
  );
}

const fontSrc =
  "data:font/truetype;charset=utf-8;base64," + fontCapsulesRegular;
