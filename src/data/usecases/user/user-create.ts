import { UserCredential } from "firebase/auth";
import { AccountModel } from "@/data/models";

export interface IUserCreateDTO {
  credential: UserCredential | null;
  username: string;
}

export interface IUserCreate {
  create(params: IUserCreateDTO): Promise<AccountModel>;
}
