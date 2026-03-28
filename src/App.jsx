import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Revision from "./pages/Revision";
import AITools from "./pages/AITools";

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
          <Route path="/ai-tools" element={<AITools />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

