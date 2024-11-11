import { ICreateDriverDTO } from "@/data/usecases";
import { createAction } from "@reduxjs/toolkit";

export const loadCreateDriver = createAction<ICreateDriverDTO>(
  "driver/LOAD_CREATE_DRIVER"
);

export const loadDriverList = createAction("driver/LOAD_DRIVER_LIST");

export const loadDriverTruckInfo = createAction<{ id: string }>(
  "driver/LOAD_DRIVER_TRUCK_INFO"
);
