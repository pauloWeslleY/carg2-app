import { IAuthentication } from "@/data/usecases";
import { RemoteAuthentication } from "@/domain/authentication";
import { DBFirebase } from "@/infra/services/firebase";
import {
  IAuth,
  RemoteFirebaseAuthSignIn,
} from "@/infra/services/firebase-auth";

type AuthenticationServiceType = {
  login: IAuthentication;
};

const database = DBFirebase.database();

const makeAuthenticationService = (): AuthenticationServiceType => {
  const auth = new RemoteFirebaseAuthSignIn({ auth: database.auth() });
  const login = new RemoteAuthentication({ auth });

  return {
    login,
  };
};

export const authService = {
  signIn: async (params: IAuth.FirebaseDTO) => {
    const { login } = makeAuthenticationService();
    return await login.authentication(params);
  },
  signOut: async () => {
    const logOut = DBFirebase.signOutAuth(database.auth());
    return await logOut.signOut();
  },
};
