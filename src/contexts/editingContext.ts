import { createContext } from "react";
import { Text } from "../models/text";
import { Weight } from "../models/weight";

export const EditingContext: React.Context<{
  text: Text;
  setText?: React.Dispatch<React.SetStateAction<Text>>;
  color: string;
  setColor?: React.Dispatch<React.SetStateAction<string>>;
  weight: Weight;
  setWeight?: React.Dispatch<React.SetStateAction<Weight>>;
}> = createContext({
  text: [] as string[],
  color: "#ffffff",
  weight: 400 as Weight,
});
