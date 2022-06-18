import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Capsule from "./components/Capsule";
import Button from "./components/Button";
import { isMobile } from "./constants/isMobile";
import { WalletContext } from "./contexts/walletContext";
import useContractReader from "./hooks/ContractReader";
import { Text } from "./models/text";
import { Weight } from "./models/weight";
import TextEditor from "./components/TextEditor";
import { parseText } from "./utils";
import { NetworkContext } from "./contexts/networkContext";

export default function Edit() {
  const [weight, setWeight] = useState<Weight>(400);
  const [text, setText] = useState<Text>([]);
  const [loadingTx, setLoadingTx] = useState<boolean>();
  const { contracts, transactor } = useContext(WalletContext);
  const { connectedWallet } = useContext(NetworkContext);
  const { id } = useParams<{ id: string }>();

  const capsule = useContractReader<{
    text: Text;
    fontWeight: Weight;
    color: string;
  }>({
    contract: contracts?.CapsulesToken,
    functionName: "capsuleOf",
    args: useMemo(() => [id], [id]),
  });

  const owner = useContractReader<string>({
    contract: contracts?.CapsulesToken,
    functionName: "ownerOf",
    args: useMemo(() => [id], [id]),
  });

  const isOwner =
    owner && connectedWallet?.toLowerCase() === owner?.toLowerCase();

  useEffect(() => {
    if (!capsule) return;
    setText(parseText(capsule.text, capsule.color));
  }, [capsule]);

  const save = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(contracts.CapsulesToken, "editCapsule", [id, text, weight], {
      onDone: () => setLoadingTx(false),
    });
  }, [transactor, contracts]);

  if (!capsule) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Edit Capsule {id}</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: isMobile ? "initial" : "center",
          overflow: "auto",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap-reverse",
            gap: isMobile ? 30 : 50,
            minHeight: isMobile ? 750 : 0,
          }}
        >
          {isOwner && (
            <TextEditor
              text={text}
              setText={setText}
              color={capsule.color}
              weight={capsule.fontWeight}
              setWeight={setWeight}
            />
          )}

          <div style={{ padding: isMobile ? 10 : 0 }}>
            <Capsule
              text={text}
              color={capsule.color}
              width={320}
              weight={weight}
            />
          </div>
        </div>
      </div>

      {isOwner ? (
        <Button
          text="Save Capsule"
          onClick={save}
          loading={loadingTx ? "Transaction pending..." : false}
        />
      ) : (
        <Button text="You don't own this Capsule" isDisabled />
      )}
    </div>
  );
}
