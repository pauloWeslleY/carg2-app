import {
  Button,
  CloseButton,
  HStack,
  Icon,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useNavMenu } from "./hooks/useNavMenu";
import { useNavigate } from "react-router-dom";

type NavBarMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NavBarMobile({ isOpen, onClose }: NavBarMobileProps) {
  const { loadSubMenu } = useNavMenu();
  const navigate = useNavigate();

  return (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      h={isOpen ? "300px" : "0"}
      transition="height .2s ease-in-out"
      transform={`translateY(${isOpen ? "0" : "-300px"})`}
      flexDirection="column"
      justify="center"
      gap="6"
      p="2"
      pb="4"
      bg="green.100"
      _dark={{
        bg: "gray.900",
      }}
      spacing={3}
      rounded="sm"
      shadow="sm"
      zIndex={1}
    >
      <HStack>
        <Image src="/logotipo.svg" w="40" h="10" />
      </HStack>

      {loadSubMenu.slice(0, 2).map((menu) => {
        return (
          <Button
            key={menu.title}
            onClick={() => {
              navigate(menu.to);
              onClose();
            }}
            w="full"
            variant="ghost"
            leftIcon={
              menu.icon && (
                <Icon
                  flexShrink="0"
                  h="6"
                  w="6"
                  color="green.700"
                  _dark={{ color: "green.50" }}
                  as={menu.icon}
                />
              )
            }
          >
            {menu.title}
          </Button>
        );
      })}

      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={onClose}
      />
    </VStack>
  );
}
