import { call, cancel, put, takeLatest } from "redux-saga/effects";
import {
  emissionCo2Services,
  loadEmissionCo2List,
  setEmissionCo2Error,
  setEmissionCo2Failure,
  setEmissionCo2Pending,
  setEmissionCo2Request,
} from "@/main/store/ducks/emission-co2";
import { EmissionCo2Model } from "@/data/models";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import { Task } from "redux-saga";
import { COLLECTION } from "@/infra/services/firebase";

const notify = makeNotifyToast();

function* loadEmissionCo2ListSaga() {
  yield put(setEmissionCo2Pending(true));

  try {
    const data: EmissionCo2Model[] = yield call(
      emissionCo2Services.getEmissionCo2,
      COLLECTION.emissionCo2
    );

    yield put(setEmissionCo2Request(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setEmissionCo2Error(true));
      yield put(setEmissionCo2Failure(error));
      notify.success({ title: error.message });
    }
  } finally {
    yield put(setEmissionCo2Pending(false));
  }
}

export function* emissionCo2ListSaga() {
  const task: Task = yield takeLatest(
    loadEmissionCo2List,
    loadEmissionCo2ListSaga
  );
  yield takeLatest(setEmissionCo2Request, function* () {
    yield cancel(task);
  });
}
