import StatsCards from "../components/dashboard/StatsCards";
import ProgressChart from "../components/dashboard/ProgressChart";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <StatsCards />
      <ProgressChart />
    </div>
  );
}

export default Dashboard;