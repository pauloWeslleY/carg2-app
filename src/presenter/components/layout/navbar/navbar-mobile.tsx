import {
  Button,
  CloseButton,
  Icon,
  useColorModeValue,
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
  const bg = useColorModeValue("whiteAlpha.800", "gray.900");

  return (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
      zIndex={1}
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={onClose}
      />

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
    </VStack>
  );
}
