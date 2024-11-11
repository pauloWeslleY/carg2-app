import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEmissionCo2OptimizedTable } from "../hooks/useEmissionCo2OptimizedTable";
import { TableCo2 } from "@/presenter/components/ui";

type EmissionCo2OptimizedTableProps = ReturnType<
  typeof useEmissionCo2OptimizedTable
>;

export function EmissionCo2OptimizedTable(
  props: EmissionCo2OptimizedTableProps
) {
  const {
    isLoading,
    loadEmissionCo2Optimized,
    emissionCo2optimizedHeaderTable,
  } = props;

  if (isLoading) {
    return (
      <Flex w="full" mt="10" align="center" justify="center" gap="2">
        <Spinner size="lg" color="green.500" />
        <Text fontSize="xl">Carregando...</Text>
      </Flex>
    );
  }

  return (
    <TableCo2
      header={emissionCo2optimizedHeaderTable}
      data={loadEmissionCo2Optimized}
    />
  );
}
