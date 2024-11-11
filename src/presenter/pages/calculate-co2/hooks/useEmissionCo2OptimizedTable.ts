import {
  loadEmissionCo2OptimizedList,
  useStateEmissionCo2Optimized,
} from "@/main/store/ducks/emission-co2";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { useCallback, useEffect } from "react";

export function useEmissionCo2OptimizedTable() {
  const { data, isLoading } = useAppSelector(useStateEmissionCo2Optimized);
  const dispatch = useAppDispatch();
  const loadEmissionCo2Optimized = data ?? [];
  const emissionCo2optimizedHeaderTable = [
    "Distância (KM) Optimizada",
    "Emissão de CO₂ Optimizado",
  ];

  const loadEmissionCo2OptimizedTable = useCallback(() => {
    dispatch(loadEmissionCo2OptimizedList());
  }, [dispatch]);

  useEffect(() => {
    loadEmissionCo2OptimizedTable();
  }, [loadEmissionCo2OptimizedTable]);

  return {
    isLoading,
    loadEmissionCo2Optimized,
    emissionCo2optimizedHeaderTable,
  };
}
