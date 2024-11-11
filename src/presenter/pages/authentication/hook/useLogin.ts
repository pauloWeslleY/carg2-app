import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loadAuthentication, useStateAuth } from "@/main/store/ducks/auth";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { LoginSchema } from "../schemas/login.schema";
import type { FormLoginProps } from "../types/login.type";
import { useAuthRedirect } from "./useAuthRedirect";

export function useLogin() {
  const { isLoading, isSuccess } = useAppSelector(useStateAuth);
  const { handlerRedirectAuthSuccess } = useAuthRedirect();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    handlerRedirectAuthSuccess(isSuccess);
  }, [handlerRedirectAuthSuccess, isSuccess]);

  function handlerLogin(params: FormLoginProps) {
    dispatch(loadAuthentication({ ...params }));
  }

  function isValidaInputLogin() {
    return errors.email?.message && errors.password?.message;
  }

  return {
    errors,
    isLoading,
    isSubmitting,
    register,
    handleSubmit,
    handlerLogin,
    isValidaInputLogin,
  };
}
