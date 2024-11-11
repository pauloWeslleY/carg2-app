import React from "react";
import {
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTableDriverTruck } from "../hooks/useTableDriverTruck";
import type { TableDriverTruckType } from "../types/table-driver-truck.type";
import { SideBarDriveTruck } from "./side-bar-driver-truck-info";

type TableDriverTruckProps = ReturnType<typeof useTableDriverTruck>;

export function TableDriverTruck(props: TableDriverTruckProps) {
  const { loadTableDriver, tableHeader } = props;
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  return (
    <Table
      w="full"
      bg="white"
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
          {tableHeader.map((header) => (
            <Th key={header} fontWeight="semibold" fontSize="md">
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
        {loadTableDriver.map((driverTruck) => {
          return (
            <Tr
              key={driverTruck.id}
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
              {(
                Object.keys(driverTruck) as Array<keyof TableDriverTruckType>
              ).map((x) => {
                return (
                  <React.Fragment key={`${driverTruck.id}${x}`}>
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
                        fontFamily: "poppins",
                      }}
                    >
                      {x}
                    </Td>
                    <Td fontSize="md" fontWeight="normal">
                      {driverTruck[x]}
                    </Td>
                  </React.Fragment>
                );
              })}
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
                  color: color2,
                  fontSize: "xs",
                  fontWeight: "bold",
                  letterSpacing: "wider",
                  fontFamily: "heading",
                }}
              >
                Ações
              </Td>
              <Td textAlign="center">
                <ButtonGroup variant="outline" size="sm">
                  <SideBarDriveTruck driverTruckId={driverTruck.id} />
                </ButtonGroup>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
