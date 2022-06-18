import axios from "axios";

export interface SubgraphError {
  locations: { column: number; line: number }[];
  message: string;
}

export type OrderDirection = "asc" | "desc";

export type WhereConfig = {
  key: string;
  value: string | number | boolean | string[] | number[] | null;
  operator?:
    | "not"
    | "gt"
    | "lt"
    | "gte"
    | "lte"
    | "in"
    | "not_in"
    | "contains"
    | "not_contains"
    | "starts_with"
    | "ends_with"
    | "not_starts_with"
    | "not_ends_with";
};

export type BlockConfig = {
  number?: number;
  hash?: string;
};

export interface GraphQueryOpts {
  entity: string;
  text?: string;
  first?: number;
  skip?: number;
  orderBy?: string;
  block?: BlockConfig;
  url?: string;

  // `keys` can be a mix of the entity's keys or an entity specifier with its own keys
  keys: (
    | string
    | {
        entity: string;
        keys: string[]; // hard to type accurate nested keys. All bets are off when this is used.
      }
  )[];
  orderDirection?: OrderDirection;
  where?: WhereConfig | WhereConfig[];
}

// https://thegraph.com/docs/graphql-api#filtering
export const formatGraphQuery = (opts: GraphQueryOpts) => {
  if (!opts) return;

  let args = "";

  const addArg = (name: string, value?: string | number) => {
    if (value === undefined) return;
    args += (args.length ? ", " : "") + `${name}: ` + value;
  };
  const formatWhere = (where: WhereConfig) =>
    `${where.key}${where.operator ? "_" + where.operator : ""}:` +
    (Array.isArray(where.value)
      ? `[${where.value
          .map((v) => (typeof v === "string" ? `"${v}"` : v))
          .join(",")}]`
      : typeof where.value === "number"
      ? where.value
      : `"${where.value}"`);

  addArg("text", opts.text ? `"${opts.text}"` : undefined);
  addArg("first", opts.first);
  addArg("skip", opts.skip);
  addArg("orderBy", opts.orderBy);
  addArg("orderDirection", opts.orderDirection);
  if (opts.block) {
    if (opts.block.number) {
      addArg("block", `{ number: ${opts.block.number} }`);
    } else if (opts.block.hash) {
      addArg("block", `{ hash: ${opts.block.hash} }`);
    }
  }
  addArg(
    "where",
    opts.where
      ? Array.isArray(opts.where)
        ? `{${opts.where.map((w) => ` ${formatWhere(w)}`)} }`
        : `{ ${formatWhere(opts.where)} }`
      : undefined
  );

  let overrideEntity: string = opts.entity;

  return `{ ${overrideEntity}s${args ? `(${args})` : ""} {${opts.keys.reduce(
    (acc, key) =>
      typeof key === "string" ||
      typeof key === "number" ||
      typeof key === "symbol"
        ? acc + " " + key.toString()
        : acc + ` ${key.entity} { ${key.keys.join(" ")} }`,
    ""
  )} } }`;
};

const subgraphUrl = process.env.REACT_APP_SUBGRAPH_URL;

export const trimHexZero = (hexStr: string) => hexStr.replace("0x0", "0x");

export async function querySubgraph<E>(opts: GraphQueryOpts | null) {
  if (!subgraphUrl) {
    // This should _only_ happen in development
    throw new Error("env.REACT_APP_SUBGRAPH_URL is missing");
  }

  if (!opts) return [];

  const response = await axios.post<{
    errors?: SubgraphError | SubgraphError[];
    data: E[];
  }>(
    opts.url ?? subgraphUrl,
    {
      query: formatGraphQuery(opts),
    },
    { headers: { "Content-Type": "application/json" } }
  );

  if ("errors" in response.data) {
    throw new Error(
      (Array.isArray(response.data.errors)
        ? response.data.errors?.[0]?.message
        : response.data.errors?.message) ||
        "Something is wrong with this Graph request"
    );
  }

  return response.data?.data;
}
