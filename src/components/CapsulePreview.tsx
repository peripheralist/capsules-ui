import { CSSProperties } from "react";
import { bytesToColorString } from "../constants/colors";
import { formatHistoricalDate } from "../utils/date";
import FormattedAddress from "./FormattedAddress";
import SVGURIRenderer from "./SVGURIRenderer";

export default function CapsulePreview({
  uri,
  color,
  owner,
  lastEditedTimestamp,
  imgStyle,
  style,
}: {
  uri: string;
  color: CSSProperties["color"];
  owner: string;
  lastEditedTimestamp: number;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
}) {
  const _color = bytesToColorString(color);

  return (
    <div style={{ color: _color, ...style }}>
      <SVGURIRenderer uri={uri} style={imgStyle} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: ".8rem",
          // fontWeight: 300,
        }}
      >
        <span>{formatHistoricalDate(lastEditedTimestamp)} ago</span>
        <span style={{ display: "flex", gap: "1rem" }}>
          <FormattedAddress address={owner} align="right" />
          {_color}
        </span>
      </div>
    </div>
  );
}
