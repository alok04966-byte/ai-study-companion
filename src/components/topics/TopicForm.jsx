import { useForm } from "react-hook-form";
import { useStudy } from "../../context/StudyContext";

function TopicForm({ subjectId }) {
  const { register, handleSubmit, reset } = useForm();
  const { addTopic } = useStudy();

  const onSubmit = (data) => {
    addTopic({
      ...data,
      subjectId,
      status: "Not Started",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input
        {...register("name", { required: true })}
        placeholder="Topic Name"
        style={styles.input}
      />

      <select {...register("difficulty")} style={styles.input}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button type="submit" style={styles.button}>
        Add Topic
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    padding: "6px",
  },
  button: {
    padding: "6px 10px",
  },
};

export default TopicForm;