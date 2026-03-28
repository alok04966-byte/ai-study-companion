import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Study App</h2>

      <nav>
        <Link to="/subjects">Subjects</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/dashboard">Dashboard</Link>
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
};

export default Sidebar;