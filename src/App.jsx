import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Subjects from "./pages/Subjects";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Subjects />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

