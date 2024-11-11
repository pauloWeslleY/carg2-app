import { FirebaseError } from "firebase/app";
import { DocumentData, DocumentReference, setDoc } from "firebase/firestore";
import { AppError } from "@/data/errors/usecases/app-error";
import { IDriver } from "../entities/driver";

export interface IDriverCreateRepository {
  save(
    driver: IDriver,
    driverDoc: DocumentReference<DocumentData, DocumentData>
  ): Promise<void>;
}

export class DriverCreateRepository implements IDriverCreateRepository {
  async save(
    driver: IDriver,
    driverDoc: DocumentReference<DocumentData, DocumentData>
  ): Promise<void> {
    try {
      await setDoc(driverDoc, {
        name: driver.name,
        lastName: driver.lastName,
        email: driver.email,
        trips: driver.trips,
        totalKmDriven: Number(driver.totalKmDriven),
        CNH: driver.CNH,
        CPF: driver.CPF,
        createAt: driver.createAt,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }
  }
}
