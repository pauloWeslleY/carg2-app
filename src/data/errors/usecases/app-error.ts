import { FirebaseError } from "firebase/app";
import { RemoteError } from "./remote-error-message";

export class AppError {
  constructor(private readonly error: FirebaseError) {
    this.getMessageError();
  }

  getMessageError() {
    const hasError = new RemoteError();
    const errorMessage = hasError.getErrorMessage(this.error.code);
    throw new Error(errorMessage?.message);
  }
}
