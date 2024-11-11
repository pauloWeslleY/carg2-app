import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  authService,
  loadAuthSignOut,
  setAuthFailure,
  setAuthPending,
} from "@/main/store/ducks/auth";
import { removeCurrentUserAdapter } from "@/main/adapters/user-adapter";
import { makeNotifyToast } from "@/main/factories/notify-toast";

const notifyToast = makeNotifyToast();
function* loadAuthSignOutSaga() {
  yield put(setAuthPending(true));

  try {
    yield delay(1000);
    yield call(authService.signOut);

    removeCurrentUserAdapter();
    notifyToast.success({ title: "O Usuário saiu do app" });
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

export function* authSignOutSaga() {
  yield takeLatest(loadAuthSignOut, loadAuthSignOutSaga);
}
