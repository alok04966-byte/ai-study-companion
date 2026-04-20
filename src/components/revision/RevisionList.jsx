import { useStudy } from "../../context/StudyContext";
import { format, parseISO } from "date-fns";

function RevisionList({ selectedDate }) {
  const { revisions, tasks, updateRevisionDate, toggleRevisionComplete, deleteRevision } = useStudy();

  const visibleRevisions = revisions
    .filter((revision) => !selectedDate || revision.date === selectedDate)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <h2>Upcoming Revisions</h2>

      {visibleRevisions.length === 0 ? (
        <div className="panel empty-card">
          <p className="empty-state">No revisions for this day</p>
        </div>
      ) : (
        visibleRevisions.map((rev) => {
          const task = tasks.find((t) => t.id === rev.taskId);

          return (
            <div key={rev.id} className={`panel panel-hover revision-card ${rev.completed ? "muted-complete" : ""}`}>
              <p>{task?.title}</p>
              <p>Revision Date: {format(parseISO(rev.date), "dd MMM yyyy")}</p>
              <div className="tabs-wrap">
                <input
                  className="input"
                  type="date"
                  value={rev.date}
                  onChange={(event) => updateRevisionDate(rev.id, event.target.value)}
                />
                <button className="btn btn-secondary" onClick={() => toggleRevisionComplete(rev.id)}>
                  {rev.completed ? "Mark Pending" : "Mark Done"}
                </button>
                <button className="btn btn-danger" onClick={() => deleteRevision(rev.id)}>Delete</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RevisionList;