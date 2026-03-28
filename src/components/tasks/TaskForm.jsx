import { useForm } from "react-hook-form";
import { useStudy } from "../../context/StudyContext";
import { TASK_STATUS } from "../../utils/constants";

function TaskForm() {
  const { register, handleSubmit, watch, reset } = useForm();
  const { subjects, topics, addTask } = useStudy();

  const selectedSubject = watch("subjectId");

  const filteredTopics = topics.filter(
    (t) => t.subjectId === Number(selectedSubject)
  );

  const onSubmit = (data) => {
    addTask({
      ...data,
      subjectId: Number(data.subjectId),
      topicId: Number(data.topicId),
      status: TASK_STATUS.PENDING,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input
        {...register("title", { required: true })}
        placeholder="Task Title"
        style={styles.input}
      />

      {/* SUBJECT */}
      <select {...register("subjectId")} style={styles.input}>
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* TOPIC (depends on subject) */}
      <select {...register("topicId")} style={styles.input}>
        <option value="">Select Topic</option>
        {filteredTopics.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <input type="date" {...register("deadline")} />

      <select {...register("priority")}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  input: {
    padding: "6px",
  },
};

export default TaskForm;

