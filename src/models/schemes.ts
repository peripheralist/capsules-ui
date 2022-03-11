export const schemes = ["white", "cyan", "pink", "yellow"] as const;

export type Scheme = typeof schemes[number];
