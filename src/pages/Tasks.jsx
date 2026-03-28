import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function Tasks() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Tasks</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Tasks;