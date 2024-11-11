export namespace IStorage {
  export interface Set {
    set(key: string, value: object): void;
  }

  export interface Get<T> {
    get(key: string): T | null;
  }

  export interface Delete {
    delete(key: string): void;
  }
}
