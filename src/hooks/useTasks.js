import { useMemo } from "react";
import { useStudy } from "../context/StudyContext";

const priorityOrder = { High: 0, Medium: 1, Low: 2 };

export const useTasks = (query = {}) => {
  const { tasks, subjects, topics, addTask, updateTask, deleteTask, updateTaskStatus } = useStudy();

  const filteredTasks = useMemo(() => {
    const search = (query.search || "").toLowerCase().trim();

    let result = tasks.filter((task) => {
      const subject = subjects.find((item) => item.id === task.subjectId);
      const topic = topics.find((item) => item.id === task.topicId);

      const searchableText = [task.title, subject?.name, topic?.name, topic?.notes].join(" ").toLowerCase();
      const searchMatch = !search || searchableText.includes(search);
      const subjectMatch = !query.subjectId || Number(query.subjectId) === task.subjectId;
      const priorityMatch = !query.priority || task.priority === query.priority;
      const statusMatch = !query.status || task.status === query.status;

      const dueFromMatch = !query.deadlineFrom || !task.deadline || task.deadline >= query.deadlineFrom;
      const dueToMatch = !query.deadlineTo || !task.deadline || task.deadline <= query.deadlineTo;

      return searchMatch && subjectMatch && priorityMatch && statusMatch && dueFromMatch && dueToMatch;
    });

    if (query.sortBy === "Priority") {
      result = [...result].sort(
        (a, b) => (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99)
      );
    } else if (query.sortBy === "Subject") {
      result = [...result].sort((a, b) => {
        const aSubject = subjects.find((item) => item.id === a.subjectId)?.name || "";
        const bSubject = subjects.find((item) => item.id === b.subjectId)?.name || "";
        return aSubject.localeCompare(bSubject);
      });
    } else {
      result = [...result].sort((a, b) => (a.deadline || "").localeCompare(b.deadline || ""));
    }

    return result;
  }, [tasks, subjects, topics, query.deadlineFrom, query.deadlineTo, query.priority, query.search, query.sortBy, query.status, query.subjectId]);

  return {
    tasks,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};
