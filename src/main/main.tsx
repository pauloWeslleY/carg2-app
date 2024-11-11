import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeCustomization } from "../presenter/themes/theme";
import { MainRoutes } from "./router/main.routes";
import store from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeCustomization>
        <MainRoutes />
      </ThemeCustomization>
    </Provider>
  </StrictMode>
);
