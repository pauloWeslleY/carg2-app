import { NavLink } from "react-router-dom";
import {
  Box,
  HStack,
  Stack,
  Button,
  Text,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useFormRegister } from "../../hook/useRegister";
import { Input } from "@/presenter/components/ui";
import { InputPassword } from "../input-password/input-password";

type RegisterProps = ReturnType<typeof useFormRegister>;

export function Register(props: RegisterProps) {
  const {
    isLoading,
    errors,
    register,
    isValidInput,
    handleSubmit,
    handlerRegister,
  } = props;

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit(handlerRegister)}>
      <HStack align="center">
        <Box>
          <Input
            {...register("name")}
            label="Nome"
            type="text"
            placeholder="Digite seu nome"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
        </Box>
        <Box>
          <Input
            {...register("lastName")}
            label="Sobrenome"
            type="text"
            placeholder="Digite seu sobrenome"
            error={!!errors.lastName?.message}
            helperText={errors.lastName?.message}
          />
        </Box>
      </HStack>
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
      <Stack spacing={10} pt={2}>
        <Button
          type="submit"
          loadingText="Cadastrando"
          isLoading={isLoading}
          size="lg"
          bg="green.400"
          color="whiteAlpha.900"
          _hover={{ bg: "green.500" }}
        >
          Sign up
        </Button>
      </Stack>
      {isValidInput() && (
        <Alert status="error" rounded="md">
          <AlertIcon />
          <Text as="span" fontWeight="semibold" color="whiteAlpha.900">
            Preencha os campos!
          </Text>
        </Alert>
      )}
      <Stack pt={6}>
        <Text align="center">
          Already a user?{" "}
          <Link as={NavLink} to="/login" color="blue.400">
            Login
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
}
