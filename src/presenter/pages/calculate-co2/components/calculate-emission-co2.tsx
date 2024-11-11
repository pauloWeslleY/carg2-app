import { Box, Button, Flex, Tag, TagLabel, Text } from "@chakra-ui/react";
import { useCalculateCo2 } from "../hooks/useCalculateCo2";
import { Input } from "@/presenter/components/ui/input/input";
import { EmissionCo2Table } from "./emission-co2-table";
import { useEmissionCo2Table } from "../hooks/useEmissionCo2Table";

type CalculateEmissionCo2Props = ReturnType<typeof useCalculateCo2>;

export function CalculateEmissionCo2(props: CalculateEmissionCo2Props) {
  const {
    emission,
    isLoading,
    loadCalculateCarbonEmissions,
    handlerChangeInput,
    handlerCreateEmissionCo2,
  } = props;

  return (
    <>
      <Text as="h3" fontFamily="poppins" fontSize="2xl" mt="2.5%">
        Calculadora de Taxa de Emissão de Carbono
      </Text>

      <Flex
        flexDir="column"
        gap="4"
        color="gray.600"
        _dark={{ color: "whiteAlpha.900" }}
      >
        <Text>
          Para estimar as emissões de carbono de uma viagem, multiplica-se a
          distância percorrida pelo fator de emissão. Por exemplo, se um carro a
          gasolina percorre 100 km com um fator de emissão de 0.2 kg CO₂/km, as
          emissões estimadas para essa viagem são:
        </Text>
        <Text as="span" textAlign="center">
          <Tag size="lg" variant="subtle" colorScheme="green" shadow="lg">
            <TagLabel> 100 km×0.2 kg CO₂/km=20 kg CO₂</TagLabel>
          </Tag>
        </Text>
        <Text>
          Essa abordagem facilita a estimativa das emissões para uma rota,
          permitindo que as empresas ou pessoas tomem decisões informadas sobre
          suas pegadas de carbono e explorem alternativas mais sustentáveis.
        </Text>
      </Flex>

      <Flex gap="2" mt="10" align="center">
        <Flex align="center" w="xl" gap="3.5">
          <Input
            label="Distância percorrida em (KM)"
            placeholder="Informe distância"
            name="distanceKm"
            type="number"
            value={emission.distanceKm}
            onChange={handlerChangeInput}
          />
          <Input
            label="Fator de emissão"
            placeholder="Informe o Fator de emissão"
            name="vehicleEmissionFactor"
            type="number"
            value={emission.vehicleEmissionFactor}
            onChange={handlerChangeInput}
          />
        </Flex>

        <Flex gap="2" flexDir="row" align="center" alignSelf="flex-end">
          <Box
            w="auto"
            h="auto"
            bg="blackAlpha.100"
            rounded="md"
            _dark={{ bg: "gray.900" }}
            p="1"
          >
            <Text fontWeight="medium" fontSize="xl">
              Emissão total de CO₂:{" "}
              <Tag variant="solid" colorScheme="green" size="lg">
                <TagLabel>{loadCalculateCarbonEmissions.toFixed(2)}</TagLabel>
              </Tag>
              kg
            </Text>
          </Box>

          <Button
            variant="outline"
            colorScheme="teal"
            onClick={handlerCreateEmissionCo2}
            isLoading={isLoading}
            loadingText="Salvando..."
          >
            Salvar
          </Button>
        </Flex>
      </Flex>

      <Flex mt="5">
        <EmissionCo2Table {...useEmissionCo2Table()} />
      </Flex>
    </>
  );
}
