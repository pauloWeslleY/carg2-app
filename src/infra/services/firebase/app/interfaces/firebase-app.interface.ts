import { FirebaseApp } from "firebase/app";

export namespace IFirebaseApp {
  export type Params = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
}

export interface IFirebaseApp {
  initializeApp(): FirebaseApp;
}
