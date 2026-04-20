import { useStudy } from "../../context/StudyContext";
import TopicForm from "../topics/TopicForm";
import TopicList from "../topics/TopicList";

function SubjectCard({ subject }) {
  const { deleteSubject } = useStudy();

  return (
    <div className="panel panel-hover subject-card" style={{ borderLeft: `5px solid ${subject.color}` }}>
      <h3>{subject.name}</h3>
      <p>{subject.description}</p>

      <button onClick={() => deleteSubject(subject.id)} className="btn btn-danger">
        Delete
      </button>

      <TopicForm subjectId={subject.id} />
      <TopicList subjectId={subject.id} />
    </div>
  );
}

export default SubjectCard;