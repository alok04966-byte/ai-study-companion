import { useStudy } from "../../context/StudyContext";

function RevisionList() {
  const { revisions, tasks } = useStudy();

  return (
    <div>
      <h2>Upcoming Revisions</h2>

      {revisions.length === 0 ? (
        <p>No revisions yet</p>
      ) : (
        revisions.map((rev) => {
          const task = tasks.find((t) => t.id === rev.taskId);

          return (
            <div key={rev.id} style={styles.card}>
              <p>{task?.title}</p>
              <p>Revision Date: {rev.date}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};

export default RevisionList;