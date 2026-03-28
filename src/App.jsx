import { useStudy } from "./context/StudyContext";

function App() {
  const { subjects, addSubject } = useStudy();

  return (
    <div>
      <h1>AI Study Companion</h1>

      <button
        onClick={() =>
          addSubject({ name: "DSA", description: "Data Structures" })
        }
      >
        Add Subject
      </button>

      <ul>
        {subjects.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;