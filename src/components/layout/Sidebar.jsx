import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Study App</h2>

      <nav style={styles.nav}>
        <Link to="/subjects">Subjects</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/revision">Revision</Link>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#111",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  a: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
  }
};

export default Sidebar;