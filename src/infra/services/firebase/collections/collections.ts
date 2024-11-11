export const COLLECTION = {
  users: "users",
  driverTruck: "driverTruck",
  emissionCo2: "emissionCo2",
  emissionCo2Optimized: "emissionCo2Optimized",
} as const;

export type CollectionsType = keyof typeof COLLECTION;
