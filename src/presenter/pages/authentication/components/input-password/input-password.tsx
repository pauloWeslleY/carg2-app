import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { useInputPassword } from "./hook/useInputPassword";

type InputPasswordType = InputProps & {
  error?: boolean;
  helperText?: string | undefined;
};

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordType>(
  ({ error = false, helperText = "", ...props }, ref) => {
    const { showPassword, handlerShowPassword } = useInputPassword();

    return (
      <FormControl id="password" isInvalid={error}>
        <FormLabel>Senha</FormLabel>
        <InputGroup>
          <Input
            {...props}
            ref={ref}
            focusBorderColor="green.500"
            isInvalid={error}
            placeholder="Digite sua senha"
            variant="filled"
            type={showPassword ? "text" : "password"}
          />
          <InputRightElement h="full">
            <Button variant="ghost" onClick={handlerShowPassword}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {helperText && (
          <FormErrorMessage fontWeight="medium">{helperText}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

InputPassword.displayName = "InputPassword";
