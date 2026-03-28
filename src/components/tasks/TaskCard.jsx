import { useStudy } from "../../context/StudyContext";
import { TASK_STATUS } from "../../utils/constants";

function TaskCard({ task }) {
  const { deleteTask, updateTaskStatus, subjects, topics } = useStudy();

  const subject = subjects.find((s) => s.id === task.subjectId);
  const topic = topics.find((t) => t.id === task.topicId);

  return (
    <div style={styles.card}>
      <h3>{task.title}</h3>

      <p>Subject: {subject?.name}</p>
      <p>Topic: {topic?.name}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>

      <div style={styles.actions}>
        <button
          onClick={() => updateTaskStatus(task.id, TASK_STATUS.IN_PROGRESS)}
        >
          In Progress
        </button>

        <button
          onClick={() => updateTaskStatus(task.id, TASK_STATUS.COMPLETED)}
        >
          Completed
        </button>

        <button
          onClick={() => updateTaskStatus(task.id, TASK_STATUS.REVISION)}
        >
          Revision
        </button>
      </div>

      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
};

export default TaskCard;