import { useForm } from "react-hook-form";
import { useStudy } from "../../context/StudyContext";

function SubjectForm() {
  const { register, handleSubmit, reset } = useForm();
  const { addSubject } = useStudy();

  const onSubmit = (data) => {
    addSubject(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input
        {...register("name", { required: true })}
        placeholder="Subject Name"
        style={styles.input}
      />

      <input
        {...register("description")}
        placeholder="Description"
        style={styles.input}
      />

      <input
        {...register("color")}
        type="color"
        style={styles.color}
      />

      <button type="submit" style={styles.button}>
        Add Subject
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
  },
  color: {
    width: "50px",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default SubjectForm;