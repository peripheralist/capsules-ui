import { CSSProperties } from "react";
import "./SVGURIRenderer.css";

export default function SVGURIRenderer({
  uri,
  style,
}: {
  uri: string;
  style?: CSSProperties;
}) {
  return <img src={uri} alt="Capsule" />;
  // return (
  //   <div
  //     style={style}
  //     dangerouslySetInnerHTML={{
  //       __html: Buffer.from(
  //         base64.decode(uri.split("data:image/svg+xml;base64,")[1])
  //       ).toString(),
  //     }}
  //   ></div>
  // );
}
