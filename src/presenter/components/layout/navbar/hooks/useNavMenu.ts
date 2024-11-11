import {
  CalculatorIcon,
  ChartBarBigIcon,
  FolderIcon,
  RefreshCcwIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { SubMenuType } from "../types/nav-menu.type";
import { useAppDispatch } from "@/main/store/hook/useRedux";
import { loadAuthSignOut } from "@/main/store/ducks/auth";
import { useNavigate } from "react-router-dom";

export function useNavMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadSubMenu: SubMenuType[] = [
    {
      title: "Dados 1 - Lista de Motorista",
      icon: ChartBarBigIcon,
      description: "Listagem de Motoristas do Carg2-App",
      to: "/driver-truck",
    },
    {
      title: "Calcular Emissão de CO2",
      icon: CalculatorIcon,
      description: "Calculadora de Emissão de CO2",
      to: "/calculate-co2",
    },
    {
      title: "Dados do Caminhão",
      icon: ShieldCheckIcon,
      description: "Dados dos Caminhão da Carg2-App",
      to: "/truck",
    },
    {
      title: "Dados 4",
      icon: RefreshCcwIcon,
      description: "Speak directly to your customers in a more meaningful way.",
      to: "/",
    },
    {
      title: "Dados 5",
      icon: FolderIcon,
      description: "Speak directly to your customers in a more meaningful way.",
      to: "/",
    },
  ];

  function handlerLogout() {
    dispatch(loadAuthSignOut());
    navigate("/login");
  }

  return {
    loadSubMenu,
    handlerLogout,
  };
}