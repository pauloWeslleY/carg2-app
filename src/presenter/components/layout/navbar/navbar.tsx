import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, MenuIcon, ChevronDownIcon } from "lucide-react";
import { NavBarMobile } from "./navbar-mobile";
import { NavBarSubMenu } from "./navbar-sub-menu";
import { useNavMenu } from "./hooks/useNavMenu";

export function NavBar() {
  const bg = useColorModeValue("green.100", "gray.900");
  const cl = useColorModeValue("green.900", "green.200");
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const { user, mobileNav, toggleColorMode } = useNavMenu();

  return (
    <chakra.header h="full" bg={bg} w="full" px={{ base: 2, sm: 4 }} py={4}>
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack gap="5" alignItems="center">
          <Image src="/logotipo.svg" w="40" h="10" />

          <Box display={{ base: "none", md: "inline-flex" }}>
            <HStack spacing={1}>
              <Box role="group">
                <Button
                  bg={bg}
                  color="gray.500"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: "none" }}
                  rightIcon={<ChevronDownIcon />}
                >
                  Dados da Api
                </Button>
                <Box
                  pos="absolute"
                  left={0}
                  w="full"
                  display="none"
                  _groupHover={{ display: "block" }}
                  zIndex={2}
                >
                  <NavBarSubMenu />
                </Box>
              </Box>
            </HStack>
          </Box>
        </HStack>

        <Box display="flex" alignItems="center">
          {user && (
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm" fontWeight="bold">
                {user.username}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {user.email}
              </Text>
            </VStack>
          )}

          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml={{ base: "0", md: "3" }}
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
          />
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            fontSize="20px"
            color="gray.800"
            _dark={{ color: "inherit" }}
            variant="ghost"
            icon={<MenuIcon />}
            onClick={mobileNav.onOpen}
          />
        </Box>
      </Flex>

      <NavBarMobile isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </chakra.header>
  );
}
