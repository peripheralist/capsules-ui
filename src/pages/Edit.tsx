import { BigNumber } from "ethers";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../components/Button";
import Capsule from "../components/Capsule";
import FormattedAddress from "../components/FormattedAddress";
import TextEditor from "../components/TextEditor";
import { bytesToColorString } from "../constants/colors";
import { isMobile } from "../constants/isMobile";
import { EditingContext } from "../contexts/editingContext";
import { NetworkContext } from "../contexts/networkContext";
import { WalletContext } from "../contexts/walletContext";
import useContractReader from "../hooks/ContractReader";
import { useIsOwner } from "../hooks/isOwner";
import { BytesText } from "../models/text";
import { Weight } from "../models/weight";
import {
  deepEqBytesTexts,
  parseBytesText,
  textToBytesText,
} from "../utils/text";

export default function Edit() {
  const [isEditing, setIsEditing] = useState<boolean>();
  const { text, setText, weight, setWeight } = useContext(EditingContext);
  const [loadingTx, setLoadingTx] = useState<boolean>();
  const { contracts, transactor } = useContext(WalletContext);
  const { connectedWallet } = useContext(NetworkContext);
  const { id } = useParams<{ id: string }>();

  const isOwner = useIsOwner();

  const capsuleOwner = useContractReader<string>({
    contract: contracts?.CapsuleToken,
    functionName: "ownerOf",
    args: useMemo(() => [id], [id]),
  });

  const isCapsuleOwner =
    connectedWallet &&
    connectedWallet?.toLowerCase() === capsuleOwner?.toLowerCase();

  const capsuleText = useContractReader<BytesText>({
    contract: contracts?.CapsuleToken,
    functionName: "textOf",
    args: useMemo(() => [id], [id]),
  });

  const capsuleFont = useContractReader<{ weight: BigNumber }>({
    contract: contracts?.CapsuleToken,
    functionName: "fontOf",
    args: useMemo(() => [id], [id]),
  });

  const capsuleColor = useContractReader<string>({
    contract: contracts?.CapsuleToken,
    functionName: "colorOf",
    args: useMemo(() => [id], [id]),
  });

  useEffect(() => {
    if (!capsuleText || !setText) return;
    setText(parseBytesText(capsuleText));
  }, [capsuleText, setText]);

  useEffect(() => {
    if (!capsuleFont || !setWeight) return;
    setWeight(capsuleFont.weight.toNumber() as Weight);
  }, [capsuleFont, setWeight]);

  const save = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(
      contracts.CapsuleToken,
      "setTextAndFont",
      [id, textToBytesText(text), { weight, style: "normal" }],
      {
        onDone: () => setLoadingTx(false),
        txTitle: `Edit ${bytesToColorString(capsuleColor)}`,
      }
    );
  }, [transactor, contracts, id, text, weight, capsuleColor]);

  if (!capsuleText || !capsuleColor || !capsuleFont) return null;

  return (
    <div
      style={{
        textAlign: "center",
        padding: isMobile && isOwner ? "20px 20px 40px 20px" : 0,
      }}
    >
      <h1 style={{ color: bytesToColorString(capsuleColor) }}>
        {bytesToColorString(capsuleColor)}
      </h1>

      {isCapsuleOwner ? (
        "Owned by you"
      ) : (
        <div>
          Owned by: <FormattedAddress address={capsuleOwner} />
        </div>
      )}
      {isCapsuleOwner === false && (
        <div>Font: {capsuleFont.weight.toString()}</div>
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
        {isEditing ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap-reverse",
              gap: isMobile ? 30 : 50,
              minHeight: isMobile && isOwner ? 750 : 0,
            }}
          >
            {setText && setWeight && (
              <TextEditor
                text={text}
                setText={setText}
                color={capsuleColor}
                weight={capsuleFont.weight.toNumber() as Weight}
                setWeight={setWeight}
              />
            )}

            <div style={{ padding: isMobile ? 10 : 0 }}>
              <Capsule
                text={text}
                color={capsuleColor}
                width={320}
                weight={capsuleFont.weight.toNumber() as Weight}
                square
              />
            </div>
          </div>
        ) : (
          <Capsule
            text={text}
            color={capsuleColor}
            width={isMobile ? "100%" : "30rem"}
            weight={capsuleFont.weight.toNumber() as Weight}
            square
          />
        )}
      </div>

      {isCapsuleOwner &&
        (isEditing ? (
          <div>
            <Button
              text="Save Capsule"
              onClick={save}
              loading={loadingTx ? "Transaction pending..." : false}
              isDisabled={deepEqBytesTexts(textToBytesText(text), capsuleText)}
            />
            <br />
            <Button
              text="Cancel"
              style={{ fontSize: "1rem" }}
              onClick={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <Button text={"Edit"} onClick={() => setIsEditing(true)} />
        ))}
    </div>
  );
}
