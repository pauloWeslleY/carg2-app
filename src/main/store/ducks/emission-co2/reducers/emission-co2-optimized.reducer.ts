import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmissionCo2Model } from "@/data/models";
import type { RootState } from "@/main/store/types/types";
import { EmissionCo2StateType } from "../types/emission-co2-state.type";

const EMISSION_CO2_OPTIMIZED_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies EmissionCo2StateType as EmissionCo2StateType;

const emissionCo2OptimizedSlice = createSlice({
  name: "emission-co2-optimized",
  initialState: EMISSION_CO2_OPTIMIZED_INITIAL_STATE,
  reducers: {
    setEmissionCo2OptimizedRequest: (
      state,
      { payload }: PayloadAction<EmissionCo2Model[]>
    ) => {
      state.data = payload;
    },
    setEmissionCo2OptimizedSuccess: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isSuccess = payload;
    },
    setEmissionCo2OptimizedPending: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isLoading = payload;
    },
    setEmissionCo2OptimizedError: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isError = payload;
    },
    setEmissionCo2OptimizedFailure: (
      state,
      { payload }: PayloadAction<Error | string | null>
    ) => {
      state.error = payload;
    },
  },
});

export const {
  setEmissionCo2OptimizedRequest,
  setEmissionCo2OptimizedSuccess,
  setEmissionCo2OptimizedPending,
  setEmissionCo2OptimizedFailure,
  setEmissionCo2OptimizedError,
} = emissionCo2OptimizedSlice.actions;
export const useStateEmissionCo2Optimized = (state: RootState) =>
  state.emissionCo2Optimized;
export const emissionCo2OptimizedReducer = emissionCo2OptimizedSlice.reducer;
