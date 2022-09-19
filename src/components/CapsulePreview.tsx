import { CSSProperties } from "react";
import { bytesToColorString } from "../constants/colors";
import { Text } from "../models/text";
import { Weight } from "../models/weight";
import { formatHistoricalDate } from "../utils/date";
import Capsule from "./Capsule";
import FormattedAddress from "./FormattedAddress";
import SVGURIRenderer from "./SVGURIRenderer";

export default function CapsulePreview({
  uri,
  color,
  weight,
  owner,
  text,
  lastEditedTimestamp,
  imgStyle,
  style,
}: {
  uri: string;
  color: CSSProperties["color"];
  weight: Weight;
  owner: string;
  text: Text;
  lastEditedTimestamp: number;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
}) {
  const _color = bytesToColorString(color);

  let formattedDate = formatHistoricalDate(lastEditedTimestamp);
  if (formattedDate.toLowerCase() === "now") formattedDate = "just now";
  else formattedDate += " ago";

  return (
    <div style={{ color: _color, ...style }}>
      {uri.length ? (
        <SVGURIRenderer uri={uri} style={imgStyle} />
      ) : (
        <Capsule color={color} weight={weight} text={text} />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: ".8rem",
          // fontWeight: 300,
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
