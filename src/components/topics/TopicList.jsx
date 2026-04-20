import { useStudy } from "../../context/StudyContext";
import { TOPIC_STATUS } from "../../utils/constants";

function TopicList({ subjectId }) {
  const { topics, deleteTopic, updateTopic } = useStudy();

  const filteredTopics = topics.filter(
    (t) => t.subjectId === subjectId
  );

  return (
    <div>
      {filteredTopics.length === 0 && <p className="empty-state">No topics added yet.</p>}
      {filteredTopics.map((topic) => (
        <div key={topic.id} className="panel revision-card panel-hover">
          <div className="task-meta">
            <span>
              {topic.name} ({topic.difficulty})
            </span>
            <select
              className="select"
              value={topic.status || TOPIC_STATUS.NOT_STARTED}
              onChange={(event) => updateTopic(topic.id, { status: event.target.value })}
            >
              {Object.values(TOPIC_STATUS).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <input
              className="input"
              value={topic.notes || ""}
              placeholder="Add notes"
              onChange={(event) => updateTopic(topic.id, { notes: event.target.value })}
            />
          </div>

          <button className="btn btn-danger" onClick={() => deleteTopic(topic.id)}>
            Delete Topic
          </button>
        </div>
      ))}
    </div>
  );
}

export default TopicList;