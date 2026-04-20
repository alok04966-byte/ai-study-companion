import { useProgress } from "../../hooks/useProgress";
import { FiClipboard, FiCheckCircle, FiClock, FiRotateCw, FiAlertTriangle, FiTrendingUp } from "react-icons/fi";

function StatsCards() {
  const { totalTasks, completedTasks, pendingTasks, revisionTasks, overdueTasks, completionPercentage } =
    useProgress();
  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: FiClipboard },
    { label: "Completed", value: completedTasks, icon: FiCheckCircle },
    { label: "Pending", value: pendingTasks, icon: FiClock },
    { label: "Revision", value: revisionTasks, icon: FiRotateCw },
    { label: "Overdue", value: overdueTasks, icon: FiAlertTriangle },
    { label: "Completion", value: `${completionPercentage}%`, icon: FiTrendingUp },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="panel panel-hover stat-card">
            <div className="task-meta">
              <Icon />
              <span className="stat-label">{item.label}</span>
            </div>
            <div className="stat-value">{item.value}</div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;