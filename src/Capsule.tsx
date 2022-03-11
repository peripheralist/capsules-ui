import { Scheme } from "./models/schemes";
import { Lines } from "./models/lines";
import { useMemo } from "react";

export default function Capsule({
  note,
  scheme,
  size,
}: {
  note: Lines;
  scheme: Scheme;
  size: number;
}) {
  const x = 18;
  const y = 52;

  const color = (scheme: Scheme) => {
    switch (scheme) {
      case "white":
        return "#fff";
      case "cyan":
        return "#0ff";
      case "pink":
        return "#f0f";
      case "yellow":
        return "#ff0";
    }
  };

  const dots10x1: string = useMemo(() => {
    let str = "";
    for (let i = 0; i < 10; i++) {
      str += `<circle cx="${4 * i + 2}" cy="2" r="1.5"></circle>`;
    }
    return str;
  }, []);

  const dots100x1: string = useMemo(() => {
    let str = "";
    for (let i = 0; i < 10; i++) {
      str += `<use xlink:href="#dots10x1" transform="translate(${
        40 * i
      } 0)"></use>`;
    }
    return str;
  }, []);

  const dots100x10: string = useMemo(() => {
    let str = "";
    for (let i = 0; i < 10; i++) {
      str += `<use xlink:href="#dots100x1" transform="translate(0 ${
        4 * i
      })"></use>`;
    }
    return str;
  }, []);

  const dots: string = useMemo(() => {
    let str = "";
    for (let i = 0; i < 10; i++) {
      str += `<use xlink:href="#dots100x10" transform="translate(0 ${
        40 * i
      })"></use>`;
    }
    return str;
  }, []);

  return (
    <div>
      <div style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 400 400`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <g id="dots10x1" dangerouslySetInnerHTML={{ __html: dots10x1 }}></g>
            <g
              id="dots100x1"
              dangerouslySetInnerHTML={{ __html: dots100x1 }}
            ></g>
            <g
              id="dots100x10"
              dangerouslySetInnerHTML={{ __html: dots100x10 }}
            ></g>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="#000"></rect>
          <g
            fill={color(scheme)}
            opacity="0.25"
            dangerouslySetInnerHTML={{ __html: dots }}
          ></g>

          <g fill={color(scheme)} transform={`translate(${x} 0)`}>
            <text y={y * 1} className="capsule">
              {note[0]}
            </text>
            <text y={y * 2} className="capsule">
              {note[1]}
            </text>
            <text y={y * 3} className="capsule">
              {note[2]}
            </text>
            <text y={y * 4} className="capsule">
              {note[3]}
            </text>
            <text y={y * 5} className="capsule">
              {note[4]}
            </text>
            <text y={y * 6} className="capsule">
              {note[5]}
            </text>
            <text y={y * 7} className="capsule">
              {note[6]}
            </text>
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
    </div>
  );
}

const fontSrc =
  "data:font/truetype;charset=utf-8;base64,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";
