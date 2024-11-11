import { Navigate } from "react-router-dom";
import { App } from "../app";
import { getCurrentUserAdapter } from "../adapters/user-adapter";

export function PrivateRoute() {
  const user = getCurrentUserAdapter();
  const userAuthenticated = !!user?.accessToken;

  return userAuthenticated ? <App /> : <Navigate to="/login" />;
}
