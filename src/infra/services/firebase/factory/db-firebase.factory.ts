import { Auth } from "firebase/auth";
import { IFirebase, initApp, RemoteFirebase } from "../app";
import {
  IFirebaseAuthSignIn,
  IFirebaseAuthSignUp,
  IFirebaseSignOut,
  RemoteFirebaseAuthSignIn,
  RemoteFirebaseAuthSignUp,
  RemoteFirebaseSignOut,
} from "../../firebase-auth";

export class DBFirebase {
  static database(): IFirebase {
    return new RemoteFirebase({ initApp: initApp.initializeApp() });
  }

  static signUpAuth(auth: Auth): IFirebaseAuthSignUp {
    return new RemoteFirebaseAuthSignUp({ auth });
  }

  static signInAuth(auth: Auth): IFirebaseAuthSignIn {
    return new RemoteFirebaseAuthSignIn({ auth });
  }

  static signOutAuth(auth: Auth): IFirebaseSignOut {
    return new RemoteFirebaseSignOut({ auth });
  }
}
