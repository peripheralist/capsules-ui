import { ChildElems } from "../models/childElems";
import { useMintedColors } from "../hooks/mintedColors";
import { CapsulesContext } from "../contexts/capsulesContext";
import { ALL_COLORS } from "../constants/colors";

export default function CapsulesContextProvider({
  children,
}: {
  children: ChildElems;
}) {
  const mintedColors = useMintedColors();

  return (
    <CapsulesContext.Provider
      value={{
        unmintedColors: ALL_COLORS.filter((c) => !mintedColors.includes(c)),
        mintedColors,
        mintedSupply: mintedColors.length,
      }}
    >
      {children}
    </CapsulesContext.Provider>
  );
}
