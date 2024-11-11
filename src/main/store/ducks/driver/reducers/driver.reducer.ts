import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DriverModel } from "@/data/models";
import type { DriverStateType } from "@/main/store/ducks/driver/types/driver-state.type";
import type { RootState } from "@/main/store/types/types";

const DRIVER_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies DriverStateType as DriverStateType;

const driverSlice = createSlice({
  name: "driver",
  initialState: DRIVER_INITIAL_STATE,
  reducers: {
    setDriverRequest: (state, { payload }: PayloadAction<DriverModel[]>) => {
      state.data = payload;
    },
    setDriverSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setDriverPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setDriverError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
    setDriverFailure: (
      state,
      { payload }: PayloadAction<Error | string | null>
    ) => {
      state.error = payload;
    },
  },
});

export const {
  setDriverRequest,
  setDriverSuccess,
  setDriverPending,
  setDriverFailure,
  setDriverError,
} = driverSlice.actions;
export const useStateDriver = (state: RootState) => state.driver;
export const driverReducer = driverSlice.reducer;
