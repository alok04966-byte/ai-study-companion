import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subjects from "./pages/Subjects";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Subjects />} />
          <Route path="/subjects" element={<Subjects />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;