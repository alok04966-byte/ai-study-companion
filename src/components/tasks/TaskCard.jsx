import { useStudy } from "../../context/StudyContext";
import { TASK_STATUS } from "../../utils/constants";
import { toast } from "react-toastify";

function TaskCard({ task }) {
  const { deleteTask, updateTaskStatus, subjects, topics } = useStudy();

  const subject = subjects.find((s) => s.id === task.subjectId);
  const topic = topics.find((t) => t.id === task.topicId);
  const priorityClass = `badge badge-priority-${(task.priority || "").toLowerCase()}`;
  const statusClass = `badge badge-status-${(task.status || "").toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="panel panel-hover task-card">
      <h3>{task.title}</h3>

      <p>Subject: {subject?.name || "N/A"}</p>
      <p>Topic: {topic?.name || "N/A"}</p>
      <p>Deadline: {task.deadline || "No date"}</p>
      <div className="task-meta">
        <span className={priorityClass}>{task.priority}</span>
        <span className={statusClass}>{task.status}</span>
      </div>

      <div className="tabs-wrap">
        <button
          className="btn btn-secondary"
          onClick={() => {
            updateTaskStatus(task.id, TASK_STATUS.IN_PROGRESS);
            toast.info("Task moved to In Progress");
          }}
        >
          In Progress
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
            updateTaskStatus(task.id, TASK_STATUS.COMPLETED);
            toast.success("Task marked completed");
          }}
        >
          Completed
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            updateTaskStatus(task.id, TASK_STATUS.REVISION);
            toast.info("Task sent to revision");
          }}
        >
          Revision
        </button>
      </div>

      <button
        className="btn btn-danger"
        onClick={() => {
          deleteTask(task.id);
          toast.error("Task deleted");
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;