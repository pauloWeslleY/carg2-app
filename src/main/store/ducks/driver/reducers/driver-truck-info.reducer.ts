import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DriverModel } from "@/data/models";
import type { DriverTruckInfoStateType } from "@/main/store/ducks/driver/types/driver-state.type";
import type { RootState } from "@/main/store/types/types";

const DRIVER_TRUCK_INFO_INITIAL_STATE = {
  data: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies DriverTruckInfoStateType as DriverTruckInfoStateType;

const driverTruckInfoSlice = createSlice({
  name: "driver-truck-info",
  initialState: DRIVER_TRUCK_INFO_INITIAL_STATE,
  reducers: {
    setDriverTruckInfoRequest: (state, action: PayloadAction<DriverModel>) => {
      state.data = action.payload;
    },
    setDriverTruckInfoSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setDriverTruckInfoPending: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDriverTruckInfoError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setDriverTruckInfoFailure: (
      state,
      action: PayloadAction<Error | string | null>
    ) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDriverTruckInfoRequest,
  setDriverTruckInfoSuccess,
  setDriverTruckInfoPending,
  setDriverTruckInfoFailure,
  setDriverTruckInfoError,
} = driverTruckInfoSlice.actions;
export const useStateDriverTruckInfo = (state: RootState) => {
  return state.driverTruckInfo;
};
export const driverTruckInfoReducer = driverTruckInfoSlice.reducer;
