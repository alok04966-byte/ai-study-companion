import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Study App</h2>

      <nav style={styles.nav}>
        <Link to="/subjects" style={styles.a}>Subjects</Link>
        <Link to="/tasks" style={styles.a}>Tasks</Link>
        <Link to="/dashboard" style={styles.a}>Dashboard</Link>
        <Link to="/revision" style={styles.a}>Revision</Link>
        <Link to="/ai-tools" style={styles.a}>AI Tools</Link>
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
  },
};

export default Sidebar;