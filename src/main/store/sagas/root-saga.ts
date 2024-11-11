import { all } from "redux-saga/effects";
import * as Auth from "@/main/store/ducks/auth";
import * as AddAccount from "@/main/store/ducks/add-account";
import * as Driver from "@/main/store/ducks/driver";
import * as EmissionCo2 from "@/main/store/ducks/emission-co2";

export default function* rootSaga() {
  yield all([
    Auth.authenticationSaga(),
    Auth.authSignOutSaga(),
    AddAccount.createAccountSaga(),
    Driver.driverListSaga(),
    Driver.createDriverSaga(),
    Driver.driverTruckInfoSaga(),
    EmissionCo2.createEmissionCo2Saga(),
    EmissionCo2.emissionCo2ListSaga(),
    EmissionCo2.emissionCo2OptimizedCreateSaga(),
    EmissionCo2.emissionCo2OptimizedListSaga(),
  ]);
}
