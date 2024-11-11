import { DriverModel } from "@/data/models";

export interface IDriverTruckInfo {
  getDriverTruckInfo(driverTruckId: string): Promise<DriverModel>;
}
