import {
  ICreateDriver,
  ICreateDriverDTO,
  IDriverList,
  IDriverTruckInfo,
} from "@/data/usecases";
import {
  DriverCreateRepository,
  RemoteDriverCreate,
  RemoteDriverList,
  RemoteDriverTruckInfo,
} from "@/domain/driver";
import { DBFirebase } from "@/infra/services/firebase";
import { makeDayJsAdapter } from "@/main/factories/adapters";

type DriverServicesType = {
  driver: ICreateDriver;
  driverList: IDriverList;
  driverTruckInfo: IDriverTruckInfo;
};

const makeDriverServices = (): DriverServicesType => {
  const database = DBFirebase.database();
  const dayJsAdapter = makeDayJsAdapter();
  const driverCreateRepository = new DriverCreateRepository();
  const driver = new RemoteDriverCreate(
    database,
    dayJsAdapter,
    driverCreateRepository
  );
  const driverList = new RemoteDriverList(database, dayJsAdapter);
  const driverTruckInfo = new RemoteDriverTruckInfo(database, dayJsAdapter);

  return {
    driver,
    driverList,
    driverTruckInfo,
  };
};

export const driverServices = {
  getDriverListAll: async () => {
    const { driverList } = makeDriverServices();
    return await driverList.getDriverList();
  },
  getDriverTruckInfo: async (driverTruckInfoId: string) => {
    const { driverTruckInfo } = makeDriverServices();
    return await driverTruckInfo.getDriverTruckInfo(driverTruckInfoId);
  },
  create: async (params: ICreateDriverDTO) => {
    const { driver } = makeDriverServices();
    return await driver.createDriver(params);
  },
};
