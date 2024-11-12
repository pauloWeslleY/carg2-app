import { makeNotifyToast } from "@/main/factories/notify-toast";
import {
  loadEmissionCo2OptimizedCreate,
  useStateEmissionCo2Optimized,
} from "@/main/store/ducks/emission-co2";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { Co2 } from "@/presenter/constants/co2-per-liter";
import { ChangeEvent, useMemo, useState } from "react";

export function useCalculateEmissionReductionCo2() {
  const [emissionOriginal, setEmissionOriginal] = useState({
    distanceKm: 0,
    vehicleEmissionFactor: 0,
  });
  const [emissionOptimized, setEmissionOptimized] = useState({
    distanceKmOptimized: 0,
    vehicleEmissionFactorOptimized: 0,
  });
  const { isLoading } = useAppSelector(useStateEmissionCo2Optimized);
  const dispatch = useAppDispatch();

  const { totalCO2Emission, loadEmissionCo2Reduction } = useMemo(() => {
    const CO2_PER_LITER = Co2.PER_LITER; // Emissão em kg de CO2 por litro de diesel
    const fuelUsed =
      emissionOriginal.distanceKm / emissionOriginal.vehicleEmissionFactor;
    const totalCO2Emission = fuelUsed * CO2_PER_LITER;

    const optimizedEmissions =
      emissionOptimized.distanceKmOptimized *
      emissionOptimized.vehicleEmissionFactorOptimized;
    // Potencial de redução de emissões
    const loadEmissionCo2Reduction = totalCO2Emission - optimizedEmissions;

    if (isNaN(loadEmissionCo2Reduction)) {
      return {
        totalCO2Emission: 0,
        loadEmissionCo2Reduction: 0,
      };
    }

    return {
      totalCO2Emission,
      loadEmissionCo2Reduction,
    };
  }, [emissionOriginal, emissionOptimized]);

  function handlerChangeInputEmissionOriginal(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setEmissionOriginal((prev) => ({ ...prev, [name]: value }));
  }

  function handlerChangeInputEmissionOptimized(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setEmissionOptimized((prev) => ({ ...prev, [name]: value }));
  }

  function handlerCreateEmissionCo2Reduction() {
    const notify = makeNotifyToast();
    if (
      emissionOptimized.distanceKmOptimized === 0 ||
      loadEmissionCo2Reduction === 0
    ) {
      notify.error({ title: "Informe os número para o calculo" });
      return;
    }
    const emissionReductionCO2 = {
      distanceKM: emissionOptimized.distanceKmOptimized,
      co2: loadEmissionCo2Reduction,
    };

    dispatch(loadEmissionCo2OptimizedCreate(emissionReductionCO2));
    setEmissionOriginal({ distanceKm: 0, vehicleEmissionFactor: 0 });
    setEmissionOptimized({
      distanceKmOptimized: 0,
      vehicleEmissionFactorOptimized: 0,
    });
  }

  return {
    isLoading,
    emissionOriginal,
    emissionOptimized,
    totalCO2Emission,
    loadEmissionCo2Reduction,
    handlerChangeInputEmissionOriginal,
    handlerChangeInputEmissionOptimized,
    handlerCreateEmissionCo2Reduction,
  };
}
