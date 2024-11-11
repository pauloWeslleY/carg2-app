import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmissionCo2Model } from "@/data/models";
import type { RootState } from "@/main/store/types/types";
import { EmissionCo2StateType } from "../types/emission-co2-state.type";

const EMISSION_CO2_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies EmissionCo2StateType as EmissionCo2StateType;

const emissionCo2Slice = createSlice({
  name: "emission-co2",
  initialState: EMISSION_CO2_INITIAL_STATE,
  reducers: {
    setEmissionCo2Request: (
      state,
      { payload }: PayloadAction<EmissionCo2Model[]>
    ) => {
      state.data = payload;
    },
    setEmissionCo2Success: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setEmissionCo2Pending: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setEmissionCo2Error: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
    setEmissionCo2Failure: (
      state,
      { payload }: PayloadAction<Error | string | null>
    ) => {
      state.error = payload;
    },
  },
});

export const {
  setEmissionCo2Request,
  setEmissionCo2Success,
  setEmissionCo2Pending,
  setEmissionCo2Failure,
  setEmissionCo2Error,
} = emissionCo2Slice.actions;
export const useStateEmissionCo2 = (state: RootState) => state.emissionCo2;
export const emissionCo2Reducer = emissionCo2Slice.reducer;
