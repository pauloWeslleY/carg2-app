import { Box, Tag, TagLabel, Text } from "@chakra-ui/react";

type EmissionResultProps = {
  title: string;
  resultEmission: number;
};

export function EmissionResult({
  title = "",
  resultEmission = 0,
}: EmissionResultProps) {
  return (
    <Box
      w="auto"
      h="auto"
      bg="blackAlpha.100"
      rounded="md"
      _dark={{ bg: "gray.900" }}
      p="1"
    >
      <Text fontWeight="medium" fontSize="xl">
        {title}:{" "}
        <Tag variant="solid" colorScheme="green" size="lg">
          <TagLabel>{resultEmission.toFixed(2)}</TagLabel>
        </Tag>
        kg
      </Text>
    </Box>
  );
}
