import { useStudy } from "../../context/StudyContext";
import { useProgress } from "../../hooks/useProgress";
import { TASK_STATUS } from "../../utils/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function ProgressChart() {
  const { subjects, tasks } = useStudy();
  const { weeklyProductivity } = useProgress();

  const data = subjects.map((subject) => {
    const subjectTasks = tasks.filter(
      (t) => t.subjectId === subject.id
    );

    const completed = subjectTasks.filter(
    (t) => t.status === TASK_STATUS.COMPLETED
    ).length;

    return {
      name: subject.name,
      completed,
      total: subjectTasks.length,
    };
  });
  const hasWeeklyData = weeklyProductivity.some((item) => item.completed > 0);

  return (
    <div className="chart-grid">
      <div className="panel chart-card">
        <h3>Subject Completion</h3>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid var(--border)" }} />
            <Bar dataKey="completed" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="panel chart-card">
        <h3>Weekly Productivity</h3>
        {hasWeeklyData ? (
          <ResponsiveContainer>
            <LineChart data={weeklyProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid var(--border)" }} />
              <Line type="monotone" dataKey="completed" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="panel empty-card">
            <p className="empty-state">No activity this week</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressChart;