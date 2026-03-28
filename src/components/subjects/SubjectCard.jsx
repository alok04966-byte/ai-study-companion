import { useStudy } from "../../context/StudyContext";

function SubjectCard({ subject }) {
  const { deleteSubject } = useStudy();

  return (
    <div style={{ ...styles.card, borderLeft: `5px solid ${subject.color}` }}>
      <h3>{subject.name}</h3>
      <p>{subject.description}</p>

      <button onClick={() => deleteSubject(subject.id)} style={styles.delete}>
        Delete
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  delete: {
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default SubjectCard;