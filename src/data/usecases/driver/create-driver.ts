import type { DriverModel } from "@/data/models";

export interface ICreateDriverDTO {
  name: string;
  lastName: string;
  trips: string[];
  totalKmDriven: number;
  email: string;
  CPF: string;
  CNH: string;
}

export interface ICreateDriver {
  createDriver(params: ICreateDriverDTO): Promise<DriverModel>;
}
