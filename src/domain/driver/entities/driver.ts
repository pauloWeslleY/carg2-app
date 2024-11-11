import { Timestamp } from "firebase/firestore";

export interface IDriver {
  id: string;
  name: string;
  lastName: string;
  email: string;
  trips: string[];
  totalKmDriven: number;
  CPF: string;
  CNH: string;
  createAt: Date | Timestamp;
}

export class Driver implements IDriver {
  public readonly id: string;
  public name: string;
  public lastName: string;
  public email: string;
  public trips: string[];
  public totalKmDriven: number;
  public CPF: string;
  public CNH: string;
  public createAt: Date | Timestamp = new Date();

  constructor(props: Omit<IDriver, "createAt">) {
    this.id = props.id;
    this.name = props.name;
    this.lastName = props.lastName;
    this.totalKmDriven = props.totalKmDriven;
    this.email = props.email;
    this.trips = props.trips;
    this.CPF = props.CPF;
    this.CNH = props.CNH;
  }
}
