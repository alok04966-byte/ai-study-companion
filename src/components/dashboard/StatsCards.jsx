import { useStudy } from "../../context/StudyContext";
import { TASK_STATUS } from "../../utils/constants";

function StatsCards() {
  const { tasks } = useStudy();

  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === TASK_STATUS.COMPLETED
  ).length;

  const pending = tasks.filter(
    (t) => t.status === TASK_STATUS.PENDING
  ).length;

  const revision = tasks.filter(
    (t) => t.status === TASK_STATUS.REVISION
  ).length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={styles.container}>
      <div style={styles.card}>Total: {total}</div>
      <div style={styles.card}>Completed: {completed}</div>
      <div style={styles.card}>Pending: {pending}</div>
      <div style={styles.card}>Revision: {revision}</div>
      <div style={styles.card}>Completion: {percentage}%</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    minWidth: "120px",
  },
};

export default StatsCards;