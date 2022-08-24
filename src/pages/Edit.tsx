import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Capsule from "../components/Capsule";
import Button from "../components/Button";
import { isMobile } from "../constants/isMobile";
import { WalletContext } from "../contexts/walletContext";
import useContractReader from "../hooks/ContractReader";
import { Text } from "../models/text";
import { Weight } from "../models/weight";
import TextEditor from "../components/TextEditor";
import {
  bytesToColorString,
  deepEqBytesTexts,
  parseBytesText,
  textToBytesText,
} from "../utils";
import { NetworkContext } from "../contexts/networkContext";
import { BigNumber } from "ethers";
import FormattedAddress from "../components/FormattedAddress";

export default function Edit() {
  const [weight, setWeight] = useState<Weight>(400);
  const [text, setText] = useState<Text>([]);
  const [shouldLock, setShouldLock] = useState<boolean>(false);
  const [loadingTx, setLoadingTx] = useState<boolean>();
  const { contracts, transactor } = useContext(WalletContext);
  const { connectedWallet } = useContext(NetworkContext);
  const { id } = useParams<{ id: string }>();

  const capsuleText = useContractReader<string[][]>({
    contract: contracts?.CapsulesToken,
    functionName: "textOf",
    args: useMemo(() => [id], [id]),
  });

  const capsuleFontWeight = useContractReader<BigNumber>({
    contract: contracts?.CapsulesToken,
    functionName: "fontWeightOf",
    args: useMemo(() => [id], [id]),
  });

  const capsuleColor = useContractReader<string>({
    contract: contracts?.CapsulesToken,
    functionName: "colorOf",
    args: useMemo(() => [id], [id]),
  });

  const owner = useContractReader<string>({
    contract: contracts?.CapsulesToken,
    functionName: "ownerOf",
    args: useMemo(() => [id], [id]),
  });

  const isLocked = useContractReader<boolean>({
    contract: contracts?.CapsulesToken,
    functionName: "isLocked",
    args: useMemo(() => [id], [id]),
  });

  const isOwner =
    owner && connectedWallet?.toLowerCase() === owner?.toLowerCase();

  useEffect(() => {
    if (!capsuleText) return;
    setText(parseBytesText(capsuleText));
  }, [capsuleText]);

  const save = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(
      contracts.CapsulesToken,
      "editCapsule",
      [id, textToBytesText(text), weight, shouldLock],
      {
        onDone: () => setLoadingTx(false),
        txTitle: `Edit ${bytesToColorString(capsuleColor)}`,
      }
    );
  }, [transactor, contracts, id, text, weight, shouldLock, capsuleColor]);

  if (!capsuleText || !capsuleColor || !capsuleFontWeight) return null;

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1 style={{ color: bytesToColorString(capsuleColor) }}>
        {bytesToColorString(capsuleColor)}
      </h1>

      {isOwner ? (
        "Owned by you"
      ) : (
        <span>
          Owned by <FormattedAddress address={owner} />
        </span>
      )}

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
          {isOwner && isLocked === false && (
            <TextEditor
              text={text}
              setText={setText}
              color={capsuleColor}
              weight={capsuleFontWeight.toNumber() as Weight}
              setWeight={setWeight}
            />
          )}

          <div style={{ padding: isMobile ? 10 : 0 }}>
            <Capsule
              text={text}
              color={capsuleColor}
              width={320}
              weight={weight}
              square
              locked={shouldLock || isLocked}
            />

            {!isLocked && isOwner && (
              <div
                style={{ cursor: "pointer", fontWeight: 500 }}
                onClick={() => setShouldLock((l) => !l)}
              >
                {shouldLock ? " Don't lock" : " Lock"}
              </div>
            )}
          </div>
        </div>
      </div>

      {isLocked && <div> Capsule is locked</div>}

      {!isLocked && isOwner && (
        <Button
          text={shouldLock ? "Save and lock Capsule" : "Save Capsule"}
          onClick={save}
          loading={loadingTx ? "Transaction pending..." : false}
          isDisabled={
            isLocked ||
            (deepEqBytesTexts(textToBytesText(text), capsuleText) &&
              !shouldLock)
          }
        />
      )}
      <br />
      {shouldLock && "This Capsule can never be edited again!"}
    </div>
  );
}
