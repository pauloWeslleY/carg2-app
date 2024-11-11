import { Flex, Box, Stack } from "@chakra-ui/react";
import { useLogin } from "./hook/useLogin";
import { AuthHeader, Login } from "./components";

export function AuthLogin() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      _dark={{
        bg: "gray.800",
      }}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <AuthHeader title="Sign in to your account" />

        <Box
          rounded="lg"
          boxShadow="lg"
          p={8}
          bg="whiteAlpha.50"
          _dark={{
            bg: "gray.700",
          }}
        >
          <Login {...useLogin()} />
        </Box>
      </Stack>
    </Flex>
  );
}
