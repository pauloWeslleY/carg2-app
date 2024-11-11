import { Box, Icon, chakra, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { SubMenuType } from "./types/nav-menu.type";

type NavBarSubMenuItemProps = {
  menu: SubMenuType;
};

export function NavBarSubMenuItem({ menu }: NavBarSubMenuItemProps) {
  const { title, icon, description, to } = menu;
  const ic = useColorModeValue("green.700", "green.50");
  const hbg = useColorModeValue("whiteAlpha.800", "green.600");
  const tcl = useColorModeValue("green.700", "gray.50");
  const dcl = useColorModeValue("blackAlpha.900", "gray.50");

  return (
    <Box
      as={Link}
      to={to}
      m={-3}
      p="3"
      display="flex"
      alignItems="start"
      rounded="lg"
      _hover={{ bg: hbg }}
    >
      {icon && <Icon flexShrink={0} h="6" w="6" color={ic} as={icon} />}

      <Box ml="4">
        <chakra.p fontSize="sm" fontWeight="700" color={tcl}>
          {title}
        </chakra.p>
        {description && (
          <chakra.p mt="1" fontSize="sm" color={dcl}>
            {description}
          </chakra.p>
        )}
      </Box>
    </Box>
  );
}
