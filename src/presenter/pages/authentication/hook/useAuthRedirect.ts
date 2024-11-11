import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthRedirect() {
  const navigate = useNavigate();

  const handlerRedirectAuthSuccess = useCallback(
    (value: boolean) => {
      if (!value) return;
      setTimeout(() => navigate("/"), 5000);
    },
    [navigate]
  );

  return {
    handlerRedirectAuthSuccess,
  };
}
