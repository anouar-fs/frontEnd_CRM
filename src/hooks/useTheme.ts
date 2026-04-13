import { useEffect, useState } from "react"
import { useThemeStore } from "../store/auth.store";

export const useTheme = ()=>{
    const [theme,setTheme] = useState(
        ()=>localStorage.getItem("theme")||"light"
    );
    const updateThemeStore = useThemeStore((state) => state.setTheme);
    useEffect(()=>{
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    },[theme])

    const toggleTheme = ()=>{
        setTheme((perv)=>(perv === "light"?"dark":"light"))
        updateThemeStore(theme === "light"?"dark":"light")
    }

    return { theme,toggleTheme };
}