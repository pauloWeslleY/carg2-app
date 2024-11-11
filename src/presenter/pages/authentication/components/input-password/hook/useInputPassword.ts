import { useState } from "react";

export function useInputPassword() {
  const [showPassword, setShowPassword] = useState(false);

  function handlerShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  return {
    showPassword,
    handlerShowPassword,
  };
}
