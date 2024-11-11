import {
  Flex,
  Button,
  Box,
  Spinner,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useFormCreateDriverTruck } from "../hooks/useFormCreateDriverTruck";
import { Input } from "@/presenter/components/ui";

type FormCreateDriverProps = ReturnType<typeof useFormCreateDriverTruck>;

export function FormCreateDriverTruck(props: FormCreateDriverProps) {
  const {
    errors,
    isLoading,
    inputTripsRef,
    trips,
    register,
    handlerAddTrip,
    handlerCreateDriverTruck,
  } = props;

  return (
    <Box
      onSubmit={handlerCreateDriverTruck}
      as="form"
      display="flex"
      flexDirection="column"
      borderWidth="1px"
      rounded="lg"
      m="10px auto"
      p="6"
    >
      {isLoading && (
        <Flex align="center" justify="center" my="2">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.500"
            size="xl"
          />
        </Flex>
      )}

      {!isLoading && (
        <Flex flexDir="column" gap="0.5">
          <Flex gap="5" flexDir={["column", "row"]}>
            <Input
              {...register("name")}
              label="Nome"
              placeholder="Digite o nome"
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />

            <Input
              {...register("lastName")}
              label="Sobrenome"
              placeholder="Digite o sobrenome"
              error={!!errors.lastName?.message}
              helperText={errors.lastName?.message}
            />

            <Input
              {...register("email")}
              label="E-mail"
              type="email"
              placeholder="Digite o e-mail"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          </Flex>

          <Flex flexDir="column" gap="2" mt="2%">
            <Flex flexDir={["column", "row"]} gap="1.5">
              <Input
                ref={inputTripsRef}
                label="Viagens"
                type="text"
                placeholder="Digite suas viagens"
              />
              <Button
                variant="outline"
                alignSelf="end"
                w={["full", "auto"]}
                onClick={handlerAddTrip}
              >
                Adicionar Viagem
              </Button>
            </Flex>

            <HStack spacing="4">
              {trips.map((trip) => {
                return (
                  <Tag
                    key={trip}
                    size="lg"
                    variant="subtle"
                    colorScheme="green"
                  >
                    <TagLabel>{trip}</TagLabel>
                    <TagCloseButton />
                  </Tag>
                );
              })}
            </HStack>
          </Flex>

          <Flex gap="5" flexDir={["column", "row"]} mt="2%">
            <Input
              {...register("totalKmDriven")}
              label="KM Rodados"
              type="number"
              placeholder="Digite os quilômetros rodados"
              error={!!errors.totalKmDriven?.message}
              helperText={errors.totalKmDriven?.message}
            />

            <Input
              {...register("CPF")}
              label="CPF"
              type="number"
              placeholder="Digite o CPF"
              error={!!errors.CPF?.message}
              helperText={errors.CPF?.message}
            />

            <Input
              {...register("CNH")}
              label="CNH"
              type="number"
              placeholder="Digite a CNH"
              error={!!errors.CNH?.message}
              helperText={errors.CNH?.message}
            />
          </Flex>
        </Flex>
      )}

      <Flex alignSelf="end" align="center" gap="3" mt="5">
        {/* <Button variant="outline" onClick={seedDriverTrucks}>
          Salvar (Seed)
        </Button> */}
        <Button
          colorScheme="teal"
          variant="solid"
          fontFamily="poppins"
          w="40"
          type="submit"
          loadingText="Cadastrando..."
          isLoading={isLoading}
        >
          Cadastrar
        </Button>
      </Flex>
    </Box>
  );
}
