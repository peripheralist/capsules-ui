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
import { BytesText } from "../models/text";
import { Weight } from "../models/weight";
import {
  deepEqBytesTexts,
  parseBytesText,
  textToBytesText,
} from "../utils/text";

export default function Edit() {
  const { text, setText, weight, setWeight } = useContext(EditingContext);
  const [shouldLock, setShouldLock] = useState<boolean>(false);
  const [loadingTx, setLoadingTx] = useState<boolean>();
  const { contracts, transactor } = useContext(WalletContext);
  const { connectedWallet } = useContext(NetworkContext);
  const { id } = useParams<{ id: string }>();

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

  const owner = useContractReader<string>({
    contract: contracts?.CapsuleToken,
    functionName: "ownerOf",
    args: useMemo(() => [id], [id]),
  });

  const isLocked = useContractReader<boolean>({
    contract: contracts?.CapsuleToken,
    functionName: "isLocked",
    args: useMemo(() => [id], [id]),
  });

  const isOwner =
    owner && connectedWallet?.toLowerCase() === owner?.toLowerCase();

  useEffect(() => {
    if (!capsuleText || !setText) return;
    setText(parseBytesText(capsuleText));
  }, [capsuleText, setText]);

  const save = useCallback(() => {
    if (!transactor || !contracts) return;

    setLoadingTx(true);

    transactor(
      contracts.CapsuleToken,
      "editCapsule",
      [id, textToBytesText(text), { weight, style: "normal" }, shouldLock],
      {
        onDone: () => setLoadingTx(false),
        txTitle: `Edit ${bytesToColorString(capsuleColor)}`,
      }
    );
  }, [transactor, contracts, id, text, weight, shouldLock, capsuleColor]);

  if (!capsuleText || !capsuleColor || !capsuleFont) return null;

  return (
    <div
      style={{
        textAlign: "center",
        padding: isMobile ? "20px 20px 40px 20px" : 20,
      }}
    >
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
          {isOwner && isLocked === false && setText && setWeight && (
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
              width={isMobile ? 320 : isLocked || !isOwner ? 420 : 320}
              weight={weight}
              square
              locked={shouldLock || isLocked}
            />

            {!isLocked && isOwner && (
              <div
                style={{ cursor: "pointer", fontWeight: 500 }}
                onClick={() => setShouldLock((l) => !l)}
              >
                {shouldLock ? " Don't lock" : " Lock"}
              </div>
            )}
          </div>
        </div>
      </div>

      {isLocked && <div></div>}

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
