import { ICreateDriver, ICreateDriverDTO } from "@/data/usecases";
import { COLLECTION, IFirebase } from "@/infra/services/firebase";
import { doc } from "firebase/firestore";
import { IDriverCreateRepository } from "../repositories/create-driver.repository";
import { DriverModel } from "@/data/models";
import { Driver } from "../entities/driver";
import { IDayJsAdapter } from "@/infra/adapters";
import { driverAdapter } from "./adapter/driver.adapter";

export class RemoteDriverCreate implements ICreateDriver {
  constructor(
    private readonly database: IFirebase,
    private readonly date: IDayJsAdapter,
    private readonly driverCreateRepository: IDriverCreateRepository
  ) {}

  async createDriver(params: ICreateDriverDTO): Promise<DriverModel> {
    const driverDoc = doc(this.database.collection(COLLECTION.driverTruck));

    const newDriver = new Driver({
      id: driverDoc.id,
      ...params,
    });

    await this.driverCreateRepository.save(newDriver, driverDoc);
    return driverAdapter(newDriver, this.date);
  }
}
