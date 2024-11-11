import { EmissionCo2Model } from "@/data/models";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

type TableCo2Props = {
  header: string[];
  data: EmissionCo2Model[];
};

export function TableCo2({ header, data }: TableCo2Props) {
  const color1 = useColorModeValue("gray.400", "gray.400");

  return (
    <Table
      w="full"
      bg="whiteAlpha.500"
      _dark={{ bg: "gray.800" }}
      display={{
        base: "block",
        md: "table",
      }}
      sx={{
        "@media print": {
          display: "table",
        },
      }}
    >
      <Thead
        display={{
          base: "none",
          md: "table-header-group",
        }}
        sx={{
          "@media print": {
            display: "table-header-group",
          },
        }}
      >
        <Tr>
          {header.map((header) => (
            <Th key={header} fontWeight="semibold" fontSize="lg">
              {header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody
        display={{
          base: "block",
          lg: "table-row-group",
        }}
        sx={{
          "@media print": {
            display: "table-row-group",
          },
        }}
      >
        {data.map((emission) => {
          return (
            <Tr
              key={emission.id}
              display={{
                base: "grid",
                md: "table-row",
              }}
              sx={{
                "@media print": {
                  display: "table-row",
                },
                gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                gridGap: "10px",
              }}
            >
              <Td
                display={{
                  base: "table-cell",
                  md: "none",
                }}
                sx={{
                  "@media print": {
                    display: "none",
                  },
                  textTransform: "uppercase",
                  color: color1,
                  fontSize: "xs",
                  fontWeight: "bold",
                  letterSpacing: "wider",
                  fontFamily: "heading",
                }}
              >
                {emission.co2}
              </Td>
              <Td fontSize="md" fontWeight="normal">
                {emission.distanceKM} (KM)
              </Td>
              <Td fontSize="md" fontWeight="normal">
                {emission.co2.toFixed(2)}kg
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
