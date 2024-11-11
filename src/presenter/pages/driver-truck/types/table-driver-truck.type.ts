import { DriverModel } from "@/data/models";

export type TableDriverTruckType = Pick<
  DriverModel,
  "name" | "lastName" | "email" | "totalKmDriven" | "CNH" | "CPF"
>;
