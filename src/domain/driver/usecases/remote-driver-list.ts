import { getDocs, orderBy, query, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { COLLECTION, IFirebase } from "@/infra/services/firebase";
import { IDriverList } from "@/data/usecases";
import { IDriver } from "../entities/driver";
import { DriverModel } from "@/data/models";
import { AppError } from "@/data/errors/usecases/app-error";
import { driverAdapter } from "./adapter/driver.adapter";
import { IDayJsAdapter } from "@/infra/adapters";

export class RemoteDriverList implements IDriverList {
  private _driver: IDriver[];

  constructor(
    private readonly database: IFirebase,
    private readonly date: IDayJsAdapter
  ) {
    this._driver = [];
  }

  async getDriverList(): Promise<RemoteDriverList.Model> {
    try {
      const driverQuery = query(
        this.database.collection(COLLECTION.driverTruck),
        where("name", "!=", true),
        orderBy("name", "asc")
      );
      const driverListDoc = await getDocs(driverQuery);

      driverListDoc.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id } as IDriver;
        this._driver.push(data);
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    return this._driver.map((driver) => driverAdapter(driver, this.date));
  }
}

namespace RemoteDriverList {
  export type Model = DriverModel[];
}
