import { useEffect } from "react";
import { loadUserAuthenticated } from "./store/ducks/auth";
import { useAppDispatch } from "./store/hook/useRedux";
import { NavBar } from "@/presenter/components/layout/navbar/navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function App() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserAuthenticated());
  }, [dispatch]);

  if (pathname === "/") {
    return <Navigate to="/calculate-co2" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
