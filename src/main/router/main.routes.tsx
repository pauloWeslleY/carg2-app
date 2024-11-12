import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLogin } from "@/presenter/pages/authentication/login";
import { AuthRegister } from "@/presenter/pages/authentication/register";
import { PrivateRoute } from "./private.routes";
import { DriverTruck } from "@/presenter/pages/driver-truck/driver-truck";
import { CalculateCo2 } from "@/presenter/pages/calculate-co2/calculate-co2";

export function MainRoutes() {
  const router = createBrowserRouter(
    [
      { path: "/login", index: true, element: <AuthLogin /> },
      { path: "/register", element: <AuthRegister /> },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          { path: "driver-truck", element: <DriverTruck /> },
          { path: "calculate-co2", element: <CalculateCo2 /> },
        ],
      },
    ],
    { basename: "/" }
  );

  return <RouterProvider router={router} />;
}
