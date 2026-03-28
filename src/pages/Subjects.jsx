import { useStudy } from "../context/StudyContext";
import SubjectForm from "../components/subjects/SubjectForm";
import SubjectCard from "../components/subjects/SubjectCard";

function Subjects() {
  const { subjects } = useStudy();

  return (
    <div style={styles.container}>
      <h1>Subjects</h1>

      <SubjectForm />

      <div>
        {subjects.length === 0 ? (
          <p>No subjects yet</p>
        ) : (
          subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
};

export default Subjects;