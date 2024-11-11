import { ICreateEmissionCO2, IEmissionDTO } from "@/data/usecases";
import { CollectionsType, IFirebase } from "@/infra/services/firebase";
import { IEmissionCreateRepository } from "../repositories/create-emission-co2.repositories";
import { EmissionCo2Model } from "@/data/models";
import { doc } from "firebase/firestore";
import { EmissionCo2 } from "../entities/emission-co2";

export class RemoteEmissionCo2 implements ICreateEmissionCO2 {
  constructor(
    private readonly database: IFirebase,
    private readonly collection: CollectionsType,
    private readonly emissionCreateRepository: IEmissionCreateRepository
  ) {}

  async emission({ co2, distanceKM }: IEmissionDTO): Promise<EmissionCo2Model> {
    const emissionCO2Doc = doc(this.database.collection(this.collection));

    const newEmissionCo2 = new EmissionCo2({
      id: emissionCO2Doc.id,
      co2,
      distanceKM,
    });
    await this.emissionCreateRepository.save(newEmissionCo2, emissionCO2Doc);

    return {
      id: newEmissionCo2.id,
      co2: newEmissionCo2.co2,
      distanceKM: newEmissionCo2.distanceKM,
    };
  }
}
