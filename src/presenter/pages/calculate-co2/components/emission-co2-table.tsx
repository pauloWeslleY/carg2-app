import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEmissionCo2Table } from "../hooks/useEmissionCo2Table";
import { TableCo2 } from "@/presenter/components/ui";

type EmissionCo2TableProps = ReturnType<typeof useEmissionCo2Table>;

export function EmissionCo2Table(props: EmissionCo2TableProps) {
  const { emissionHeaderTable, loadEmissionCo2, isLoading } = props;

  if (isLoading) {
    return (
      <Flex w="full" mt="10" align="center" justify="center" gap="2">
        <Spinner size="lg" color="green.500" />
        <Text fontSize="xl">Carregando...</Text>
      </Flex>
    );
  }

  return <TableCo2 header={emissionHeaderTable} data={loadEmissionCo2} />;
}
