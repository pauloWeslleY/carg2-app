import { createAction } from "@reduxjs/toolkit";
import { IAddAccountDTO } from "@/data/usecases";

export const loadAddAccount = createAction<IAddAccountDTO>(
  "addAccount/LOAD_ADD_ACCOUNT"
);
