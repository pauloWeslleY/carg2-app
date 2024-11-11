import { FirebaseError } from "firebase/app";
import { Errors } from "./errors";
import { FirebaseErrorCode } from "../types/firebase-errors-code.types";

export interface IError {
  getErrorMessage(params: string): FirebaseError;
}

export class RemoteError implements IError {
  getErrorMessage(params: string): FirebaseError {
    switch (params) {
      case FirebaseErrorCode.USER_NOT_FOUND:
        return new Errors.UserNotFound();
      case FirebaseErrorCode.INVALID_CREDENTIAL:
        return new Errors.InvalidCredentialError();
      case FirebaseErrorCode.EMAIL_ALREADY_IN_USE:
        return new Errors.EmailAlreadyInUse();
      case FirebaseErrorCode.INVALID_PASSWORD_WRONG:
        return new Errors.InvalidPasswordWrongError();
      case FirebaseErrorCode.INVALID_PASSWORD_WEAK:
        return new Errors.InvalidPasswordWeakError();
      case FirebaseErrorCode.PERMISSION_DENIED:
        return new Errors.PermissionDeniedError();
      case FirebaseErrorCode.TOO_MANY_REQUESTS:
        return new Errors.TooManyRequestsError();
      default:
        return new Errors.UnexpectedError();
    }
  }
}
