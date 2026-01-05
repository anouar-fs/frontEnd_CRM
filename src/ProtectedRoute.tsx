import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const token = useAuthStore.getState().accessToken

  if (!token) {
    return <Navigate to="/authentication" replace />;
  }

  return children;
}
