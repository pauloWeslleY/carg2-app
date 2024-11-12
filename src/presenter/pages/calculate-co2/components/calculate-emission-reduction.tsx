import { Button, Flex, Text } from "@chakra-ui/react";
import { Input } from "@/presenter/components/ui/input/input";
import { useCalculateEmissionReductionCo2 } from "../hooks/useCalculateEmissionReductionCo2";
import { EmissionResult } from "./emission-result";
import { EmissionCo2OptimizedTable } from "./emission-co2-optimized-table";
import { useEmissionCo2OptimizedTable } from "../hooks/useEmissionCo2OptimizedTable";

type CalculateEmissionReductionCo2Props = ReturnType<
  typeof useCalculateEmissionReductionCo2
>;

export function CalculateEmissionReductionCo2(
  props: CalculateEmissionReductionCo2Props
) {
  const {
    isLoading,
    emissionOriginal,
    emissionOptimized,
    totalCO2Emission,
    loadEmissionCo2Reduction,
    handlerCreateEmissionCo2Reduction,
    handlerChangeInputEmissionOriginal,
    handlerChangeInputEmissionOptimized,
  } = props;

  return (
    <>
      <Text as="h3" fontFamily="poppins" fontSize="2xl" mt="2.5%">
        Calculadora de taxa de redução de emissão de carbono
      </Text>

      <Flex
        flexDir="column"
        gap="4"
        color="gray.600"
        _dark={{ color: "whiteAlpha.900" }}
      >
        <Text>
          O potencial de redução de emissões para cada viagem otimizada
          representa a quantidade de dióxido de carbono (CO₂) que pode ser
          evitada ao realizar ajustes na rota ou no tipo de veículo. Esses
          ajustes podem incluir a escolha de uma rota mais curta, a utilização
          de veículos mais eficientes, ou a redução da velocidade média (que
          economiza combustível).
        </Text>
        <Text>
          O potencial de redução de emissões para cada viagem otimizada
          representa a quantidade de dióxido de carbono (CO₂) que pode ser
          evitada ao realizar ajustes na rota ou no tipo de veículo. Esses
          ajustes podem incluir a escolha de uma rota mais curta, a utilização
          de veículos mais eficientes, ou a redução da velocidade média (que
          economiza combustível). Esse potencial de redução é calculado ao
          comparar as emissões da rota original com as da rota otimizada. Por
          exemplo, se uma rota original emitiria 100 kg de CO₂ e uma versão
          otimizada emitiria apenas 80 kg de CO₂, o potencial de redução seria
          de 20 kg de CO₂. Com isso, é possível estimar o impacto ambiental
          positivo de cada viagem otimizada, promovendo escolhas mais
          sustentáveis.
        </Text>
      </Flex>

      <Flex gap="2" mt="10" align="center" flexDir={["column", "row"]}>
        <Flex gap="3" w={["full", "3xl"]} flexDir={["column"]}>
          <Flex align="center" gap="3.5" flexDir={["column", "row"]}>
            <Input
              label="Distância percorrida em (KM)"
              placeholder="Informe distância"
              name="distanceKm"
              type="number"
              value={emissionOriginal.distanceKm}
              onChange={handlerChangeInputEmissionOriginal}
            />
            <Input
              label="Fator de emissão"
              placeholder="Informe o Fator de emissão"
              name="vehicleEmissionFactor"
              type="number"
              value={emissionOriginal.vehicleEmissionFactor}
              onChange={handlerChangeInputEmissionOriginal}
            />
          </Flex>
          <Flex align="center" gap="3.5" flexDir={["column", "row"]}>
            <Input
              label="Distância percorrida em (KM) Optimizada"
              placeholder="Informe distância"
              name="distanceKmOptimized"
              type="number"
              value={emissionOptimized.distanceKmOptimized}
              onChange={handlerChangeInputEmissionOptimized}
            />
            <Input
              label="Fator de emissão Optimizada"
              placeholder="Informe o Fator de emissão"
              name="vehicleEmissionFactorOptimized"
              type="number"
              value={emissionOptimized.vehicleEmissionFactorOptimized}
              onChange={handlerChangeInputEmissionOptimized}
            />
          </Flex>
        </Flex>

        <Flex gap="2" align="center" pt="8" flexDir={["column", "row"]}>
          <Flex flexDir="column" gap="2">
            <EmissionResult
              title="Emissão de CO₂"
              resultEmission={totalCO2Emission}
            />
            <EmissionResult
              title="Emissão de CO₂ Optimizada"
              resultEmission={loadEmissionCo2Reduction}
            />
          </Flex>

          <Button
            w={["full", "auto"]}
            variant="outline"
            colorScheme="teal"
            onClick={handlerCreateEmissionCo2Reduction}
            isLoading={isLoading}
            loadingText="Salvando..."
          >
            Salvar
          </Button>
        </Flex>
      </Flex>

      <Flex mt="5">
        <EmissionCo2OptimizedTable {...useEmissionCo2OptimizedTable()} />
      </Flex>
    </>
  );
}
