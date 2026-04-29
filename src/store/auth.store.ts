import { create } from "zustand";
import type { AdvisorType } from "../models/Data/Advisor/AdvisorType";

interface AuthState {
    accessToken: string | null;
    setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    setToken: (token:string) => set({ accessToken: token }),
}));

interface ActiveUserState {
    activeUser: AdvisorType | null;
    setToken: (activeUser: AdvisorType) => void;
}

export const useActiveUserStore = create<ActiveUserState>((set) => ({
    activeUser: null,
    setToken: (activUser:AdvisorType) => set({ activeUser: activUser }),
}));

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: localStorage.getItem("theme")||"light",
    setTheme: (theme:string) => set({ theme: theme }),
}));
