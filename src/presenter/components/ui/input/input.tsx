import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Input as InputChakra,
} from "@chakra-ui/react";
import { ComponentProps, forwardRef } from "react";

type InputType = InputProps &
  ComponentProps<"input"> & {
    label: string;
    error?: boolean;
    helperText?: string | undefined;
  };

export const Input = forwardRef<HTMLInputElement, InputType>((props, ref) => {
  const {
    error = false,
    helperText = "",
    name = "",
    label = "",
    ...rest
  } = props;

  return (
    <FormControl id={name} isInvalid={error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputChakra
        {...rest}
        ref={ref}
        name={name}
        isInvalid={error}
        variant="filled"
        focusBorderColor="green.500"
      />
      {helperText && (
        <FormErrorMessage fontWeight="medium">{helperText}</FormErrorMessage>
      )}
    </FormControl>
  );
});

Input.displayName = "Input";
