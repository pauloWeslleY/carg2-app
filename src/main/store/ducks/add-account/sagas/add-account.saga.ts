import { call, delay, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  addAccountService,
  loadAddAccount,
} from "@/main/store/ducks/add-account";
import {
  setAuthFailure,
  setAuthPending,
  setAuthRequest,
  setAuthSuccess,
} from "@/main/store/ducks/auth";
import { IAddAccountDTO } from "@/data/usecases/add-account/add-account";
import { UserCredential } from "firebase/auth";
import { AccountModel } from "@/data/models";
import { makeNotifyToast } from "@/main/factories/notify-toast";

const notifyToast = makeNotifyToast();

function* addAccountSaga({ payload }: PayloadAction<IAddAccountDTO>) {
  yield put(setAuthPending(true));

  try {
    yield delay(500);
    const credential: UserCredential = yield call(
      addAccountService.createAccount,
      payload
    );

    const user: AccountModel = yield call(addAccountService.createUser, {
      credential,
      username: payload.username,
    });

    yield put(setAuthSuccess(true));
    yield put(setAuthRequest(user));
    notifyToast.success({
      title: "Usuário cadastrado.",
      description: "Sua conta foi cadastrada com sucesso",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setAuthFailure(error.message));
      notifyToast.error({ title: error.message });
    }
  } finally {
    yield put(setAuthPending(false));
  }
}

export function* createAccountSaga() {
  yield takeLatest(loadAddAccount, addAccountSaga);
}
