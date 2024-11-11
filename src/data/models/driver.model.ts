import { IDriver } from "@/domain/driver/entities/driver";

export type DriverModel = Omit<IDriver, "createAt"> & {
  createAt: string;
};
