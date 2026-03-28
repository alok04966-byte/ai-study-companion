import { useStudy } from "../../context/StudyContext";

function TaskCard({ task }) {
  const { deleteTask, subjects, topics } = useStudy();

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
};

export default TaskCard;