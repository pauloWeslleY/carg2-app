import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { IEmissionDTO } from "@/data/usecases";
import {
  emissionCo2Services,
  loadEmissionCo2OptimizedCreate,
  setEmissionCo2OptimizedError,
  setEmissionCo2OptimizedFailure,
  setEmissionCo2OptimizedPending,
  setEmissionCo2OptimizedRequest,
} from "@/main/store/ducks/emission-co2";
import { EmissionCo2Model } from "@/data/models";
import { RootState } from "@/main/store/types/types";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import { COLLECTION } from "@/infra/services/firebase";

const notify = makeNotifyToast();

function* loadEmissionCo2OptimizedCreateSaga({
  payload,
}: PayloadAction<IEmissionDTO>) {
  yield put(setEmissionCo2OptimizedPending(true));
  const state: RootState = yield select();
  const emissionCo2Optimized = state.emissionCo2Optimized.data ?? [];

  try {
    const data: EmissionCo2Model = yield call(
      emissionCo2Services.create,
      payload,
      COLLECTION.emissionCo2Optimized
    );

    yield put(setEmissionCo2OptimizedRequest([...emissionCo2Optimized, data]));
    notify.success({ title: "Emissão de CO² Optimizada cadastrada" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setEmissionCo2OptimizedError(true));
      yield put(setEmissionCo2OptimizedFailure(error));
      notify.error({ title: error.message });
    }
  } finally {
    yield put(setEmissionCo2OptimizedPending(false));
  }
}

export function* emissionCo2OptimizedCreateSaga() {
  yield takeLatest(
    loadEmissionCo2OptimizedCreate,
    loadEmissionCo2OptimizedCreateSaga
  );
}
