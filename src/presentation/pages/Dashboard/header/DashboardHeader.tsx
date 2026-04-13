import { useThemeStore } from "../../../../store/auth.store";

const DashboardHeader = () => {
    const htmltTheme = useThemeStore((state) => state.theme)
    const isDark = htmltTheme === 'dark';
    return (
        <div style={{ marginBottom: "24px" }}>
    <h1 style={{
        fontSize: "28px",
        fontWeight: "600",
        letterSpacing: "-0.5px",
        color: isDark?"#ffffff":"#6B7280",
        margin: 0
        }}>
            Dashboard
        </h1>

        <p style={{
            marginTop: "6px",
            fontSize: "14px",
            color: isDark?"#ffffff":"#6B7280"
        }}>
            Welcome back — here’s what’s happening today.
        </p>
    </div>
    )
}

export default DashboardHeader