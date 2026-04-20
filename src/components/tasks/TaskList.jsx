import { useState } from "react";
import TaskCard from "./TaskCard";
import { TASK_STATUS } from "../../utils/constants";
import { useStudy } from "../../context/StudyContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useTasks } from "../../hooks/useTasks";
import { TASK_SORT_OPTIONS } from "../../utils/constants";

function TaskList() {
  const { subjects } = useStudy();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [deadlineFrom, setDeadlineFrom] = useState("");
  const [deadlineTo, setDeadlineTo] = useState("");
  const [sortBy, setSortBy] = useState(TASK_SORT_OPTIONS.DUE_DATE);
  const debouncedSearch = useDebounce(search, 300);

  const { filteredTasks: queriedTasks } = useTasks({
    search: debouncedSearch,
    subjectId,
    priority,
    status,
    deadlineFrom,
    deadlineTo,
    sortBy,
  });

  const filteredTasks = queriedTasks.filter((task) => {
    if (activeTab === "All") return true;

    if (activeTab === "Overdue") {
      return (
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== TASK_STATUS.COMPLETED
      );
    }

    return task.status === activeTab;
  });

  return (
    <div>
      <div className="panel panel-padded filters-wrap">
        <input
          className="input"
          value={search}
          placeholder="Search tasks/topics/subjects..."
          onChange={(event) => setSearch(event.target.value)}
        />
        <select className="select" value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <select className="select" value={priority} onChange={(event) => setPriority(event.target.value)}>
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select className="select" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">All Status</option>
          {Object.values(TASK_STATUS).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input className="input" type="date" value={deadlineFrom} onChange={(event) => setDeadlineFrom(event.target.value)} />
        <input className="input" type="date" value={deadlineTo} onChange={(event) => setDeadlineTo(event.target.value)} />
        <select className="select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          {Object.values(TASK_SORT_OPTIONS).map((option) => (
            <option key={option} value={option}>
              Sort: {option}
            </option>
          ))}
        </select>
      </div>

      <div className="tabs-wrap">
        {[
          "All",
          TASK_STATUS.PENDING,
          TASK_STATUS.COMPLETED,
          "Overdue",
          TASK_STATUS.REVISION,
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn ${activeTab === tab ? "btn-primary" : "btn-secondary"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-state">No tasks found for current filters.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  );
}

export default TaskList;