import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import PageShell from "../components/common/PageShell";

function Tasks() {
  return (
    <PageShell title="Tasks">
      <TaskForm />
      <TaskList />
    </PageShell>
  );
}

export default Tasks;