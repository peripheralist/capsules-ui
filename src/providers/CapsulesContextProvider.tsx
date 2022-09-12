import { ChildElems } from "../models/childElems";
import { useMintedColors } from "../hooks/mintedColors";
import { CapsulesContext } from "../contexts/capsulesContext";
import { ALL_COLORS } from "../constants/colors";
import useContractReader from "../hooks/ContractReader";
import { useContext } from "react";
import { WalletContext } from "../contexts/walletContext";

export default function CapsulesContextProvider({
  children,
}: {
  children: ChildElems;
}) {
  const { contracts } = useContext(WalletContext);

  const paused = useContractReader<boolean>({
    contract: contracts?.CapsuleToken,
    functionName: "paused",
  });

  const mintedColors = useMintedColors();

  return (
    <CapsulesContext.Provider
      value={{
        paused,
        unmintedColors: ALL_COLORS.filter((c) => !mintedColors.includes(c)),
        mintedColors,
        mintedSupply: mintedColors.length,
      }}
    >
      {children}
    </CapsulesContext.Provider>
  );
}
