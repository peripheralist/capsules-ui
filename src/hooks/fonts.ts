import { Weight } from "../models/weight";
import useSubgraphQuery from "./SubgraphQuery";

export function useFonts() {
  const fonts = useSubgraphQuery({
    entity: "font",
    first: 1000,
    keys: ["color", "minter", "weight"],
  }) as {
    data?: {
      fonts?: { color: string; minter: string | null; weight: Weight }[];
    };
  };

  return fonts.data?.fonts?.map((f) => ({
    ...f,
    color: `#${f.color.split("0x")[1].toUpperCase()}`,
  }));
}
