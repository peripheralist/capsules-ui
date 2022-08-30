import { useContext, useEffect, useState } from "react";

import { CapsulesContext } from "../contexts/capsulesContext";
import { EditingContext } from "../contexts/editingContext";
import { ChildElems } from "../models/childElems";
import { Text } from "../models/text";
import { Weight } from "../models/weight";

export default function EditingContextProvider({
  children,
}: {
  children: ChildElems;
}) {
  const { unmintedColors } = useContext(CapsulesContext);

  const [color, setColor] = useState<string>("#ffffff");
  const [text, setText] = useState<Text>([]);
  const [weight, setWeight] = useState<Weight>(400);

  useEffect(() => {
    // set random color
    if (!unmintedColors || color !== "#ffffff") return;
    const _color =
      unmintedColors[Math.floor(Math.random() * unmintedColors.length)];
    setColor(_color);
  }, [unmintedColors, color]);

  return (
    <EditingContext.Provider
      value={{
        text,
        setText,
        color,
        setColor,
        weight,
        setWeight,
      }}
    >
      {children}
    </EditingContext.Provider>
  );
}
