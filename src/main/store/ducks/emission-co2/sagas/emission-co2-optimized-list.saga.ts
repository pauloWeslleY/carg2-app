import { call, cancel, put, takeLatest } from "redux-saga/effects";
import {
  emissionCo2Services,
  loadEmissionCo2OptimizedList,
  setEmissionCo2OptimizedError,
  setEmissionCo2OptimizedFailure,
  setEmissionCo2OptimizedPending,
  setEmissionCo2OptimizedRequest,
} from "@/main/store/ducks/emission-co2";
import { EmissionCo2Model } from "@/data/models";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import { Task } from "redux-saga";
import { COLLECTION } from "@/infra/services/firebase";

const notify = makeNotifyToast();

function* loadEmissionCo2OptimizedListSaga() {
  yield put(setEmissionCo2OptimizedPending(true));

  try {
    const data: EmissionCo2Model[] = yield call(
      emissionCo2Services.getEmissionCo2,
      COLLECTION.emissionCo2Optimized
    );

    yield put(setEmissionCo2OptimizedRequest(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setEmissionCo2OptimizedError(true));
      yield put(setEmissionCo2OptimizedFailure(error));
      notify.success({ title: error.message });
    }
  } finally {
    yield put(setEmissionCo2OptimizedPending(false));
  }
}

export function* emissionCo2OptimizedListSaga() {
  const task: Task = yield takeLatest(
    loadEmissionCo2OptimizedList,
    loadEmissionCo2OptimizedListSaga
  );
  yield takeLatest(setEmissionCo2OptimizedRequest, function* () {
    yield cancel(task);
  });
}
