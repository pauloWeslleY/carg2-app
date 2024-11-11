import { Stack, Button, Text, Link, Alert, AlertIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../hook/useLogin";
import { Input } from "@/presenter/components/ui";
import { InputPassword } from "../input-password/input-password";

type LoginProps = ReturnType<typeof useLogin>;

export function Login(props: LoginProps) {
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
    handlerLogin,
    isValidaInputLogin,
  } = props;

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit(handlerLogin)}>
      <Input
        {...register("email")}
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
      />

      <InputPassword
        {...register("password")}
        error={!!errors.password?.message}
        helperText={errors.password?.message}
      />

      <Stack>
        <Button
          type="submit"
          loadingText="Autenticando..."
          isLoading={isLoading}
          size="lg"
          bg="green.400"
          color="whiteAlpha.900"
          _hover={{ bg: "green.500" }}
        >
          Sign in
        </Button>

        {isValidaInputLogin() && (
          <Alert status="error" rounded="md">
            <AlertIcon />
            <Text as="span" fontWeight="semibold" color="whiteAlpha.900">
              Preencha os campos!
            </Text>
          </Alert>
        )}
      </Stack>
      <Stack pt={6}>
        <Text align="center">
          Already a user?{" "}
          <Link
            as={NavLink}
            to="/register"
            color="teal.400"
            fontWeight="semibold"
          >
            Login
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
}
