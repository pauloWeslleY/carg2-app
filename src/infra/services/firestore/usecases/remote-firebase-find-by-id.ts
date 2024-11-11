import { RemoteError } from "@/data/errors";
import { doc, FirestoreError, getDoc } from "firebase/firestore";
import { IFirebase } from "@/infra/services/firebase";
import { CollectionsType } from "@/infra/services/firebase/collections/collections";
import { IFirebaseFindById } from "../interfaces";

interface RemoteFirebaseFindByIdDependencies {
  database: IFirebase;
  collection: CollectionsType;
}

export class RemoteFirebaseFindById<R> implements IFirebaseFindById<R> {
  private database: IFirebase;
  private collection: CollectionsType;
  private data: R | null;

  constructor(
    protected readonly dependencies: RemoteFirebaseFindByIdDependencies
  ) {
    this.database = dependencies.database;
    this.collection = dependencies.collection;
    this.data = null;
  }

  async findById(id: string): Promise<R> {
    try {
      const docSnapshot = await getDoc(
        doc(this.database.getDB(), this.collection, id)
      );

      this.data = { ...docSnapshot.data(), id: docSnapshot.id } as R;
    } catch (error: unknown) {
      if (error instanceof FirestoreError) {
        const hasError = new RemoteError();
        const errorMessage = hasError.getErrorMessage(error?.code);
        throw new Error(errorMessage?.message);
      }
    }

    if (!this.data) {
      throw new Error("Falha ao buscar os dados");
    }

    return this.data;
  }
}
