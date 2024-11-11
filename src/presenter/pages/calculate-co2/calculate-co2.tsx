import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
} from "@chakra-ui/react";
import {
  CalculateEmissionCo2,
  CalculateEmissionReductionCo2,
} from "./components";
import { useCalculateCo2 } from "./hooks/useCalculateCo2";
import { useCalculateEmissionReductionCo2 } from "./hooks/useCalculateEmissionReductionCo2";

export function CalculateCo2() {
  return (
    <Container maxW="8xl">
      <Tabs variant="enclosed" colorScheme="green" mt="2%">
        <TabList>
          <Tab>Calcular Taxa de Emissão de CO2</Tab>
          <Tab>Calcular Redução de Emissão de CO2 </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CalculateEmissionCo2 {...useCalculateCo2()} />
          </TabPanel>
          <TabPanel>
            <CalculateEmissionReductionCo2
              {...useCalculateEmissionReductionCo2()}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
