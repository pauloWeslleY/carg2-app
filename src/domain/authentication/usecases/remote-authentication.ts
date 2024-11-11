import { FirebaseError } from "firebase/app";
import { IAuthentication, IAuthenticationDTO } from "@/data/usecases";
import { authenticationAdapter } from "./authentication-adapter";
import { AccountModel } from "@/data/models";
import { IFirebaseAuthSignIn } from "@/infra/services/firebase-auth";
import { AppError } from "@/data/errors/usecases/app-error";

interface RemoteAuthenticationDependencies {
  auth: IFirebaseAuthSignIn;
}

export class RemoteAuthentication implements IAuthentication {
  private account: AccountModel | null;
  private auth: IFirebaseAuthSignIn;

  constructor(protected dependencies: RemoteAuthenticationDependencies) {
    this.auth = dependencies.auth;
    this.account = null;
  }

  async authentication(
    params: IAuthenticationDTO
  ): Promise<RemoteAuthentication.Model> {
    try {
      const credential = await this.auth.authSignIn(params);

      if (!credential) {
        throw new Error("Falha na autenticação");
      }

      const token = await credential.user.getIdToken();
      this.account = authenticationAdapter(credential.user, token);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    if (!this.account) {
      throw new Error("Falha ao autenticar o usuário");
    }

    return this.account;
  }
}

namespace RemoteAuthentication {
  export type Model = AccountModel;
}
