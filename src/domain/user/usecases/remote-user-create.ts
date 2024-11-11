import { FirebaseError } from "firebase/app";
import { IUserCreate, IUserCreateDTO } from "@/data/usecases";
import { User } from "@/domain/user/entities/user";
import { AccountModel } from "@/data/models";
import { RemoteError } from "@/data/errors";
import { userAdapters } from "../repositories/adapters/user-adapter";
import { IUserRepository } from "../repositories/user-repository";

export class RemoteUserCreate implements IUserCreate {
  private data: AccountModel | null;

  constructor(private readonly userRepository: IUserRepository) {
    this.data = null;
  }

  async create({
    credential,
    username,
  }: IUserCreateDTO): Promise<RemoteUserCreate.Model> {
    if (!credential) {
      throw new Error("Não foi possível cadastrar usuário");
    }

    if (!credential.user.email) {
      throw new Error("Falha ao cadastrar usuário");
    }

    try {
      const user = new User({
        id: credential.user.uid,
        email: credential.user.email,
        username,
      });

      const accessToken = await credential.user.getIdToken();
      await this.userRepository.save(credential, user);
      this.data = userAdapters.userAdapter(user, accessToken);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const hasError = new RemoteError();
        const errorMessage = hasError.getErrorMessage(error?.code);
        throw new Error(errorMessage?.message);
      }
    }

    if (!this.data) {
      throw new Error("Não foi cadastrar um usuário");
    }

    return this.data;
  }
}

namespace RemoteUserCreate {
  export type Model = AccountModel;
}
