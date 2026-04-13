import { create } from "zustand";

// interface AuthState {
//     accessToken: string | null;
// }

export const useAuthStore = create((set) => ({
    accessToken: null,
    setToken: (token:string) => set({ accessToken: token }),
}));

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme")||"light",
    setTheme: (theme:string) => set({ theme: theme }),
}));
