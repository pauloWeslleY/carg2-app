import { DocumentData, DocumentReference, setDoc } from "firebase/firestore";
import { IEmissionCo2 } from "../entities/emission-co2";
import { FirebaseError } from "firebase/app";
import { AppError } from "@/data/errors/usecases/app-error";

export interface IEmissionCreateRepository {
  save(
    emission: IEmissionCo2,
    emissionDoc: DocumentReference<DocumentData, DocumentData>
  ): Promise<void>;
}

export class EmissionCreateRepository implements IEmissionCreateRepository {
  async save(
    emission: IEmissionCo2,
    emissionDoc: DocumentReference<DocumentData, DocumentData>
  ): Promise<void> {
    try {
      await setDoc(emissionDoc, {
        co2: emission.co2,
        distanceKM: Number(emission.distanceKM),
        createAt: emission.createAt,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }
  }
}
