import { DriverModel } from "@/data/models";
import { IDriver } from "../../entities/driver";
import { IDayJsAdapter } from "@/infra/adapters";

export function driverAdapter(data: IDriver, date: IDayJsAdapter): DriverModel {
  return {
    ...data,
    createAt: date.formatDateAndHour(data.createAt, true),
  };
}
