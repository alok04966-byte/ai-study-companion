import StatsCards from "../components/dashboard/StatsCards";
import ProgressChart from "../components/dashboard/ProgressChart";
import { useProgress } from "../hooks/useProgress";
import PageShell from "../components/common/PageShell";

function Dashboard() {
  const { reminders } = useProgress();

  return (
    <PageShell title="Dashboard">
      <StatsCards />
      <ProgressChart />

      <h2>Revision Reminders</h2>
      {reminders.length === 0 ? (
        <p className="empty-state">No pending reminders.</p>
      ) : (
        reminders.map((reminder) => (
          <div key={reminder.id} className="panel reminder-card panel-hover">
            <strong>{reminder.taskTitle}</strong> - {reminder.subjectName} - {reminder.date}
          </div>
        ))
      )}
    </PageShell>
  );
}

export default Dashboard;