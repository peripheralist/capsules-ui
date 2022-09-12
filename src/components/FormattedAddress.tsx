import { utils } from "ethers";
import { useLayoutEffect, useState } from "react";
import { isMobile } from "../constants/isMobile";
import { readNetwork } from "../constants/networks";

import { readProvider } from "../constants/readProvider";
import { NetworkName } from "../models/networkName";

export default function FormattedAddress({
  address,
  align,
}: {
  address: string | undefined;
  align?: "left" | "right";
}) {
  const [ensName, setEnsName] = useState<string>();

  useLayoutEffect(() => {
    const read = async () => {
      if (!address || !utils.isAddress(address)) {
        setEnsName(undefined);
        return;
      }

      try {
        const name = await readProvider.lookupAddress(address);

        if (!name) return;

        // Reverse lookup to check validity
        const isValid =
          (await (await readProvider.resolveName(name))?.toLowerCase()) ===
          address.toLowerCase();

        if (isValid) setEnsName(name);
      } catch (e) {
        console.log("Error looking up ENS name for address", address, e);
      }
    };

    read();
  }, [address]);

  if (!address) return null;

  const formattedAddress = `${
    isMobile ? "0x" : address.substring(0, 6)
  }…${address.substring(address.length - 4)}`;

  return (
    <span
      className="address-container"
      style={{ position: "relative", cursor: "default" }}
    >
      {ensName ?? formattedAddress}
      <div style={{ borderTop: "5px solid transparent" }}>
        <div
          className="address"
          style={{
            fontWeight: 400,
            lineHeight: 1.5,
            ...(align === "right" ? { right: 0 } : { left: 0 }),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ userSelect: "all", cursor: "crosshair" }}
          >
            {address}
          </div>
          <div>
            <a
              style={{ marginLeft: 10 }}
              href={`https://${
                readNetwork.name !== NetworkName.mainnet
                  ? readNetwork.name + "."
                  : ""
              }etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Etherscan ↗
            </a>
          </div>
        </div>
      </div>
    </span>
  );
}
