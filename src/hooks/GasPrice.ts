import axios from "axios";
import { useQuery } from "react-query";

import { TxGasOption } from "../models/txGasOption";

export function useGasPriceQuery(speed: TxGasOption) {
  return useQuery(
    ["gas-price", speed],
    async () => {
      const response = await axios.get(
        "https://ethgasstation.info/json/ethgasAPI.json"
      );
      return response.data[speed] * 100000000;
    },
    {
      refetchInterval: 30000,
      staleTime: 30000,
    }
  );
}
