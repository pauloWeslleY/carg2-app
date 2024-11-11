import { FirebaseError } from "firebase/app";
import { Auth, signOut } from "firebase/auth";
import { IAuth, IFirebaseSignOut } from "../interfaces";

export class RemoteFirebaseSignOut implements IFirebaseSignOut {
  private auth: Auth;

  constructor(protected dependencies: IAuth.Dependencies<Auth>) {
    this.auth = dependencies.auth;
  }

  async signOut(): Promise<RemoteFirebaseSignOut.Model> {
    try {
      await signOut(this.auth);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new FirebaseError(error.code, error.message);
      }
    }
  }
}

namespace RemoteFirebaseSignOut {
  export type Model = void;
}
