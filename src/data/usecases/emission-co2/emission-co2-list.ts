import { EmissionCo2Model } from "@/data/models";

export interface IEmissionCo2List {
  getEmissionCo2List(): Promise<EmissionCo2Model[]>;
}
