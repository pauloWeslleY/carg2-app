import { createListenerMiddleware } from "@reduxjs/toolkit";
import { loadUserAuthenticated, setAuthRequest } from "@/main/store/ducks/auth";
import { DBFirebase } from "@/infra/services/firebase";

export const userAuthenticatedListener = createListenerMiddleware();

userAuthenticatedListener.startListening({
  actionCreator: loadUserAuthenticated,
  effect: (_, { dispatch }) => {
    const database = DBFirebase.database();
    const auth = database.auth();

    auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      if (!user.email || !user.displayName) return;

      const token = await user.getIdToken();

      const userAuth = {
        id: user.uid,
        email: user.email,
        username: user.displayName,
        accessToken: token,
      };

      dispatch(setAuthRequest(userAuth));
    });
  },
});
