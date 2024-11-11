import type { EmissionCo2Model } from "@/data/models";

export interface IEmissionDTO {
  distanceKM: number;
  co2: number;
}

export interface ICreateEmissionCO2 {
  emission(params: IEmissionDTO): Promise<EmissionCo2Model>;
}
