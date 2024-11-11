import {
  loadEmissionCo2List,
  useStateEmissionCo2,
} from "@/main/store/ducks/emission-co2";
import { useAppDispatch, useAppSelector } from "@/main/store/hook/useRedux";
import { useCallback, useEffect } from "react";

export function useEmissionCo2Table() {
  const { data, isLoading } = useAppSelector(useStateEmissionCo2);
  const dispatch = useAppDispatch();
  const loadEmissionCo2 = data ?? [];
  const emissionHeaderTable = ["Distância", "Emissão de CO₂"];

  const loadEmissionCo2Table = useCallback(() => {
    dispatch(loadEmissionCo2List());
  }, [dispatch]);

  useEffect(() => {
    loadEmissionCo2Table();
  }, [loadEmissionCo2Table]);

  return {
    isLoading,
    loadEmissionCo2,
    emissionHeaderTable,
  };
}
