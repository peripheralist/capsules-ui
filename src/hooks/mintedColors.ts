import { bytesToColorString } from "../constants/colors";
import useSubgraphQuery from "./SubgraphQuery";

export function useMintedColors() {
  const fonts = useSubgraphQuery({
    entity: "list",
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
