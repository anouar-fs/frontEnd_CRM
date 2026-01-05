import type { JSX } from "react";
import { useAuthStore } from "./store/auth.store";
import { Navigate } from "react-router-dom";
import { PATH_ROUTER } from "./presentation/configuration";

export function GuestRoute({ children }: { children: JSX.Element }) {
    const token = useAuthStore.getState().accessToken
    if (token) {
        return <Navigate to={PATH_ROUTER.Page1} replace />;
    }

    return children;
}