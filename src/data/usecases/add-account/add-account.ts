import { UserCredential } from "firebase/auth";

export interface IAddAccountDTO {
  email: string;
  password: string;
  username: string;
}

export interface IAddAccount {
  register(params: IAddAccountDTO): Promise<UserCredential>;
}
