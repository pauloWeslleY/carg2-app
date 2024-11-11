import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { IEmissionDTO } from "@/data/usecases";
import {
  emissionCo2Services,
  loadCreateEmissionCo2,
  setEmissionCo2Error,
  setEmissionCo2Failure,
  setEmissionCo2Pending,
  setEmissionCo2Request,
} from "@/main/store/ducks/emission-co2";
import { EmissionCo2Model } from "@/data/models";
import { RootState } from "@/main/store/types/types";
import { makeNotifyToast } from "@/main/factories/notify-toast";
import { COLLECTION } from "@/infra/services/firebase";

const notify = makeNotifyToast();

function* loadCreateEmissionCo2Saga({ payload }: PayloadAction<IEmissionDTO>) {
  yield put(setEmissionCo2Pending(true));
  const state: RootState = yield select();
  const emissionCo2 = state.emissionCo2.data ?? [];

  try {
    const data: EmissionCo2Model = yield call(
      emissionCo2Services.create,
      payload,
      COLLECTION.emissionCo2
    );

    yield put(setEmissionCo2Request([...emissionCo2, data]));
    notify.success({ title: "Emissão de CO² cadastrada" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setEmissionCo2Error(true));
      yield put(setEmissionCo2Failure(error));
      notify.error({ title: error.message });
    }
  } finally {
    yield put(setEmissionCo2Pending(false));
  }
}

export function* createEmissionCo2Saga() {
  yield takeLatest(loadCreateEmissionCo2, loadCreateEmissionCo2Saga);
}
