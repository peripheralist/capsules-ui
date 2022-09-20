import { CSSProperties, useMemo } from "react";
import { bytesToColorString } from "../constants/colors";
import { formatHistoricalDate } from "../utils/date";
import FormattedAddress from "./FormattedAddress";
import SVGURIRenderer from "./SVGURIRenderer";

export default function CapsulePreview({
  uri,
  color,
  owner,
  href,
  lastEditedTimestamp,
  imgStyle,
  style,
}: {
  uri: string;
  color: string;
  owner: string;
  href?: string;
  lastEditedTimestamp: number;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
}) {
  const _color = bytesToColorString(color);

  let formattedDate = formatHistoricalDate(lastEditedTimestamp);
  if (formattedDate.toLowerCase() === "now") formattedDate = "just now";
  else formattedDate += " ago";

  const ImgElem = useMemo(
    () => <SVGURIRenderer uri={uri} style={imgStyle} />,
    [uri, imgStyle]
  );

  return (
    <div style={{ color: _color, ...style }}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {ImgElem}
        </a>
      ) : (
        ImgElem
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: ".8rem",
          cursor: "crosshair",
        }}
      >
        <span>{formattedDate}</span>
        <span style={{ display: "flex", gap: "1rem" }}>
          <FormattedAddress address={owner} align="right" />
          {_color}
        </span>
      </div>
    </div>
  );
}
