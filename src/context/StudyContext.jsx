import React, { createContext, useContext } from "react";
import { TASK_STATUS, TOPIC_STATUS } from "../utils/constants";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [subjects, setSubjects] = useLocalStorageState("subjects", []);
  const [topics, setTopics] = useLocalStorageState("topics", []);
  const [tasks, setTasks] = useLocalStorageState("tasks", []);
  const [revisions, setRevisions] = useLocalStorageState("revisions", []);

  const buildId = () => Date.now() + Math.floor(Math.random() * 1000);

  const addSubject = (subject) => {
    setSubjects((prev) => [...prev, { ...subject, id: buildId() }]);
  };

  const updateSubject = (id, updates) => {
    setSubjects((prev) =>
      prev.map((subject) => (subject.id === id ? { ...subject, ...updates } : subject))
    );
  };

  const deleteSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    setTopics((prev) => prev.filter((topic) => topic.subjectId !== id));
    setTasks((prev) => prev.filter((task) => task.subjectId !== id));
    setRevisions((prev) =>
      prev.filter((revision) => {
        const task = tasks.find((item) => item.id === revision.taskId);
        return task && task.subjectId !== id;
      })
    );
  };

  const addTopic = (topic) => {
    setTopics((prev) => [
      ...prev,
      {
        ...topic,
        id: buildId(),
        status: topic.status || TOPIC_STATUS.NOT_STARTED,
        notes: topic.notes || "",
      },
    ]);
  };

  const updateTopic = (id, updates) => {
    setTopics((prev) =>
      prev.map((topic) => (topic.id === id ? { ...topic, ...updates } : topic))
    );
  };

  const deleteTopic = (id) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
    setTasks((prev) => prev.filter((task) => task.topicId !== id));
    setRevisions((prev) =>
      prev.filter((revision) => {
        const task = tasks.find((item) => item.id === revision.taskId);
        return task && task.topicId !== id;
      })
    );
  };

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: buildId() }]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setRevisions((prev) => prev.filter((revision) => revision.taskId !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          if (newStatus === TASK_STATUS.COMPLETED && task.status !== TASK_STATUS.COMPLETED) {
            const revisionDate = new Date();
            revisionDate.setDate(revisionDate.getDate() + 3);

            setRevisions((prev) => {
              const alreadyExists = prev.some(
                (revision) =>
                  revision.taskId === task.id &&
                  revision.date === revisionDate.toISOString().split("T")[0]
              );

              if (alreadyExists) {
                return prev;
              }

              return [
                ...prev,
                {
                  id: buildId(),
                  taskId: task.id,
                  date: revisionDate.toISOString().split("T")[0],
                  completed: false,
                },
              ];
            });
          }

          return { ...task, status: newStatus };
        }

        return task;
      });
    });
  };

  const updateRevisionDate = (id, date) => {
    setRevisions((prev) =>
      prev.map((revision) => (revision.id === id ? { ...revision, date } : revision))
    );
  };

  const toggleRevisionComplete = (id) => {
    setRevisions((prev) =>
      prev.map((revision) =>
        revision.id === id ? { ...revision, completed: !revision.completed } : revision
      )
    );
  };

  const deleteRevision = (id) => {
    setRevisions((prev) => prev.filter((revision) => revision.id !== id));
  };

  return (
    <StudyContext.Provider
      value={{
        subjects,
        topics,
        tasks,
        revisions,
        addSubject,
        updateSubject,
        deleteSubject,
        addTopic,
        updateTopic,
        deleteTopic,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        updateRevisionDate,
        toggleRevisionComplete,
        deleteRevision,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStudy = () => useContext(StudyContext);