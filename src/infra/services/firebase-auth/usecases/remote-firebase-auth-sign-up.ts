import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { IAuth, IFirebaseAuthSignUp } from "../interfaces";

export class RemoteFirebaseAuthSignUp implements IFirebaseAuthSignUp {
  private authResponse: IAuth.FirebaseModel;
  private auth: Auth;

  constructor(protected dependencies: IAuth.Dependencies<Auth>) {
    this.auth = dependencies.auth;
    this.authResponse = null;
  }

  async authSignUp(
    params: IAuth.FirebaseDTO
  ): Promise<RemoteFirebaseAuthSignUp.Model> {
    try {
      this.authResponse = await createUserWithEmailAndPassword(
        this.auth,
        params.email,
        params.password
      );
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new FirebaseError(error.code, error.message);
      }
    }

    return this.authResponse;
  }
}

namespace RemoteFirebaseAuthSignUp {
  export type Model = IAuth.FirebaseModel;
}
