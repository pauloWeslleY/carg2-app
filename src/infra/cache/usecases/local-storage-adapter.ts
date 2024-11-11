import { IStorage } from "../interfaces/storage.interfaces";

export class LocalStorageGetAdapter<T> implements IStorage.Get<T> {
  get(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
  }
}

export class LocalStorageSetAdapter implements IStorage.Set {
  set(key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}

export class LocalStorageDeleteAdapter implements IStorage.Delete {
  delete(key: string) {
    return localStorage.removeItem(key);
  }
}
