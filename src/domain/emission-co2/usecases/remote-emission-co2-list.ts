import { getDocs, orderBy, query, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { CollectionsType, IFirebase } from "@/infra/services/firebase";
import { IEmissionCo2List } from "@/data/usecases";
import { EmissionCo2Model } from "@/data/models";
import { AppError } from "@/data/errors/usecases/app-error";
import { IEmissionCo2 } from "../entities/emission-co2";

export class RemoteEmissionCo2List implements IEmissionCo2List {
  private _emissionCo2: IEmissionCo2[];

  constructor(
    private readonly database: IFirebase,
    private readonly collection: CollectionsType
  ) {
    this._emissionCo2 = [];
  }

  async getEmissionCo2List(): Promise<RemoteEmissionCo2List.Model> {
    try {
      const emissionCo2Query = query(
        this.database.collection(this.collection),
        where("co2", "!=", true),
        orderBy("co2", "asc")
      );
      const emissionCo2ListDoc = await getDocs(emissionCo2Query);

      emissionCo2ListDoc.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id } as IEmissionCo2;
        this._emissionCo2.push(data);
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    return this._emissionCo2.map((emission) => ({
      id: emission.id,
      co2: emission.co2,
      distanceKM: emission.distanceKM,
    }));
  }
}

namespace RemoteEmissionCo2List {
  export type Model = EmissionCo2Model[];
}
