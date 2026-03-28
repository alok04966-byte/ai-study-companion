import { useStudy } from "../../context/StudyContext";
import { TASK_STATUS } from "../../utils/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProgressChart() {
  const { subjects, tasks } = useStudy();

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

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;