import { AccountModel } from "@/data/models";
import {
  IAddAccount,
  IAddAccountDTO,
  IUserCreate,
  IUserCreateDTO,
} from "@/data/usecases";
import { RemoteAddAccount } from "@/domain/add-account";
import { RemoteUserCreate, UserRepository } from "@/domain/user";
import { DBFirebase } from "@/infra/services/firebase";
import { RemoteFirebaseAuthSignUp } from "@/infra/services/firebase-auth";
import { UserCredential } from "firebase/auth";

type AddAccountServiceType = {
  user: IUserCreate;
  addAccount: IAddAccount;
};

const database = DBFirebase.database();

const makeAddAccountService = (): AddAccountServiceType => {
  const userRepository = new UserRepository(database);
  const user = new RemoteUserCreate(userRepository);
  const auth = new RemoteFirebaseAuthSignUp({ auth: database.auth() });
  const addAccount = new RemoteAddAccount({ auth });

  return {
    user,
    addAccount,
  };
};

export const addAccountService = {
  createUser: async (params: IUserCreateDTO): Promise<AccountModel> => {
    const { user } = makeAddAccountService();
    return await user.create(params);
  },
  createAccount: async (params: IAddAccountDTO): Promise<UserCredential> => {
    const { addAccount } = makeAddAccountService();
    return await addAccount.register(params);
  },
};
