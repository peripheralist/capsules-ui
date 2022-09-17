import { BytesText } from "./text";
import { Weight } from "./weight";

export type Capsule = {
  id: string;
  color: string;
  owner: string;
  fontWeight: Weight;
  text: BytesText;
  locked: boolean;
  tokenUri: string;
  svg: string;
  lastEdited: number;
};
