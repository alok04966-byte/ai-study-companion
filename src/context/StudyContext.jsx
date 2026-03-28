import { createContext, useContext, useEffect, useState } from "react";
import { TASK_STATUS } from "../utils/constants";

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
    const [subjects, setSubjects] = useState(() => {
    return JSON.parse(localStorage.getItem("subjects")) || [];
    });

    const [topics, setTopics] = useState(() => {
    return JSON.parse(localStorage.getItem("topics")) || [];
    });

    const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
    });
    
    const [revisions, setRevisions] = useState(() => {
      return JSON.parse(localStorage.getItem("revisions")) || [];
    });

  // 🔹 Save to localStorage
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("revisions", JSON.stringify(revisions));
  }, [revisions]);

  // 🔥 SUBJECT CRUD
  const addSubject = (subject) => {
    setSubjects((prev) => [...prev, { ...subject, id: Date.now() }]);
  };

  const deleteSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  // 🔥 TOPIC CRUD
  const addTopic = (topic) => {
    setTopics((prev) => [...prev, { ...topic, id: Date.now() }]);
  };

  const deleteTopic = (id) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
  };

  // 🔥 TASK CRUD
  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          // 🔥 If completed → create revision
          if (newStatus === TASK_STATUS.COMPLETED) {
            const revisionDate = new Date();
            revisionDate.setDate(revisionDate.getDate() + 3);

            setRevisions((prev) => [
              ...prev,
              {
                id: Date.now(),
                taskId: task.id,
                date: revisionDate.toISOString().split("T")[0],
              },
            ]);
          }

          return { ...task, status: newStatus };
        }

        return task;
      });
    });
  };

  return (
    <StudyContext.Provider
      value={{
        subjects,
        topics,
        tasks,
        revisions,
        addSubject,
        deleteSubject,
        addTopic,
        deleteTopic,
        addTask,
        deleteTask,
        updateTaskStatus,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

// custom hook
export const useStudy = () => useContext(StudyContext);