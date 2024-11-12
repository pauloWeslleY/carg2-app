import { call, put, takeLatest } from "redux-saga/effects";
import {
  driverServices,
  loadDriverTruckInfo,
  setDriverTruckInfoError,
  setDriverTruckInfoFailure,
  setDriverTruckInfoPending,
  setDriverTruckInfoRequest,
} from "@/main/store/ducks/driver";
import { DriverModel } from "@/data/models";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import { PayloadAction } from "@reduxjs/toolkit";

const notifyToast = makeNotifyToast();
function* loadDriverTruckInfoSaga(action: PayloadAction<{ id: string }>) {
  yield put(setDriverTruckInfoPending(true));

  try {
    const data: DriverModel = yield call(
      driverServices.getDriverTruckInfo,
      action.payload.id
    );

    yield put(setDriverTruckInfoRequest(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(setDriverTruckInfoError(false));
      yield put(setDriverTruckInfoFailure(error));
      notifyToast.error({ title: error.message });
    }
  } finally {
    yield put(setDriverTruckInfoPending(false));
  }
}

export function* driverTruckInfoSaga() {
  yield takeLatest(loadDriverTruckInfo, loadDriverTruckInfoSaga);
}
