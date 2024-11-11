import { call, cancel, put, takeLatest } from "redux-saga/effects";
import {
  driverServices,
  loadDriverList,
  setDriverError,
  setDriverFailure,
  setDriverPending,
  setDriverRequest,
} from "@/main/store/ducks/driver";
import { DriverModel } from "@/data/models";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import { Task } from "redux-saga";

const notifyToast = makeNotifyToast();
function* loadDriverListSaga() {
  yield put(setDriverPending(true));

  try {
    const data: DriverModel[] = yield call(driverServices.getDriverListAll);

    yield put(setDriverRequest(data));
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

export function* driverListSaga() {
  const task: Task = yield takeLatest(loadDriverList, loadDriverListSaga);
  yield takeLatest(setDriverRequest, function* () {
    yield cancel(task);
  });
}
