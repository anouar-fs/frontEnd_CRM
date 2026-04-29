import { useEffect, useState } from "react";
import "./Sidebar.scss";
import {
  Users,
  LayoutDashboard,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Target,
  Calendar
} from "lucide-react";
import { useLogoutMutation } from "../../../infrastructure/mutations/useLogoutMutate";
import { useNavigate } from "react-router-dom";
import { PATH_ROUTER } from "../../configuration";
import { useTheme } from "../../../hooks/useTheme";
import { getActivUser } from "../../../infrastructure/queries/ActiveUser";
import { userRolse, type AdvisorType } from "../../../models/Data/Advisor/AdvisorType";
import { useAuthStore } from "../../../store/auth.store";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { mutateAsync: logoutMutation } = useLogoutMutation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const [activeUser, setActiveUser] = useState<AdvisorType | undefined>(undefined);

    useEffect(() => {
      getActivUser().then(user => {
        setActiveUser(user);
      });
    }, []);

  const menu = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", route: PATH_ROUTER.Dashboard },
    { icon: <Users size={20} />, label: "Users", route: PATH_ROUTER.Leads },
    { icon: <Target size={20} />, label: "Leads", route: PATH_ROUTER.Leads },
    { icon: <BarChart2 size={20} />, label: "Analytics", route: PATH_ROUTER.Analytics },
    { icon: <Settings size={20} />, label: "Settings", route: PATH_ROUTER.Dashboard },
    { icon: <Calendar size={20} />, label: "Appointment", route: PATH_ROUTER.Appointment },
  ];
  const currentUrl = window.location.href.split('/');
  const currentPage = currentUrl[currentUrl.length - 1];

  const handleClick = async ()=>{
        await logoutMutation();
        navigate(PATH_ROUTER.Authentication);
        useAuthStore.setState({ accessToken: null })
    }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Header */}
      <div className="sidebar__header">
        {!collapsed && <h1 className="sidebar__logo">MyPanel</h1>}
        {window.innerWidth > 768 && (
          <button
            className="sidebar__collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="sidebar__menu">
        {menu.map((item) => (
          <div className={`sidebar__menu-item ${currentPage.toString().toLowerCase() === item.label.toString().toLowerCase() ? "sidebar__menu-item_current" : ""}`} key={item.label} onClick={()=>navigate(item.route)}>
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
            <p className="name">{activeUser?.firstname}</p>
            <p className="role">{userRolse[activeUser?.role||0]}</p>
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
