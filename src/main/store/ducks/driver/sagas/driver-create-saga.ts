import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { ICreateDriverDTO } from "@/data/usecases";
import {
  driverServices,
  loadCreateDriver,
  setDriverError,
  setDriverFailure,
  setDriverPending,
  setDriverRequest,
} from "@/main/store/ducks/driver";
import { DriverModel } from "@/data/models";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import { RootState } from "@/main/store/types/types";

const notifyToast = makeNotifyToast();
function* loadCreateDriverSaga({ payload }: PayloadAction<ICreateDriverDTO>) {
  yield put(setDriverPending(true));
  const state: RootState = yield select();
  const drivers = state.driver.data ?? [];

  try {
    const data: DriverModel = yield call(driverServices.create, payload);

    yield put(setDriverRequest([...drivers, data]));
    notifyToast.success({ title: "Cadastro Concluído" });
  } catch (error) {
    if (error instanceof Error) {
      yield put(setDriverError(false));
      yield put(setDriverFailure(error));
      notifyToast.error({ title: error.message });
    }
  } finally {
    yield put(setDriverPending(false));
  }
}

export function* createDriverSaga() {
  yield takeLatest(loadCreateDriver, loadCreateDriverSaga);
}
