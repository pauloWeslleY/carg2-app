import {
  chakra,
  Link,
  useColorModeValue,
  Box,
  SimpleGrid,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { NavBarSubMenuItem } from "./navbar-sub-menu-item";
import { useNavMenu } from "./hooks/useNavMenu";
import { LogOutIcon } from "lucide-react";

export function NavBarSubMenu() {
  const hbg = useColorModeValue("green.600", "green.400");
  const tcl = useColorModeValue("whiteAlpha.900", "gray.50");
  const hbgh = useColorModeValue("blackAlpha.400", "blackAlpha.500");
  const { loadSubMenu, handlerLogout } = useNavMenu();

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 5 }}
        pos="relative"
        gap={{ base: 6, sm: 8 }}
        px={5}
        py={6}
        p={{ sm: 8 }}
        bg="green.100"
        _dark={{
          bg: "gray.900",
        }}
      >
        {loadSubMenu.slice(0, 2).map((menu, i) => {
          return <NavBarSubMenuItem key={i} menu={menu} />;
        })}
      </SimpleGrid>
      <Box px={{ base: 5, sm: 8 }} py={5} bg={hbg} display={{ sm: "flex" }}>
        <Stack direction={{ base: "row" }} spacing={{ base: 6, sm: 10 }}>
          <Box display="flow-root">
            <Link
              m={-3}
              p={3}
              display="flex"
              alignItems="center"
              rounded="md"
              fontSize="md"
              color={tcl}
              _hover={{ bg: hbgh }}
              onClick={handlerLogout}
            >
              <Icon as={LogOutIcon} flexShrink={0} h={6} w={6} />
              <chakra.span ml={3}>Logout</chakra.span>
            </Link>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
