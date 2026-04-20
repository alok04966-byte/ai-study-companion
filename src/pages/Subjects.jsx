import SubjectForm from "../components/subjects/SubjectForm";
import SubjectCard from "../components/subjects/SubjectCard";
import { useSubjects } from "../hooks/useSubjects";
import PageShell from "../components/common/PageShell";

function Subjects() {
  const { subjects } = useSubjects();

  return (
    <PageShell title="Subjects">
      <SubjectForm />

      <div>
        {subjects.length === 0 ? (
          <p className="empty-state">No subjects yet. Add your first subject to get started.</p>
        ) : (
          subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))
        )}
      </div>
    </PageShell>
  );
}

export default Subjects;