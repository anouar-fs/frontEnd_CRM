import { create } from "zustand";
import type { AdvisorType } from "../models/Data/Advisor/AdvisorType";

// interface AuthState {
//     accessToken: string | null;
// }

export const useAuthStore = create((set) => ({
    accessToken: null,
    setToken: (token:string) => set({ accessToken: token }),
}));

export const useActiveUserStore = create((set) => ({
    activeUser: null,
    setToken: (activUser:AdvisorType) => set({ activeUser: activUser }),
}));

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme")||"light",
    setTheme: (theme:string) => set({ theme: theme }),
}));
