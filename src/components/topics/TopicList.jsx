import { useStudy } from "../../context/StudyContext";

function TopicList({ subjectId }) {
  const { topics, deleteTopic } = useStudy();

  const filteredTopics = topics.filter(
    (t) => t.subjectId === subjectId
  );

  return (
    <div style={styles.container}>
      {filteredTopics.map((topic) => (
        <div key={topic.id} style={styles.topic}>
          <span>
            {topic.name} ({topic.difficulty})
          </span>

          <button onClick={() => deleteTopic(topic.id)}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "10px",
  },
  topic: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0",
  },
};

export default TopicList;