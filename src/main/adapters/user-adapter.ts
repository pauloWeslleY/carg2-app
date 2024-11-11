import { AccountModel } from "@/data/models";
import { LocalStorageAdapter } from "../factories/cache";

const storageKey = "@USER_CARG2_APP";

export const setCurrentUserAdapter = (user: AccountModel): void => {
  const storage = LocalStorageAdapter.makeLocalStorageSetAdapter();
  storage.set(storageKey, user);
};

export const getCurrentUserAdapter = (): AccountModel | null => {
  const storage =
    LocalStorageAdapter.makeLocalStorageGetAdapter<AccountModel>();
  return storage.get(storageKey);
};

export const removeCurrentUserAdapter = (): void => {
  const storage = LocalStorageAdapter.makeLocalStorageDeleteAdapter();
  return storage.delete(storageKey);
};
