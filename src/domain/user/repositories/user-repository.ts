import { updateProfile, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { COLLECTION, IFirebase } from "@/infra/services/firebase";
import { User } from "@/domain/user/entities/user";
import { FirebaseError } from "firebase/app";
import { AppError } from "@/data/errors/usecases/app-error";

export interface IUserRepository {
  save(credential: UserCredential | null, user: User): Promise<void>;
}

export class UserRepository implements IUserRepository {
  constructor(private readonly database: IFirebase) {}

  async save(credential: UserCredential | null, user: User): Promise<void> {
    if (!credential) {
      throw new Error("Não foi possível cadastrar usuário");
    }

    try {
      const userDoc = doc(
        this.database.collection(COLLECTION.users),
        credential.user.uid
      );

      await setDoc(userDoc, {
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new AppError(error);
      }
    }

    await updateProfile(credential.user, {
      displayName: user.username,
    });
  }
}
