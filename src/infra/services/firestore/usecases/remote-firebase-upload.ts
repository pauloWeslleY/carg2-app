import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { IFirebase } from "@/infra/services/firebase";
import { RemoteError } from "@/data/errors";
import { IUploadFile } from "../interfaces";

interface RemoteFirebaseUploadDependencies {
  database: IFirebase;
}

export class RemoteFirebaseUpload implements IUploadFile {
  private database: IFirebase;
  private uploadURL: string;

  constructor(protected dependencies: RemoteFirebaseUploadDependencies) {
    this.database = dependencies.database;
    this.uploadURL = "";
  }

  async uploadFile({
    file,
    fileURL,
  }: IUploadFile.Params): Promise<IUploadFile.Model> {
    try {
      const uploadRef = ref(this.database.storage(), fileURL);
      const upload = await uploadBytes(uploadRef, file);
      this.uploadURL = await getDownloadURL(upload.ref);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const hasError = new RemoteError();
        const errorMessage = hasError.getErrorMessage(error?.code);
        throw new Error(errorMessage?.message);
      }
    }

    return this.uploadURL;
  }
}
