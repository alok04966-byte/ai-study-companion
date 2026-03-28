import { useStudy } from "../../context/StudyContext";
import TaskCard from "./TaskCard";

function TaskList() {
  const { tasks } = useStudy();

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  );
}

export default TaskList;