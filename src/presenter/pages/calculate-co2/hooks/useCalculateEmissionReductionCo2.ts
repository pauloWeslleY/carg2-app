import { makeNotifyToast } from "@/main/factories/notify-toast";
import {
  loadEmissionCo2OptimizedCreate,
  useStateEmissionCo2Optimized,
} from "@/main/store/ducks/emission-co2";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
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

  const { loadOriginalEmissions, loadEmissionCo2Reduction } = useMemo(() => {
    const loadOriginalEmissions =
      emissionOriginal.distanceKm * emissionOriginal.vehicleEmissionFactor;
    const optimizedEmissions =
      emissionOptimized.distanceKmOptimized *
      emissionOptimized.vehicleEmissionFactorOptimized;
    // Potencial de redução de emissões
    const loadEmissionCo2Reduction = loadOriginalEmissions - optimizedEmissions;

    if (isNaN(loadEmissionCo2Reduction)) {
      return {
        loadOriginalEmissions: 0,
        loadEmissionCo2Reduction: 0,
      };
    }

    return {
      loadOriginalEmissions,
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
    loadOriginalEmissions,
    loadEmissionCo2Reduction,
    handlerChangeInputEmissionOriginal,
    handlerChangeInputEmissionOptimized,
    handlerCreateEmissionCo2Reduction,
  };
}
