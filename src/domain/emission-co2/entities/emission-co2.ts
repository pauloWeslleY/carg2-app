import { Timestamp } from "firebase/firestore";

export interface IEmissionCo2 {
  id: string;
  co2: number;
  distanceKM: number;
  createAt: Date | Timestamp;
}

export class EmissionCo2 implements IEmissionCo2 {
  public readonly id: string;
  public co2: number;
  public distanceKM: number;
  public createAt: Date = new Date();

  constructor(props: Pick<IEmissionCo2, "id" | "co2" | "distanceKM">) {
    this.id = props.id;
    this.co2 = props.co2;
    this.distanceKM = props.distanceKM;
  }
}
