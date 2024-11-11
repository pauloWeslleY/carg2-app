import type { EmissionCo2Model } from "@/data/models";
import type { ReducerStateType } from "@/main/store/types/reducer.type";

export type EmissionCo2StateType = ReducerStateType & {
  data: EmissionCo2Model[] | null;
};
