import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Subjects from "./pages/Subjects";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Revision from "./pages/Revision";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Subjects />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/revision" element={<Revision />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

