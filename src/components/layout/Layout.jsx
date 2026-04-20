import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-layout">
      <Sidebar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />
      <main className="app-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;