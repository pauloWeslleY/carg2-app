import { User } from "firebase/auth";
import { AccountModel } from "@/data/models";

export function authenticationAdapter(
  user: User | undefined,
  token: string | undefined
): AccountModel | null {
  if (!user || !token) {
    return null;
  }

  if (!user.displayName || !user.email) {
    return null;
  }

  return {
    id: user.uid,
    email: user.email,
    username: user.displayName,
    accessToken: token,
  };
}
