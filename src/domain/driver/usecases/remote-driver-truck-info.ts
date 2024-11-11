import { doc, FirestoreError, getDoc } from "firebase/firestore";
import { IFirebase } from "@/infra/services/firebase";
import { COLLECTION } from "@/infra/services/firebase/collections/collections";
import { IDriverTruckInfo } from "@/data/usecases";
import { DriverModel } from "@/data/models";
import { IDriver } from "../entities/driver";
import { IDayJsAdapter } from "@/infra/adapters";
import { driverAdapter } from "./adapter/driver.adapter";
import { AppError } from "@/data/errors/usecases/app-error";

export class RemoteDriverTruckInfo implements IDriverTruckInfo {
  private data: IDriver | null;

  constructor(
    private readonly database: IFirebase,
    private readonly date: IDayJsAdapter
  ) {
    this.data = null;
  }

  async getDriverTruckInfo(driverTruckId: string): Promise<DriverModel> {
    console.log("getDriverTruckInfo", driverTruckId);
    try {
      const driverTruckDoc = await getDoc(
        doc(this.database.getDB(), COLLECTION.driverTruck, driverTruckId)
      );

      this.data = {
        ...driverTruckDoc.data(),
        id: driverTruckDoc.id,
      } as IDriver;
    } catch (error: unknown) {
      if (error instanceof FirestoreError) {
        throw new AppError(error);
      }
    }

    if (!this.data) {
      throw new Error("Falha ao buscar os dados");
    }

    return driverAdapter(this.data, this.date);
  }
}
