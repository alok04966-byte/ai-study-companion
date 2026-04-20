import { useMemo } from "react";
import { useStudy } from "../context/StudyContext";

export const useSubjects = () => {
  const {
    subjects,
    topics,
    addSubject,
    updateSubject,
    deleteSubject,
    addTopic,
    updateTopic,
    deleteTopic,
  } = useStudy();

  const topicsBySubject = useMemo(() => {
    return subjects.map((subject) => ({
      ...subject,
      topics: topics.filter((topic) => topic.subjectId === subject.id),
    }));
  }, [subjects, topics]);

  return {
    subjects,
    topics,
    topicsBySubject,
    addSubject,
    updateSubject,
    deleteSubject,
    addTopic,
    updateTopic,
    deleteTopic,
  };
};
