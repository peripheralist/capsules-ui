import { Text } from "./text";
import { Weight } from "./weight";

export type Capsule = {
  id: string;
  color: string;
  owner: string;
  fontWeight: Weight;
  text: Text;
  locked: boolean;
  tokenUri: string;
  svg: string;
};
