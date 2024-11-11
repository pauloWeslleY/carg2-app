import { FirebaseError } from "firebase/app";
import { UserCredential } from "firebase/auth";
import { RemoteError } from "@/data/errors";
import { IAddAccount, IAddAccountDTO } from "@/data/usecases";
import { IFirebaseAuthSignUp } from "@/infra/services/firebase-auth";

interface RemoteAddAccountDependencies {
  auth: IFirebaseAuthSignUp;
}

export class RemoteAddAccount implements IAddAccount {
  private credential: UserCredential | null;
  private auth: IFirebaseAuthSignUp;

  constructor(protected dependencies: RemoteAddAccountDependencies) {
    this.auth = dependencies.auth;
    this.credential = null;
  }

  async register(params: IAddAccountDTO): Promise<RemoteAddAccount.Model> {
    try {
      this.credential = await this.auth.authSignUp(params);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const hasError = new RemoteError();
        const errorMessage = hasError.getErrorMessage(error?.code);
        throw new Error(errorMessage?.message);
      }
    }

    if (!this.credential) {
      throw new Error("Error ao cadastrar conta");
    }

    return this.credential;
  }
}

namespace RemoteAddAccount {
  export type Model = UserCredential;
}
