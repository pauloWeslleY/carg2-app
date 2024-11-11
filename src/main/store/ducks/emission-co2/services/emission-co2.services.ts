import { EmissionCo2Model } from "@/data/models";
import {
  ICreateEmissionCO2,
  IEmissionCo2List,
  IEmissionDTO,
} from "@/data/usecases";
import {
  EmissionCreateRepository,
  RemoteEmissionCo2,
  RemoteEmissionCo2List,
} from "@/domain/emission-co2";
import { CollectionsType, DBFirebase } from "@/infra/services/firebase";

type EmissionCo2ServicesType = {
  emissionCo2: ICreateEmissionCO2;
  emissionCo2List: IEmissionCo2List;
};

const database = DBFirebase.database();

export const makeEmissionCo2Services = (
  collection: CollectionsType
): EmissionCo2ServicesType => {
  const emissionCo2Repository = new EmissionCreateRepository();
  const emissionCo2 = new RemoteEmissionCo2(
    database,
    collection,
    emissionCo2Repository
  );
  const emissionCo2List = new RemoteEmissionCo2List(database, collection);

  return {
    emissionCo2,
    emissionCo2List,
  };
};

export const emissionCo2Services = {
  getEmissionCo2: async (
    collection: CollectionsType
  ): Promise<EmissionCo2Model[]> => {
    const { emissionCo2List } = makeEmissionCo2Services(collection);
    return await emissionCo2List.getEmissionCo2List();
  },
  create: async (
    params: IEmissionDTO,
    collection: CollectionsType
  ): Promise<EmissionCo2Model> => {
    const { emissionCo2 } = makeEmissionCo2Services(collection);
    return await emissionCo2.emission(params);
  },
};
