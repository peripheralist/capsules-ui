import { bytesToColorString } from "../utils";
import useSubgraphQuery from "./SubgraphQuery";

export function useMintedColors() {
  const fonts = useSubgraphQuery({
    entity: "list",
    first: 1,
    keys: ["mintedColors"],
  }) as {
    data?: {
      lists?: { mintedColors: string }[];
    };
  };

  if (!fonts.data?.lists?.length) return [];

  return fonts.data.lists[0].mintedColors
    .split(" ")
    .filter((x) => x.length)
    .map(bytesToColorString);
}
