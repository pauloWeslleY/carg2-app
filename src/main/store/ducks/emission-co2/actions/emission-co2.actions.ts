import { createAction } from "@reduxjs/toolkit";
import { IEmissionDTO } from "@/data/usecases";

export const loadEmissionCo2List = createAction(
  "emission-co2/LOAD_EMISSION_CO2_LIST"
);

export const loadCreateEmissionCo2 = createAction<IEmissionDTO>(
  "emission-co2/LOAD_CREATE_EMISSION_CO2"
);

export const loadEmissionCo2OptimizedList = createAction(
  "emission-co2/LOAD_EMISSION_CO2_OPTIMIZED_LIST"
);

export const loadEmissionCo2OptimizedCreate = createAction<IEmissionDTO>(
  "emission-co2/LOAD_EMISSION_CO2_OPTIMIZED_CREATE"
);
