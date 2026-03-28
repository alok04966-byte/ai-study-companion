import { createContext, useContext, useEffect, useState } from "react";

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

  return (
    <StudyContext.Provider
      value={{
        subjects,
        topics,
        tasks,
        addSubject,
        deleteSubject,
        addTopic,
        deleteTopic,
        addTask,
        deleteTask,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

// custom hook
export const useStudy = () => useContext(StudyContext);