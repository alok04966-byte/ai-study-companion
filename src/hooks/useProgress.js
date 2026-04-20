import { useMemo } from "react";
import { useStudy } from "../context/StudyContext";
import { TASK_STATUS } from "../utils/constants";

export const useProgress = () => {
  const { tasks, subjects, revisions } = useStudy();

  return useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;
    const pendingTasks = tasks.filter((task) => task.status === TASK_STATUS.PENDING).length;
    const revisionTasks = tasks.filter((task) => task.status === TASK_STATUS.REVISION).length;
    const overdueTasks = tasks.filter(
      (task) => task.deadline && new Date(task.deadline) < new Date() && task.status !== TASK_STATUS.COMPLETED
    ).length;
    const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const weeklyProductivity = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setDate(day.getDate() - (6 - index));
      const dateString = day.toISOString().split("T")[0];

      return {
        date: dateString,
        completed: tasks.filter((task) => task.status === TASK_STATUS.COMPLETED && task.deadline === dateString).length,
      };
    });

    const reminders = revisions
      .filter((revision) => !revision.completed)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5)
      .map((revision) => {
        const task = tasks.find((item) => item.id === revision.taskId);
        const subject = subjects.find((item) => item.id === task?.subjectId);
        return {
          ...revision,
          taskTitle: task?.title || "Unknown Task",
          subjectName: subject?.name || "General",
        };
      });

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      revisionTasks,
      overdueTasks,
      completionPercentage,
      weeklyProductivity,
      reminders,
    };
  }, [revisions, subjects, tasks]);
};
