import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  IconButton,
  Icon,
  Text,
  Box,
  HStack,
  Tag,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import { EyeIcon } from "lucide-react";
import { useDriverTruckInfo } from "../hooks/useDriverTruckInfo";

type SideBarDriveTruckProps = {
  driverTruckId: string;
};

export function SideBarDriveTruck({ driverTruckId }: SideBarDriveTruckProps) {
  const {
    loadDriverTruckDetails,
    isOpen,
    onOpen,
    onClose,
    handlerSearchParamsDriver,
  } = useDriverTruckInfo();

  return (
    <>
      <IconButton
        aria-label="Up"
        colorScheme="blue"
        onClick={() => {
          onOpen();
          handlerSearchParamsDriver(driverTruckId);
        }}
        icon={<Icon as={EyeIcon} />}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dados do Caminhoneiro</DrawerHeader>

          <DrawerBody>
            <VStack gap="3.5" align="flex-start">
              {loadDriverTruckDetails.map((props) => {
                return (
                  <Box key={props.title} fontWeight="semibold">
                    {props.title}
                    {typeof props.content === "string" ? (
                      <Text
                        display="inline-block"
                        ml="1"
                        fontWeight="normal"
                        color="gray.700"
                        _dark={{ color: "whiteAlpha.900" }}
                      >
                        {props.content}
                      </Text>
                    ) : (
                      <HStack
                        display="inline-flex"
                        spacing="4"
                        ml="2"
                        flexWrap="wrap"
                      >
                        {props.content.map((trip) => (
                          <Tag
                            key={trip}
                            size="lg"
                            variant="subtle"
                            colorScheme="green"
                          >
                            <TagLabel>{trip}</TagLabel>
                          </Tag>
                        ))}
                      </HStack>
                    )}
                  </Box>
                );
              })}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
