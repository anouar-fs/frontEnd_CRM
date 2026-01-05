import { useEffect, useState } from "react"

export const useTheme = ()=>{
    const [theme,setTheme] = useState(
        ()=>localStorage.getItem("theme")||"light"
    );

    useEffect(()=>{
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    },[theme])

    const toggleTheme = ()=>{
        setTheme((perv)=>(perv === "light"?"dark":"light"))
    }

    return { theme,toggleTheme };
}