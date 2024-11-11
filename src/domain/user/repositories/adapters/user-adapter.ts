import { AccountModel } from "@/data/models";
import { IUser } from "@/domain/user/entities/user";

function userAdapter(user: IUser, token: string): AccountModel {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    accessToken: token,
  };
}

export const userAdapters = { userAdapter };
