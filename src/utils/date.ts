import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

import moment from "moment";

export const formatDate = (
  dateMillis: BigNumberish,
  format = "YYYY-MM-DD h:mma"
) => moment(BigNumber.from(dateMillis).toNumber()).format(format);

export function formatHistoricalDate(dateMillis: BigNumberish): string {
  return (
    `${moment(BigNumber.from(dateMillis).toNumber()).fromNow(true)}`
      // lol dumb sry not sry
      .replaceAll("a day", "1d")
      .replaceAll("an hour", "1h")
      .replaceAll("a minute", "1m")
      .replaceAll("a few seconds", "now")
      .replaceAll(" minutes", "m")
      .replaceAll(" minute", "m")
      .replaceAll(" seconds", "s")
      .replaceAll(" second", "s")
      .replaceAll(" hours", "h")
      .replaceAll(" hour", "h")
      .replaceAll(" days", "d")
      .replaceAll(" day", "d")
  );
}

/**
 * Convert a date to Epoch time in seconds.
 * @param date
 * @returns Epoch time in seconds
 */
export const toDateSeconds = (date: Date) => {
  return Math.floor(date.valueOf() / 1000);
};
