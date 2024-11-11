import { IEmissionCo2 } from "@/domain/emission-co2/entities/emission-co2";

export type EmissionCo2Model = Pick<IEmissionCo2, "id" | "co2" | "distanceKM">;
