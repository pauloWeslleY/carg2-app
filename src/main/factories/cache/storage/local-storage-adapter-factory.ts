import {
  IStorage,
  LocalStorageDeleteAdapter,
  LocalStorageGetAdapter,
  LocalStorageSetAdapter,
} from "@/infra/cache";

export namespace LocalStorageAdapter {
  export const makeLocalStorageGetAdapter = <T>(): IStorage.Get<T> => {
    return new LocalStorageGetAdapter<T>();
  };

  export const makeLocalStorageSetAdapter = (): IStorage.Set => {
    return new LocalStorageSetAdapter();
  };

  export const makeLocalStorageDeleteAdapter = (): IStorage.Delete => {
    return new LocalStorageDeleteAdapter();
  };
}
