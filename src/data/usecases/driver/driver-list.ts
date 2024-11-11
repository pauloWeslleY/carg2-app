import { DriverModel } from "@/data/models";

export interface IDriverList {
  getDriverList(): Promise<DriverModel[]>;
}
