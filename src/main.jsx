import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/ui.css";
import { StudyProvider } from "./context/StudyContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudyProvider>
      <App />
      <ToastContainer position="top-right" autoClose={2500} />
    </StudyProvider>
  </React.StrictMode>
);