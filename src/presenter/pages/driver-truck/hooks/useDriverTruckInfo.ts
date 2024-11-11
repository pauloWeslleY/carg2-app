import {
  loadDriverTruckInfo,
  useStateDriverTruckInfo,
} from "@/main/store/ducks/driver";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useDriverTruckInfo() {
  const [driverParams, setDriverParams] = useSearchParams();
  const { data } = useAppSelector(useStateDriverTruckInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const fetchDriverTruckInfo = useCallback(() => {
    const id = driverParams.get("driverTruckId");

    if (!id) return;

    dispatch(loadDriverTruckInfo({ id }));
  }, [dispatch, driverParams]);

  useEffect(() => {
    fetchDriverTruckInfo();
  }, [fetchDriverTruckInfo]);

  const loadDriverTruckDetails = useMemo(() => {
    const withoutData = "Sem dados";
    const totalKmDrivenAdapter = data?.totalKmDriven
      ? data?.totalKmDriven.toString()
      : withoutData;

    return [
      { title: "ID:", content: data?.id ?? withoutData },
      { title: "Nome:", content: data?.name ?? withoutData },
      { title: "Sobrenome:", content: data?.lastName ?? withoutData },
      { title: "E-mail:", content: data?.email ?? withoutData },
      { title: "KM - Rodados:", content: totalKmDrivenAdapter },
      { title: "Viagens:", content: data?.trips ?? withoutData },
      { title: "CPF:", content: data?.CPF ?? withoutData },
      { title: "CNH:", content: data?.CNH ?? withoutData },
    ];
  }, [data]);

  function handlerSearchParamsDriver(id: string) {
    setDriverParams((state) => {
      if (id) {
        state.set("driverTruckId", id);
      } else {
        state.delete("driverTruckId", id);
      }
      return state;
    });
  }

  return {
    isOpen,
    onOpen,
    onClose,
    loadDriverTruckDetails,
    handlerSearchParamsDriver,
  };
}
