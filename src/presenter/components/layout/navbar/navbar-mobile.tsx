import {
  Button,
  CloseButton,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { HouseIcon, VideoIcon, InboxIcon } from "lucide-react";

type NavBarMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NavBarMobile({ isOpen, onClose }: NavBarMobileProps) {
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
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<HouseIcon />}>
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<InboxIcon />}
      >
        Inbox
      </Button>
      <Button w="full" variant="ghost" leftIcon={<VideoIcon />}>
        Videos
      </Button>
    </VStack>
  );
}
