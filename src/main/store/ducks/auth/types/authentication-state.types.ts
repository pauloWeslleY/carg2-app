import { AccountModel } from "@/data/models";
import { ReducerStateType } from "@/main/store/types/reducer.type";

export type AuthStateProps = ReducerStateType & {
  user: AccountModel | null;
};
