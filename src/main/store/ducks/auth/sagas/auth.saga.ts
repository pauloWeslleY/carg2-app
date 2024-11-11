import { call, delay, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  authService,
  loadAuthentication,
  setAuthFailure,
  setAuthPending,
  setAuthRequest,
  setAuthSuccess,
} from "@/main/store/ducks/auth";
import { AccountModel } from "@/data/models";
import { IAuth } from "@/infra/services/firebase-auth";
import { setCurrentUserAdapter } from "@/main/adapters/user-adapter";
import { makeNotifyToast } from "@/main/factories/notify-toast";

const notifyToast = makeNotifyToast();

function* loadAuthenticationSaga({
  payload,
}: PayloadAction<IAuth.FirebaseDTO>) {
  yield put(setAuthPending(true));

  try {
    yield delay(1000);
    const data: AccountModel = yield call(authService.signIn, payload);

    yield put(setAuthSuccess(true));
    yield put(setAuthRequest(data));
    setCurrentUserAdapter(data);
    notifyToast.success({ title: `Usuário ${data.username} Autenticado.` });
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setAuthFailure(error.message));
      notifyToast.error({ title: error.message });
      return;
    }
  } finally {
    yield put(setAuthPending(false));
  }
}

export function* authenticationSaga() {
  yield takeLatest(loadAuthentication, loadAuthenticationSaga);
}
