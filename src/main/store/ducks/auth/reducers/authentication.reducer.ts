import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountModel } from "@/data/models";
import type { AuthStateProps } from "@/main/store/ducks/auth/types/authentication-state.types";
import type { RootState } from "@/main/store/types/types";

const AUTH_INITIAL_STATE = {
  user: null,
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
} satisfies AuthStateProps as AuthStateProps;

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    setAuthRequest: (state, { payload }: PayloadAction<AccountModel>) => {
      state.user = payload;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.isSuccess = payload;
    },
    setAuthPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAuthFailure: (
      state,
      { payload }: PayloadAction<Error | string | null>
    ) => {
      state.error = payload;
    },
    setLogout: (state) => {
      return { ...state, user: null };
    },
  },
});

export const {
  setAuthRequest,
  setAuthSuccess,
  setAuthPending,
  setAuthFailure,
  setLogout,
} = authenticationSlice.actions;
export const useStateAuth = (state: RootState) => state.authentication;
export const authenticationReducer = authenticationSlice.reducer;
