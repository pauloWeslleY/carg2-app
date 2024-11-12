import { makeNotifyToast } from "@/main/factories/notify-toast";
import {
  loadCreateEmissionCo2,
  useStateEmissionCo2,
} from "@/main/store/ducks/emission-co2";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { Co2 } from "@/presenter/constants/co2-per-liter";
import { useState, useMemo, ChangeEvent } from "react";

export function useCalculateCo2() {
  const [emission, setEmission] = useState({
    distanceKm: 0,
    vehicleEmissionFactor: 0,
  });
  const { data: loadEmissionCo2, isLoading } =
    useAppSelector(useStateEmissionCo2);
  const dispatch = useAppDispatch();

  const loadCalculateCarbonEmissions = useMemo(() => {
    const CO2_PER_LITER = Co2.PER_LITER; // Emissão em kg de CO2 por litro de diesel
    const fuelUsed = emission.distanceKm / emission.vehicleEmissionFactor;
    const totalCO2Emission = fuelUsed * CO2_PER_LITER;

    if (isNaN(totalCO2Emission)) return 0;
    return totalCO2Emission;
  }, [emission]);

  function handlerChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEmission((prev) => ({ ...prev, [name]: value }));
  }

  function handlerCreateEmissionCo2() {
    const notify = makeNotifyToast();
    if (emission.distanceKm === 0 || loadCalculateCarbonEmissions === 0) {
      notify.warning({ title: "Informe os número para o calculo" });
      return;
    }

    const emissionCO2 = {
      distanceKM: emission.distanceKm,
      co2: loadCalculateCarbonEmissions,
    };

    dispatch(loadCreateEmissionCo2(emissionCO2));
    setEmission({ distanceKm: 0, vehicleEmissionFactor: 0 });
  }

  return {
    emission,
    isLoading,
    loadEmissionCo2,
    loadCalculateCarbonEmissions,
    handlerChangeInput,
    handlerCreateEmissionCo2,
  };
}
