import { useQuery, UseQueryOptions } from "react-query";

import { GraphQueryOpts, querySubgraph } from "../utils/graph";

const staleTime = 60 * 1000; // 60 seconds

// Pass `opts = null` to prevent http request
export default function useSubgraphQuery(
  opts: GraphQueryOpts | null,
  reactQueryOptions?: UseQueryOptions<
    unknown,
    Error,
    unknown,
    readonly [string, unknown]
  >
) {
  return useQuery(["subgraph-query", opts], () => querySubgraph(opts), {
    staleTime,
    ...reactQueryOptions,
  });
}
