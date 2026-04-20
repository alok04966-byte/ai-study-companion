import { useForm } from "react-hook-form";
import { useState } from "react";
import { useStudy } from "../../context/StudyContext";
import { TASK_STATUS } from "../../utils/constants";
import * as yup from "yup";
import { toast } from "react-toastify";

const taskSchema = yup.object({
  title: yup.string().required("Task title is required"),
  subjectId: yup.string().required("Please select a subject"),
  topicId: yup.string().required("Please select a topic"),
  deadline: yup.string().required("Deadline is required"),
  priority: yup.string().required("Priority is required"),
});

function TaskForm() {
  const { register, handleSubmit, reset } = useForm();
  const { subjects, topics, addTask } = useStudy();
  const [selectedSubject, setSelectedSubject] = useState("");
  const subjectRegister = register("subjectId");

  const filteredTopics = topics.filter(
    (t) => t.subjectId === Number(selectedSubject)
  );

  const onSubmit = (data) => {
    try {
      taskSchema.validateSync(data);
      addTask({
        ...data,
        subjectId: Number(data.subjectId),
        topicId: Number(data.topicId),
        status: TASK_STATUS.PENDING,
      });
      reset();
      toast.success("Task created");
    } catch (error) {
      toast.error(error.message || "Invalid task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel form-grid">
      <div className="field">
        <label>Task Title</label>
        <input className="input" {...register("title", { required: true })} placeholder="Task Title" />
      </div>

      <div className="field">
        <label>Subject</label>
        <select
          className="select"
          {...subjectRegister}
          onChange={(event) => {
            subjectRegister.onChange(event);
            setSelectedSubject(event.target.value);
          }}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Topic</label>
        <select className="select" {...register("topicId")}>
          <option value="">Select Topic</option>
          {filteredTopics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Deadline</label>
        <input className="input" type="date" {...register("deadline")} />
      </div>

      <div className="field">
        <label>Priority</label>
        <select className="select" {...register("priority")}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="field">
        <label>&nbsp;</label>
        <button className="btn btn-primary" type="submit">Add Task</button>
      </div>
    </form>
  );
}

export default TaskForm;

