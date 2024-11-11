import { Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import {
  CollectionReference,
  DocumentData,
  Firestore,
} from "firebase/firestore";
import { CollectionsType } from "../../collections/collections";

export namespace IFirebase {
  export type Params = {
    id: string;
    path: CollectionsType;
    subCollection: CollectionsType;
  };

  export type CollectionParams = CollectionReference<
    DocumentData,
    DocumentData
  >;
}

export interface IFirebase {
  auth(): Auth;
  getDB(): Firestore;
  storage(): FirebaseStorage;
  collection(params: CollectionsType): IFirebase.CollectionParams;
  subCollection(params: IFirebase.Params): IFirebase.CollectionParams;
}
