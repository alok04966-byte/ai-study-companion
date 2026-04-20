import { useForm } from "react-hook-form";
import { useStudy } from "../../context/StudyContext";
import { TOPIC_STATUS } from "../../utils/constants";
import { toast } from "react-toastify";
import * as yup from "yup";

const topicSchema = yup.object({
  name: yup.string().required("Topic name is required"),
  difficulty: yup.string().required(),
});

function TopicForm({ subjectId }) {
  const { register, handleSubmit, reset } = useForm();
  const { addTopic } = useStudy();

  const onSubmit = (data) => {
    try {
      topicSchema.validateSync(data);
      addTopic({
        ...data,
        subjectId,
        status: data.status || TOPIC_STATUS.NOT_STARTED,
        notes: data.notes || "",
      });
      reset();
      toast.success("Topic added");
    } catch (error) {
      toast.error(error.message || "Invalid topic");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
      <div className="field">
        <label>Topic Name</label>
        <input className="input" {...register("name", { required: true })} placeholder="Topic Name" />
      </div>

      <div className="field">
        <label>Difficulty</label>
        <select className="select" {...register("difficulty")}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="field">
        <label>Status</label>
        <select className="select" {...register("status")}>
          {Object.values(TOPIC_STATUS).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Notes</label>
        <input className="input" {...register("notes")} placeholder="Topic notes" />
      </div>

      <div className="field">
        <label>&nbsp;</label>
        <button type="submit" className="btn btn-secondary">
          Add Topic
        </button>
      </div>
    </form>
  );
}

export default TopicForm;