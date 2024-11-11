import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { loadAddAccount } from "@/main/store/ducks/add-account";
import { useStateAuth } from "@/main/store/ducks/auth";
import { FormRegisterProps } from "../types/register.type";
import { RegisterSchema } from "../schemas/register.schema";
import { useAuthRedirect } from "./useAuthRedirect";

export function useFormRegister() {
  const { isSuccess, isLoading } = useAppSelector(useStateAuth);
  const { handlerRedirectAuthSuccess } = useAuthRedirect();
  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    handlerRedirectAuthSuccess(isSuccess);
  }, [isSuccess, handlerRedirectAuthSuccess]);

  function handlerRegister(params: FormRegisterProps) {
    const name = params.name.replace(" ", "");
    const lastName = params.lastName.replace(" ", "");

    const data = {
      username: `${name}-${lastName}`,
      email: params.email,
      password: params.password,
    };

    dispatch(loadAddAccount(data));
    reset();
  }

  function isValidInput() {
    return (
      errors.name?.message &&
      errors.email?.message &&
      errors.lastName?.message &&
      errors.password?.message
    );
  }

  return {
    isLoading,
    errors,
    isSubmitting,
    register,
    handleSubmit,
    handlerRegister,
    isValidInput,
  };
}
