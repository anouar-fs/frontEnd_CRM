import { useState } from "react";
import "./sidebar.scss";
import {
  Home,
  Users,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Target,
} from "lucide-react";
import { useLogoutMutation } from "../../../infrastructure/mutations/useLogoutMutate";
import { useNavigate } from "react-router-dom";
import { PATH_ROUTER } from "../../configuration";
import { useTheme } from "../../../hooks/useTheme";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { mutateAsync: logoutMutation } = useLogoutMutation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const menu = [
    { icon: <Home size={20} />, label: "Dashboard", route: PATH_ROUTER.Page1 },
    { icon: <Users size={20} />, label: "Users", route: PATH_ROUTER.Users },
    { icon: <Target size={20} />, label: "Leads", route: PATH_ROUTER.Leads },
    { icon: <BarChart2 size={20} />, label: "Analytics", route: PATH_ROUTER.Page1 },
    { icon: <Settings size={20} />, label: "Settings", route: PATH_ROUTER.Page1 },
  ];

  const handleClick = async ()=>{
        await logoutMutation();
        navigate(PATH_ROUTER.Authentication);
    }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Header */}
      <div className="sidebar__header">
        {!collapsed && <h1 className="sidebar__logo">MyPanel</h1>}
        <button
          className="sidebar__collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="sidebar__menu">
        {menu.map((item) => (
          <div className="sidebar__menu-item" key={item.label} onClick={()=>navigate(item.route)}>
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Footer / Profile */}
      <div className="sidebar__profile">
        <img
          src="https://i.pravatar.cc/100"
          alt="user"
          className="sidebar__avatar"
        />
        {!collapsed && (
          <div className="sidebar__user-info">
            <p className="name">Anouar</p>
            <p className="role">Administrator</p>
          </div>
        )}
        <LogOut className="logout" size={20} onClick={handleClick} />
        <button onClick={toggleTheme} className="theme-btn">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </aside>
  );
}
