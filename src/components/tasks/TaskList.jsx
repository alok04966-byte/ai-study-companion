import { useState } from "react";
import { useStudy } from "../../context/StudyContext";
import TaskCard from "./TaskCard";
import { TASK_STATUS } from "../../utils/constants";

function TaskList() {
  const { tasks } = useStudy();
  const [activeTab, setActiveTab] = useState("All");

  // 🔥 FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
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
      {/* 🔥 TABS */}
      <div style={styles.tabs}>
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
            style={{
              ...styles.tab,
              background: activeTab === tab ? "#333" : "#ccc",
              color: activeTab === tab ? "#fff" : "#000",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔥 TASK LIST */}
      {filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  );
}

const styles = {
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
  },
};

export default TaskList;