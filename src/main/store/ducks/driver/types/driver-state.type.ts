import { DriverModel } from "@/data/models";
import { ReducerStateType } from "@/main/store/types/reducer.type";

export type DriverStateType = ReducerStateType & {
  data: DriverModel[] | null;
};

export type DriverTruckInfoStateType = ReducerStateType & {
  data: DriverModel | null;
};
