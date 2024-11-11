import { Heading, Image, Stack } from "@chakra-ui/react";

export function AuthHeader({ title = "" }: { title: string }) {
  return (
    <Stack align="center">
      <Image src="/logotipo.svg" w="40" h="10" />
      <Heading fontSize="4xl" fontFamily="poppins" fontWeight="medium">
        {title}
      </Heading>
    </Stack>
  );
}
