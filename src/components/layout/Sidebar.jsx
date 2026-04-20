import { NavLink } from "react-router-dom";
import { FiBookOpen, FiCheckSquare, FiBarChart2, FiRotateCw, FiCpu, FiMoon, FiSun } from "react-icons/fi";

function Sidebar({ theme, onToggleTheme }) {
  const navItems = [
    { to: "/subjects", label: "Subjects", icon: <FiBookOpen /> },
    { to: "/tasks", label: "Tasks", icon: <FiCheckSquare /> },
    { to: "/dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
    { to: "/revision", label: "Revision", icon: <FiRotateCw /> },
    { to: "/ai-tools", label: "AI Tools", icon: <FiCpu /> },
  ];

  return (
    <aside className="app-sidebar">
      <div className="app-brand">
        <FiBookOpen />
        <span>AI Study Companion</span>
      </div>

      <nav className="app-sidebar-nav">
        {navItems.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="btn btn-secondary theme-toggle" onClick={onToggleTheme}>
        {theme === "dark" ? <FiSun /> : <FiMoon />} {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </aside>
  );
}

export default Sidebar;