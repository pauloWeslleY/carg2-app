import { useCallback, useEffect, useMemo } from "react";
import { useStateDriver, loadDriverList } from "@/main/store/ducks/driver";
import { useAppSelector, useAppDispatch } from "@/main/store/hook/useRedux";

export function useTableDriverTruck() {
  const { data: loadDriverAll, isLoading } = useAppSelector(useStateDriver);
  const dispatch = useAppDispatch();

  const getDriverAll = useCallback(() => {
    dispatch(loadDriverList());
  }, [dispatch]);

  useEffect(() => {
    getDriverAll();
  }, [getDriverAll]);

  const tableColumns = { base: 1, md: 7 };

  const { tableHeader, loadTableDriver } = useMemo(() => {
    const loadDriverTruckList = loadDriverAll ?? [];
    const tableHeader = [
      "ID",
      "Nome",
      "Sobrenome",
      "E-mail",
      "KM - Rodados",
      "CPF",
      "CNH",
      "Ações",
    ];

    const loadTableDriver = loadDriverTruckList.map((driver) => ({
      id: driver.id,
      name: driver.name,
      lastName: driver.lastName,
      email: driver.email,
      totalKmDriven: `${driver.totalKmDriven} KM`,
      CPF: driver.CPF,
      CNH: driver.CNH,
    }));

    return {
      tableHeader,
      loadTableDriver,
    };
  }, [loadDriverAll]);

  return {
    isLoading,
    tableHeader,
    tableColumns,
    loadTableDriver,
  };
}
