import {
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useFormCreateDriverTruck } from "./hooks/useFormCreateDriverTruck";
import { FormCreateDriverTruck, TableDriverTruck } from "./components";
import { useTableDriverTruck } from "./hooks/useTableDriverTruck";

export function DriverTruck() {
  const navTab = ["Cadastro", "Listagem de Dados"];

  return (
    <Container maxW="8xl">
      <Tabs variant="enclosed" colorScheme="green" mt="10">
        <TabList>
          {navTab.map((tab, index) => {
            return <Tab key={index}>{tab}</Tab>;
          })}
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>
              <Text as="h3" fontFamily="poppins" fontSize="2xl">
                Cadastro de Motorista de Caminhão
              </Text>

              <FormCreateDriverTruck {...useFormCreateDriverTruck()} />
            </div>
          </TabPanel>
          <TabPanel>
            <TableDriverTruck {...useTableDriverTruck()} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
