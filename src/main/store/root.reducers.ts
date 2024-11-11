import { combineReducers } from "@reduxjs/toolkit";
import * as Auth from "@/main/store/ducks/auth";
import * as Driver from "@/main/store/ducks/driver";
import * as EmissionCo2 from "@/main/store/ducks/emission-co2";

const rootReducer = combineReducers({
  authentication: Auth.authenticationReducer,
  driver: Driver.driverReducer,
  driverTruckInfo: Driver.driverTruckInfoReducer,
  emissionCo2: EmissionCo2.emissionCo2Reducer,
  emissionCo2Optimized: EmissionCo2.emissionCo2OptimizedReducer,
});

export default rootReducer;
